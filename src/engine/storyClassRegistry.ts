import type { StoryClass } from "./types";
import type { StoryClassHandler } from "./storyClassTypes";
import { distortedHandler } from "./storyClasses/distorted";
import { possessedHandler } from "./storyClasses/possessed";
import { pressuredHandler } from "./storyClasses/pressured";
import { stableHandler } from "./storyClasses/stable";
import { witnessHandler } from "./storyClasses/witness";

const registry: Record<StoryClass, StoryClassHandler> = {
  stable: stableHandler,
  pressured: pressuredHandler,
  distorted: distortedHandler,
  possessed: possessedHandler,
  witness: witnessHandler,
};

export function getStoryClassHandler(storyClass: StoryClass): StoryClassHandler {
  return registry[storyClass];
}
