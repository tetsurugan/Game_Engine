import { evaluateConditions } from "./conditionEvaluator";
import { applyConsequences } from "./consequenceApplier";
import { buildStoryClassHookContext } from "./storyClassContext";
import { getStoryClassHandler } from "./storyClassRegistry";
import { appendPlayNarrationHookLines } from "./playNarration";
import { mergeRuntimePatch } from "./runtimeMerge";
import type {
  ChoiceDefinition,
  Consequence,
  RuntimeProfileSnapshot,
  SceneDefinition,
  StoryDefinition,
  StoryRuntimeState,
} from "./types";

export interface VisibleChoice {
  choice: ChoiceDefinition;
  available: boolean;
  /** Effective label after `beforeChoiceVisible`; falls back to `choice.text`. */
  displayText?: string;
  displayAnnotation?: string;
}

function mergePersonalityConsequences(
  choice: ChoiceDefinition,
  personalityId: string | undefined,
): Consequence[] {
  if (!personalityId || !choice.personalityAppendConsequences) return [];
  return choice.personalityAppendConsequences[personalityId] ?? [];
}

/**
 * Filters scene choices for display, then runs `beforeChoiceVisible` for the
 * story's class handler.
 */
export function getVisibleChoices(
  story: StoryDefinition,
  state: StoryRuntimeState,
  scene: SceneDefinition,
  profileSnapshot?: RuntimeProfileSnapshot,
): VisibleChoice[] {
  const handler = getStoryClassHandler(story.storyClass);
  const ctx = buildStoryClassHookContext(story, scene, state);

  return scene.choices
    .map<VisibleChoice | null>((choice) => {
      const available = evaluateConditions(
        state,
        choice.conditions,
        profileSnapshot,
      );
      if (!available && !choice.showWhenLocked) return null;

      let row: VisibleChoice = { choice, available };
      const hook = handler.beforeChoiceVisible?.(ctx, choice);
      if (hook?.visible === false) return null;
      if (hook?.available !== undefined) row = { ...row, available: hook.available };
      if (hook?.displayText !== undefined) row.displayText = hook.displayText;
      if (hook?.displayAnnotation !== undefined)
        row.displayAnnotation = hook.displayAnnotation;

      return row;
    })
    .filter((c): c is VisibleChoice => c !== null);
}

export interface ChoiceResolutionResult {
  nextState: StoryRuntimeState;
  nextScene: SceneDefinition | null;
  /** Set when the choice leads directly out of the story (no nextSceneId). */
  terminal: boolean;
  /** Durable `profile.worldFlags` patches from `setWorldFlag` consequences. */
  profileWorldFlagWrites?: { target: string; value: boolean }[];
}

function partitionWorldFlagConsequences(consequences: Consequence[]): {
  runtimeConsequences: Consequence[];
  profileWorldFlagWrites: { target: string; value: boolean }[];
} {
  const profileWorldFlagWrites: { target: string; value: boolean }[] = [];
  const runtimeConsequences: Consequence[] = [];
  for (const c of consequences) {
    if (c.type === "setWorldFlag") {
      profileWorldFlagWrites.push({ target: c.target, value: c.value });
    } else {
      runtimeConsequences.push(c);
    }
  }
  return { runtimeConsequences, profileWorldFlagWrites };
}

/**
 * Resolves a choice: story-class hooks, personality appends, consequences,
 * scene advance. Pure — does not persist.
 */
export function resolveChoice(
  story: StoryDefinition,
  state: StoryRuntimeState,
  scene: SceneDefinition,
  choice: ChoiceDefinition,
): ChoiceResolutionResult {
  const handler = getStoryClassHandler(story.storyClass);
  const ctx = buildStoryClassHookContext(story, scene, state);
  const choiceCtx = { ...ctx, choice };

  const personalityExtras = mergePersonalityConsequences(choice, state.personalityId);
  const baseConsequences: Consequence[] = [
    ...(choice.consequences ?? []),
    ...personalityExtras,
  ];

  const before = handler.beforeChoiceResolve?.(choiceCtx);

  let consequences: Consequence[];
  if (before?.consequencesOverride) {
    consequences = [
      ...before.consequencesOverride,
      ...(before.appendConsequences ?? []),
    ];
  } else {
    consequences = [...baseConsequences, ...(before?.appendConsequences ?? [])];
  }

  const { runtimeConsequences, profileWorldFlagWrites } =
    partitionWorldFlagConsequences(consequences);

  const nextSceneId =
    before?.nextSceneIdOverride !== undefined
      ? before.nextSceneIdOverride
      : (choice.nextSceneId ?? null);

  let afterConsequences = applyConsequences(state, runtimeConsequences);

  const afterHook = handler.afterChoiceResolve?.({
    ...choiceCtx,
    nextState: afterConsequences,
  });
  if (afterHook?.runtimePatch) {
    afterConsequences = mergeRuntimePatch(afterConsequences, afterHook.runtimePatch);
  }
  if (afterHook?.postChoiceNarrationLines?.length) {
    afterConsequences = appendPlayNarrationHookLines(
      afterConsequences,
      afterHook.postChoiceNarrationLines,
    );
  }

  const nextScene = nextSceneId
    ? (story.scenes.find((s) => s.id === nextSceneId) ?? null)
    : null;

  const nextState: StoryRuntimeState = {
    ...afterConsequences,
    currentSceneId: nextSceneId,
    history: state.currentSceneId
      ? [...state.history, state.currentSceneId]
      : state.history,
  };

  return {
    nextState,
    nextScene,
    terminal: nextSceneId === null,
    profileWorldFlagWrites:
      profileWorldFlagWrites.length > 0 ? profileWorldFlagWrites : undefined,
  };
}
