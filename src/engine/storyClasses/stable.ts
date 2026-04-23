import type { StoryClassHandler } from "../storyClassTypes";

/**
 * Stable stories defer entirely to data-driven choices, personality appends,
 * and base engine rules. Hooks are intentionally empty — this handler exists
 * so the registry always resolves a real object and call sites stay uniform.
 */
export const stableHandler: StoryClassHandler = {};
