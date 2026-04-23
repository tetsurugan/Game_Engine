import { getPersonality } from "./personalityInterpreter";
import type { SceneDefinition, StoryDefinition, StoryRuntimeState } from "./types";
import type { StoryClassHookContext } from "./storyClassTypes";

export function buildStoryClassHookContext(
  story: StoryDefinition,
  scene: SceneDefinition,
  runtime: StoryRuntimeState,
): StoryClassHookContext {
  return {
    story,
    scene,
    runtime,
    personality: getPersonality(story, runtime) ?? null,
  };
}
