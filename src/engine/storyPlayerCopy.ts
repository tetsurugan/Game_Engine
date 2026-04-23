import type { StoryDefinition } from "./types";

/** Resolved strings for menus and intros — no internal engine labels. */
export interface StoryPlayerPresentation {
  title: string;
  summary: string;
  roleHint: string;
  toneHint?: string;
  unlockHint?: string;
}

export function getStoryPlayerPresentation(
  story: StoryDefinition,
): StoryPlayerPresentation {
  return {
    title: story.playerTitle ?? story.title,
    summary: story.playerSummary ?? story.description,
    roleHint: story.playerRoleHint ?? story.playerRole,
    toneHint: story.playerToneHint,
    unlockHint: story.unlockHint ?? story.playerUnlockHint,
  };
}

/**
 * Optional one-line continuation framing for browse/intro (no engine jargon).
 * Uses `playerContinuationHint` when set; otherwise “Continues from …” from
 * the anchor story’s presentation title. Requires `allStories` to resolve the anchor.
 */
export function resolveContinuationPresentationHint(
  story: StoryDefinition,
  allStories: StoryDefinition[] | undefined,
): string | undefined {
  if (!story.continuationOf) return undefined;
  const custom = story.playerContinuationHint?.trim();
  if (custom) return custom;
  if (!allStories?.length) return undefined;
  const anchor = allStories.find((s) => s.id === story.continuationOf!.storyId);
  if (!anchor) return undefined;
  const title = getStoryPlayerPresentation(anchor).title;
  return `Continues from “${title}”`;
}
