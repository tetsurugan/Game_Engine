import { create } from "zustand";
import {
  applyResolvedEndingToProfile,
  createInitialRuntime,
  flushPressuredPendingSignals,
  getScene,
  getVisibleChoices,
  mergeWorldFlagWrites,
  resolveChoice,
  resolveEnding,
  resolvePlayNarration,
  loadProfile,
  saveProfile,
  clearProfile,
  stripEphemeralNarrationTransport,
  toRuntimeProfileSnapshot,
} from "../engine";
import type {
  ChoiceDefinition,
  EndingDefinition,
  PersistedProfile,
  ResolvedPlayNarration,
  SceneDefinition,
  StoryDefinition,
  StoryRuntimeState,
} from "../engine/types";
import { getStoryBrowseState } from "../engine/storyPresentation";
import { getStoryById, storyRegistry } from "../stories";

interface StoryStoreState {
  profile: PersistedProfile;
  runtime: StoryRuntimeState | null;
  currentStory: StoryDefinition | null;
  resolvedEnding: EndingDefinition | null;
  /** Last resolved narration frame after a choice (store-owned display state). */
  playNarrationFrame: ResolvedPlayNarration | null;

  startStory: (storyId: string, personalityId?: string) => boolean;
  continueStory: () => boolean;
  selectChoice: (choiceId: string) => void;
  resetStory: () => void;
  clearAll: () => void;

  getCurrentScene: () => SceneDefinition | null;
  getVisibleChoicesForCurrentScene: () => ReturnType<typeof getVisibleChoices>;
}

function rehydrateRuntimeStory(
  runtime: StoryRuntimeState | null,
): { runtime: StoryRuntimeState; story: StoryDefinition } | null {
  if (!runtime) return null;
  const story = getStoryById(runtime.storyId);
  if (!story) return null;
  return { runtime, story };
}

function persistRuntime(
  profile: PersistedProfile,
  runtime: StoryRuntimeState | null,
): PersistedProfile {
  const next = { ...profile, lastRuntime: runtime };
  saveProfile(next);
  return next;
}

export const useStoryStore = create<StoryStoreState>((set, get) => ({
  profile: loadProfile(),
  runtime: null,
  currentStory: null,
  resolvedEnding: null,
  playNarrationFrame: null,

  startStory: (storyId, personalityId) => {
    const story = getStoryById(storyId);
    if (!story) return false;
    const browse = getStoryBrowseState(story, get().profile, {
      allStories: storyRegistry,
    });
    if (!browse.list || !browse.unlocked) return false;
    const runtime = createInitialRuntime(story, personalityId);
    const profile = persistRuntime(get().profile, runtime);
    set({
      currentStory: story,
      runtime,
      resolvedEnding: null,
      playNarrationFrame: null,
      profile,
    });
    return true;
  },

  continueStory: () => {
    const rehydrated = rehydrateRuntimeStory(get().profile.lastRuntime);
    if (!rehydrated) return false;
    const { runtime, story } = rehydrated;

    if (runtime.endingId) {
      const ending =
        story.endings.find((e) => e.id === runtime.endingId) ?? null;
      set({
        currentStory: story,
        runtime,
        resolvedEnding: ending,
        playNarrationFrame: null,
      });
      return true;
    }

    let nextRuntime = runtime;
    if (story.storyClass === "pressured") {
      nextRuntime = flushPressuredPendingSignals(story, runtime);
    }
    const profile =
      nextRuntime !== runtime
        ? persistRuntime(get().profile, nextRuntime)
        : get().profile;
    set({
      currentStory: story,
      runtime: nextRuntime,
      resolvedEnding: null,
      playNarrationFrame: null,
      profile,
    });
    return true;
  },

  selectChoice: (choiceId) => {
    const { currentStory, runtime, profile } = get();
    if (!currentStory || !runtime || !runtime.currentSceneId) return;

    const scene = getScene(currentStory, runtime.currentSceneId);
    if (!scene) return;

    const choice: ChoiceDefinition | undefined = scene.choices.find(
      (c) => c.id === choiceId,
    );
    if (!choice) return;

    const runtimeForResolve = stripEphemeralNarrationTransport(runtime);

    const {
      nextState: resolvedState,
      terminal,
      profileWorldFlagWrites,
    } = resolveChoice(currentStory, runtimeForResolve, scene, choice);

    let workingProfile = profile;
    if (profileWorldFlagWrites?.length) {
      workingProfile = mergeWorldFlagWrites(workingProfile, profileWorldFlagWrites);
    }

    let nextState = resolvedState;
    if (currentStory.storyClass === "pressured") {
      nextState = flushPressuredPendingSignals(currentStory, resolvedState);
    }

    const sceneAfter = terminal
      ? null
      : getScene(currentStory, nextState.currentSceneId);

    // Terminal choice (no nextSceneId) OR a scene explicitly marked terminal
    // OR a scene with no visible choices -> run ending resolution.
    // Uses post-flush scene (forced follow-up may have moved the cursor).
    const profileSnap = toRuntimeProfileSnapshot(workingProfile);

    const shouldResolveEnding =
      terminal ||
      !sceneAfter ||
      sceneAfter.isTerminal ||
      getVisibleChoices(
        currentStory,
        nextState,
        sceneAfter,
        profileSnap,
      ).length === 0;

    if (shouldResolveEnding) {
      const ending = resolveEnding(currentStory, nextState, profileSnap);
      const runtimeWithEnding: StoryRuntimeState = {
        ...nextState,
        endingId: ending?.id ?? null,
        unlockedEchoes: ending?.echoes ?? [],
      };
      let nextProfile = workingProfile;
      if (ending) {
        nextProfile = applyResolvedEndingToProfile(
          nextProfile,
          currentStory.id,
          ending,
        );
      }
      nextProfile = persistRuntime(nextProfile, runtimeWithEnding);
      set({
        runtime: runtimeWithEnding,
        resolvedEnding: ending,
        playNarrationFrame: null,
        profile: nextProfile,
      });
      return;
    }

    const nextProfile = persistRuntime(workingProfile, nextState);
    const narration = resolvePlayNarration(currentStory, nextState);
    const hasNarration = Boolean(
      narration.postChoice?.lines.length || narration.sceneArrival?.lines.length,
    );
    set({
      runtime: nextState,
      profile: nextProfile,
      playNarrationFrame: hasNarration ? narration : null,
    });
  },

  resetStory: () => {
    const { currentStory, runtime, profile } = get();
    if (!currentStory || !runtime) return;
    const fresh = createInitialRuntime(currentStory, runtime.personalityId);
    const nextProfile = persistRuntime(profile, fresh);
    set({
      runtime: fresh,
      resolvedEnding: null,
      playNarrationFrame: null,
      profile: nextProfile,
    });
  },

  clearAll: () => {
    clearProfile();
    set({
      profile: {
        globalEchoes: [],
        completedEndings: {},
        worldFlags: {},
        unlockedModuleIds: [],
        lastRuntime: null,
      },
      runtime: null,
      currentStory: null,
      resolvedEnding: null,
      playNarrationFrame: null,
    });
  },

  getCurrentScene: () => {
    const { currentStory, runtime } = get();
    if (!currentStory || !runtime) return null;
    return getScene(currentStory, runtime.currentSceneId);
  },

  getVisibleChoicesForCurrentScene: () => {
    const { runtime, currentStory, profile } = get();
    const scene = get().getCurrentScene();
    if (!runtime || !scene || !currentStory) return [];
    return getVisibleChoices(
      currentStory,
      runtime,
      scene,
      toRuntimeProfileSnapshot(profile),
    );
  },
}));
