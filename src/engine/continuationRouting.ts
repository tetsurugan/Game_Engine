import { evaluateStorySurfacing } from "./storyGateEvaluation";
import { resolveContinuationPresentationHint } from "./storyPlayerCopy";
import type { PersistedProfile, StoryDefinition } from "./types";
import type { StorySurfacingResult } from "./storyGateEvaluation";

/**
 * Continuation / variant routing — indexes `continuationOf` and `variantGroup`
 * without duplicating gate logic. Surfacing always flows through
 * `evaluateStorySurfacing` (profile gates, rumor/teaser/list mutex, etc.).
 *
 * See `docs/planning/branch_scope_doctrine.md`: not every ending implies a
 * playable continuation; this module only organizes stories that **do**
 * declare follow-up metadata.
 */

/** One follow-up story plus its canonical surfacing evaluation. */
export interface ContinuationFollowUpRow {
  story: StoryDefinition;
  surfacing: StorySurfacingResult;
}

/** Variant bucket: all definitions sharing `variantGroup`, each evaluated. */
export interface VariantGroupSummary {
  variantGroup: string;
  members: ContinuationFollowUpRow[];
  /** Subset that may begin play today. */
  startableStoryIds: string[];
  /** Subset on the main shelf (includes locked rows). */
  listedStoryIds: string[];
  /** Any browse presence (rumor/teaser/list). */
  visibleStoryIds: string[];
}

function evaluateWithRegistry(
  story: StoryDefinition,
  profile: PersistedProfile,
  allStories: StoryDefinition[] | undefined,
): StorySurfacingResult {
  return evaluateStorySurfacing(story, profile, { allStories });
}

/**
 * Map anchor `storyId` → stories that declare `continuationOf.storyId === anchor`.
 */
export function indexContinuationsByAnchor(
  allStories: StoryDefinition[],
): Map<string, StoryDefinition[]> {
  const map = new Map<string, StoryDefinition[]>();
  for (const s of allStories) {
    const anchor = s.continuationOf?.storyId;
    if (!anchor) continue;
    const list = map.get(anchor) ?? [];
    list.push(s);
    map.set(anchor, list);
  }
  return map;
}

/** Direct follow-up candidates for a finished (or anchor) module. */
export function getFollowUpsForAnchor(
  anchorStoryId: string,
  allStories: StoryDefinition[],
): StoryDefinition[] {
  return allStories.filter((s) => s.continuationOf?.storyId === anchorStoryId);
}

/**
 * Follow-ups for an anchor, each run through `evaluateStorySurfacing`.
 * Safe when there are none (empty array).
 */
export function evaluateFollowUpsForAnchor(
  anchorStoryId: string,
  allStories: StoryDefinition[],
  profile: PersistedProfile,
): ContinuationFollowUpRow[] {
  return getFollowUpsForAnchor(anchorStoryId, allStories).map((story) => ({
    story,
    surfacing: evaluateWithRegistry(story, profile, allStories),
  }));
}

/** Stories sharing a `variantGroup` id (may be continuations or standalone variants). */
export function getStoriesInVariantGroup(
  variantGroup: string,
  allStories: StoryDefinition[],
): StoryDefinition[] {
  return allStories.filter((s) => s.variantGroup === variantGroup);
}

/**
 * All members of a variant group with surfacing. Use gates (`requiresEndings`,
 * mutex flags, etc.) so typically only one branch is **startable** at a time.
 */
export function summarizeVariantGroup(
  variantGroup: string,
  allStories: StoryDefinition[],
  profile: PersistedProfile,
): VariantGroupSummary {
  const members = getStoriesInVariantGroup(variantGroup, allStories).map(
    (story) => ({
      story,
      surfacing: evaluateWithRegistry(story, profile, allStories),
    }),
  );
  return {
    variantGroup,
    members,
    startableStoryIds: members
      .filter((m) => m.surfacing.isStartable)
      .map((m) => m.story.id),
    listedStoryIds: members
      .filter((m) => m.surfacing.isListed)
      .map((m) => m.story.id),
    visibleStoryIds: members
      .filter((m) => m.surfacing.appearsInBrowse)
      .map((m) => m.story.id),
  };
}

/**
 * Follow-ups that are at least whisper-visible (rumor/teaser) or listed.
 */
export function filterFollowUpsByBrowsePresence(
  rows: ContinuationFollowUpRow[],
): ContinuationFollowUpRow[] {
  return rows.filter((r) => r.surfacing.appearsInBrowse);
}

/**
 * Follow-ups currently on the main anthology shelf.
 */
export function filterFollowUpsListed(
  rows: ContinuationFollowUpRow[],
): ContinuationFollowUpRow[] {
  return rows.filter((r) => r.surfacing.isListed);
}

/** @see resolveContinuationPresentationHint in storyPlayerCopy */
export const resolveContinuationHint = resolveContinuationPresentationHint;
