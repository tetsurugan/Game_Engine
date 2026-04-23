import { storyDefinitionSchema } from "./schemas";
import type {
  BeliefRuntimeState,
  HiddenTruthRuntimeState,
  StoryDefinition,
  StoryRuntimeState,
  VowState,
} from "./types";

/**
 * High-level helpers that tie the smaller engine modules together. The
 * Zustand store in src/store is the orchestrator at runtime; this module
 * only provides pure factory / lookup helpers.
 */

/**
 * Validates a story definition at load time. Throws if the story is malformed.
 * In production you probably want to log & surface this instead.
 */
export function validateStory(story: unknown): StoryDefinition {
  const parsed = storyDefinitionSchema.parse(story);
  return parsed as StoryDefinition;
}

function buildInitialHiddenTruth(
  story: StoryDefinition,
): HiddenTruthRuntimeState | undefined {
  const variables: Record<string, number | boolean | string> = {};
  for (const v of story.hiddenTruth?.variables ?? []) {
    variables[v.id] = v.initialValue;
  }
  const flags: Record<string, boolean> = {};
  for (const f of story.hiddenTruth?.flags ?? []) {
    flags[f.id] = f.initialValue;
  }
  if (
    Object.keys(variables).length === 0 &&
    Object.keys(flags).length === 0
  ) {
    return undefined;
  }
  return { variables, flags };
}

function buildInitialBelief(story: StoryDefinition): BeliefRuntimeState | undefined {
  const variables: Record<string, number | boolean | string> = {};
  for (const v of story.belief?.variables ?? []) {
    variables[v.id] = v.initialValue;
  }
  const flags: Record<string, boolean> = {};
  for (const f of story.belief?.flags ?? []) {
    flags[f.id] = f.initialValue;
  }
  if (
    Object.keys(variables).length === 0 &&
    Object.keys(flags).length === 0
  ) {
    return undefined;
  }
  return { variables, flags };
}

export function createInitialRuntime(
  story: StoryDefinition,
  personalityId?: string,
): StoryRuntimeState {
  const variables: Record<string, number | boolean | string> = {};
  for (const v of story.variables) variables[v.id] = v.initialValue;

  const vowStates: Record<string, VowState> = {};
  for (const vow of story.vows ?? []) {
    vowStates[vow.id] = vow.initialState ?? "kept";
  }

  return {
    storyId: story.id,
    personalityId,
    currentSceneId: story.initialSceneId,
    variables,
    flags: {},
    vowStates,
    unlockedEchoes: [],
    endingId: null,
    history: [],
    hiddenTruth: buildInitialHiddenTruth(story),
    belief: buildInitialBelief(story),
  };
}

export function getScene(story: StoryDefinition, sceneId: string | null) {
  if (!sceneId) return null;
  return story.scenes.find((s) => s.id === sceneId) ?? null;
}
