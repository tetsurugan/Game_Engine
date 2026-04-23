import { evaluateConditions } from "./conditionEvaluator";
import { buildStoryClassHookContext } from "./storyClassContext";
import { getStoryClassHandler } from "./storyClassRegistry";
import { getScene } from "./storyEngine";
import type {
  EndingDefinition,
  RuntimeProfileSnapshot,
  SceneDefinition,
  StoryDefinition,
  StoryRuntimeState,
} from "./types";

const FALLBACK_SCENE: SceneDefinition = {
  id: "__engine_fallback__",
  body: [],
  choices: [],
};

function resolveSceneForEnding(
  story: StoryDefinition,
  state: StoryRuntimeState,
): SceneDefinition {
  return (
    getScene(story, state.currentSceneId) ??
    (state.history.length > 0
      ? getScene(story, state.history[state.history.length - 1]!)
      : null) ??
    FALLBACK_SCENE
  );
}

/**
 * Returns the highest-priority ending whose conditions are satisfied, or null.
 * Runs `beforeEndingResolve` so classes can substitute evaluation state or
 * adjust effective priority.
 */
export function resolveEnding(
  story: StoryDefinition,
  state: StoryRuntimeState,
  profileSnapshot?: RuntimeProfileSnapshot,
): EndingDefinition | null {
  const handler = getStoryClassHandler(story.storyClass);
  const scene = resolveSceneForEnding(story, state);
  const ctx = buildStoryClassHookContext(story, scene, state);
  const before = handler.beforeEndingResolve?.(ctx);

  const evalState = before?.evaluationState ?? state;
  const delta = before?.endingPriorityDelta;

  const sorted = [...story.endings].sort((a, b) => {
    const pa = (a.priority ?? 0) + (delta?.[a.id] ?? 0);
    const pb = (b.priority ?? 0) + (delta?.[b.id] ?? 0);
    return pb - pa;
  });

  for (const ending of sorted) {
    if (evaluateConditions(evalState, ending.conditions, profileSnapshot))
      return ending;
  }
  return null;
}
