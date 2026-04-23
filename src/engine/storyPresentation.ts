import {
  evaluateStorySurfacing,
  type EvaluateStorySurfacingOptions,
} from "./storyGateEvaluation";
export {
  getStoryPlayerPresentation,
  type StoryPlayerPresentation,
  resolveContinuationPresentationHint,
} from "./storyPlayerCopy";
import type { PersistedProfile, StoryDefinition } from "./types";
import type { StorySurfacingResult } from "./storyGateEvaluation";

export type { EvaluateStorySurfacingOptions };

export interface StoryBrowseState {
  /**
   * Included on the **main** anthology shelf (full rows).
   * Rumor/teaser entries are off this list.
   */
  list: boolean;
  /** May open intro and begin (subject to surfacing state). */
  unlocked: boolean;
  /** Canonical surfacing + player-facing copy. */
  surfacing: StorySurfacingResult;
}

/**
 * Browse / intro rules — delegates to `evaluateStorySurfacing`.
 * Pass `allStories` (e.g. full registry) so continuation framing can resolve
 * anchor titles into `surfacing.playerFacing.continuationHint`.
 */
export function getStoryBrowseState(
  story: StoryDefinition,
  profile: PersistedProfile,
  options?: EvaluateStorySurfacingOptions,
): StoryBrowseState {
  const s = evaluateStorySurfacing(story, profile, options);
  return {
    list: s.isListed,
    unlocked: s.isStartable,
    surfacing: s,
  };
}
