import type {
  PersonalityDefinition,
  StoryDefinition,
  StoryRuntimeState,
} from "./types";

/**
 * The personality interpreter is intentionally small in the prototype: it
 * surfaces the currently selected personality and exposes its tags so the
 * engine and future story-class hooks can reason about disposition without
 * story content having to special-case it.
 *
 * Story-class hooks receive `personality` on the hook context. Lightweight
 * per-choice skew uses `ChoiceDefinition.personalityAppendConsequences` keyed
 * by `personalityId`.
 */
export function getPersonality(
  story: StoryDefinition,
  state: StoryRuntimeState,
): PersonalityDefinition | undefined {
  if (!state.personalityId || !story.personalities) return undefined;
  return story.personalities.find((p) => p.id === state.personalityId);
}

export function hasPersonalityTag(
  story: StoryDefinition,
  state: StoryRuntimeState,
  tag: string,
): boolean {
  const p = getPersonality(story, state);
  return !!p?.modifiers?.tags?.includes(tag);
}
