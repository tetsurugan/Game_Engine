import {
  getStoryPlayerPresentation,
  resolveContinuationPresentationHint,
} from "./storyPlayerCopy";
import type {
  EndingId,
  FlagId,
  PersistedProfile,
  StoryDefinition,
} from "./types";

/** Authoring-facing gate fields on a story (subset of `StoryDefinition`). */
export type StoryGateMetadata = Pick<
  StoryDefinition,
  | "isHiddenUntilUnlocked"
  | "requiresEchoes"
  | "excludesEchoes"
  | "requiresFlags"
  | "requiresAnyFlags"
  | "requiresAnyWorldConsequenceMarks"
  | "excludesFlags"
  | "requiresEndings"
  | "requiresUnlockedModuleIds"
  | "requiresWorldlineBranch"
  | "excludesWorldlineBranches"
  | "requiresWorldConsequenceMarks"
  | "excludesWorldConsequenceMarks"
  | "blockedWhenHistoryClosed"
  | "lockedUntilEchoes"
  | "preDiscoverySurfacing"
  | "rumorText"
  | "teaserTitle"
  | "teaserSummary"
  | "listPresentationStyle"
  | "continuationOf"
  | "variantGroup"
  | "variantId"
>;

export type StoryGateMutexReason =
  | { code: "excluded_echo_mutex"; echoId: FlagId }
  | { code: "excluded_world_flag_mutex"; flagId: string }
  | { code: "excluded_world_consequence_mark_mutex"; markId: string }
  | {
      code: "excluded_worldline_branch_mutex";
      groupId: string;
      branchId: string;
    }
  | { code: "excluded_closed_history_mutex"; markId: string };

export type StoryGateBlockedReason =
  | StoryGateMutexReason
  | { code: "missing_echo"; echoId: FlagId }
  | { code: "missing_world_flag"; flagId: string }
  | {
      code: "missing_any_profile_or";
      flagIds: string[];
      markIds: string[];
    }
  | { code: "missing_ending"; storyId: string; endingId: EndingId }
  | { code: "missing_unlocked_module"; moduleId: string }
  | { code: "locked_until_echo"; echoId: FlagId }
  | {
      code: "missing_worldline_branch";
      groupId: string;
      requiredBranchId: string;
      actualBranchId?: string;
    }
  | { code: "missing_world_consequence_mark"; markId: string };

/**
 * Player-facing surfacing tier. Internal gates map here — never show raw gate ids.
 */
export type StorySurfacingState =
  | "hidden"
  | "rumor"
  | "teaser"
  | "listed_locked"
  | "listed_secret"
  | "startable";

/** Copy resolved for the current surfacing state (safe for UI). */
export interface StorySurfacingPresentation {
  displayTitle: string;
  displaySummary: string;
  roleHint: string;
  toneHint?: string;
  unlockHint?: string;
  /** Mystery line for secret-styled shelf rows when locked or open. */
  secretHint?: string;
  rumorText?: string;
  teaserTitle?: string;
  teaserSummary?: string;
  /** Subtle shelf/intro line when this module continues another (no engine jargon). */
  continuationHint?: string;
}

export interface StorySurfacingResult {
  state: StorySurfacingState;
  /** May begin a new play session from intro. */
  isStartable: boolean;
  /** Appears on the main anthology list row. */
  isListed: boolean;
  /** Rumor strip, teaser band, or main list — any browse presence. */
  appearsInBrowse: boolean;
  blockedReasons: StoryGateBlockedReason[];
  mutexConflicts: StoryGateMutexReason[];
  playerFacing: StorySurfacingPresentation;
  /** Continuation / variant hints for future sequel UX (no engine jargon). */
  sequencing?: {
    continuationOfStoryId?: string;
    variantGroup?: string;
    variantId?: string;
  };
}

/** @deprecated Prefer `evaluateStorySurfacing` + `StorySurfacingResult`. */
export interface StoryAvailability {
  isVisible: boolean;
  isListable: boolean;
  isStartable: boolean;
  blockedReasons: StoryGateBlockedReason[];
  mutexConflicts: StoryGateMutexReason[];
}

interface GateSnapshot {
  mutexConflicts: StoryGateMutexReason[];
  discoveryBlocked: StoryGateBlockedReason[];
  discoveryPass: boolean;
  lockBlocked: StoryGateBlockedReason[];
  isStartable: boolean;
  blockedReasons: StoryGateBlockedReason[];
}

function computeGateSnapshot(
  story: StoryDefinition,
  profile: PersistedProfile,
): GateSnapshot {
  const mutexConflicts: StoryGateMutexReason[] = [];
  const echoes = profile.globalEchoes;
  const flags = profile.worldFlags ?? {};
  const endings = profile.completedEndings;
  const worldlines = profile.worldlineBranches ?? {};
  const consequenceMarks = profile.worldConsequenceMarks ?? [];
  const closedHistory = profile.closedHistoryMarks ?? [];

  for (const echoId of story.excludesEchoes ?? []) {
    if (echoes.includes(echoId)) {
      mutexConflicts.push({ code: "excluded_echo_mutex", echoId });
    }
  }
  for (const flagId of story.excludesFlags ?? []) {
    if (flags[flagId]) {
      mutexConflicts.push({ code: "excluded_world_flag_mutex", flagId });
    }
  }

  for (const markId of story.excludesWorldConsequenceMarks ?? []) {
    if (consequenceMarks.includes(markId)) {
      mutexConflicts.push({
        code: "excluded_world_consequence_mark_mutex",
        markId,
      });
    }
  }

  for (const ref of story.excludesWorldlineBranches ?? []) {
    if (worldlines[ref.groupId] === ref.branchId) {
      mutexConflicts.push({
        code: "excluded_worldline_branch_mutex",
        groupId: ref.groupId,
        branchId: ref.branchId,
      });
    }
  }

  for (const markId of story.blockedWhenHistoryClosed ?? []) {
    if (closedHistory.includes(markId)) {
      mutexConflicts.push({ code: "excluded_closed_history_mutex", markId });
    }
  }

  if (mutexConflicts.length > 0) {
    return {
      mutexConflicts,
      discoveryBlocked: [],
      discoveryPass: false,
      lockBlocked: [],
      isStartable: false,
      blockedReasons: [...mutexConflicts],
    };
  }

  const discoveryBlocked: StoryGateBlockedReason[] = [];

  for (const echoId of story.requiresEchoes ?? []) {
    if (!echoes.includes(echoId)) {
      discoveryBlocked.push({ code: "missing_echo", echoId });
    }
  }

  for (const flagId of story.requiresFlags ?? []) {
    if (!flags[flagId]) {
      discoveryBlocked.push({ code: "missing_world_flag", flagId });
    }
  }

  const orFlags = story.requiresAnyFlags ?? [];
  const orMarks = story.requiresAnyWorldConsequenceMarks ?? [];
  if (orFlags.length > 0 || orMarks.length > 0) {
    const hit =
      orFlags.some((fid) => flags[fid]) ||
      orMarks.some((mid) => consequenceMarks.includes(mid));
    if (!hit) {
      discoveryBlocked.push({
        code: "missing_any_profile_or",
        flagIds: [...orFlags],
        markIds: [...orMarks],
      });
    }
  }

  for (const ref of story.requiresEndings ?? []) {
    const done = endings[ref.storyId] ?? [];
    if (!done.includes(ref.endingId)) {
      discoveryBlocked.push({
        code: "missing_ending",
        storyId: ref.storyId,
        endingId: ref.endingId,
      });
    }
  }

  const unlockedMods = profile.unlockedModuleIds ?? [];
  for (const moduleId of story.requiresUnlockedModuleIds ?? []) {
    if (!unlockedMods.includes(moduleId)) {
      discoveryBlocked.push({
        code: "missing_unlocked_module",
        moduleId,
      });
    }
  }

  if (story.requiresWorldlineBranch) {
    const { groupId, branchId } = story.requiresWorldlineBranch;
    const actual = worldlines[groupId];
    if (actual !== branchId) {
      discoveryBlocked.push({
        code: "missing_worldline_branch",
        groupId,
        requiredBranchId: branchId,
        ...(actual !== undefined ? { actualBranchId: actual } : {}),
      });
    }
  }

  for (const markId of story.requiresWorldConsequenceMarks ?? []) {
    if (!consequenceMarks.includes(markId)) {
      discoveryBlocked.push({
        code: "missing_world_consequence_mark",
        markId,
      });
    }
  }

  const discoveryPass = discoveryBlocked.length === 0;

  const lockBlocked: StoryGateBlockedReason[] = [];
  for (const echoId of story.lockedUntilEchoes ?? []) {
    if (!echoes.includes(echoId)) {
      lockBlocked.push({ code: "locked_until_echo", echoId });
    }
  }

  const isStartable = discoveryPass && lockBlocked.length === 0;
  const blockedReasons = discoveryPass ? lockBlocked : discoveryBlocked;

  return {
    mutexConflicts,
    discoveryBlocked,
    discoveryPass,
    lockBlocked,
    isStartable,
    blockedReasons,
  };
}

function buildSurfacingPresentation(
  story: StoryDefinition,
  state: StorySurfacingState,
  continuationHint?: string,
): StorySurfacingPresentation {
  const base = getStoryPlayerPresentation(story);
  const unlockHint = story.unlockHint ?? story.playerUnlockHint;
  const teaserTitle = story.teaserTitle ?? base.title;
  const teaserSummary = story.teaserSummary ?? base.summary;
  const showSecret =
    story.listPresentationStyle === "secret" &&
    (state === "listed_secret" || state === "startable");

  return {
    displayTitle: base.title,
    displaySummary: base.summary,
    roleHint: base.roleHint,
    toneHint: base.toneHint,
    unlockHint,
    secretHint: showSecret ? story.secretListHint : undefined,
    rumorText: story.rumorText,
    teaserTitle,
    teaserSummary,
    ...(continuationHint ? { continuationHint } : {}),
  };
}

function sequencingFromStory(
  story: StoryDefinition,
): StorySurfacingResult["sequencing"] | undefined {
  if (!story.continuationOf && !story.variantGroup && !story.variantId) {
    return undefined;
  }
  return {
    continuationOfStoryId: story.continuationOf?.storyId,
    variantGroup: story.variantGroup,
    variantId: story.variantId,
  };
}

export interface EvaluateStorySurfacingOptions {
  /** When provided, resolves optional `playerFacing.continuationHint` from `continuationOf`. */
  allStories?: StoryDefinition[];
}

/**
 * Canonical profile + story → surfacing tier, startability, and player copy.
 */
export function evaluateStorySurfacing(
  story: StoryDefinition,
  profile: PersistedProfile,
  options?: EvaluateStorySurfacingOptions,
): StorySurfacingResult {
  const allStories = options?.allStories;
  const continuationHint = resolveContinuationPresentationHint(
    story,
    allStories,
  );
  const snap = computeGateSnapshot(story, profile);
  const sequencing = sequencingFromStory(story);

  if (snap.mutexConflicts.length > 0) {
    const state: StorySurfacingState = "hidden";
    return {
      state,
      isStartable: false,
      isListed: false,
      appearsInBrowse: false,
      blockedReasons: snap.blockedReasons,
      mutexConflicts: snap.mutexConflicts,
      playerFacing: buildSurfacingPresentation(story, state, continuationHint),
      sequencing,
    };
  }

  if (!snap.discoveryPass) {
    const mode = story.preDiscoverySurfacing ?? "hidden";
    let state: StorySurfacingState = "hidden";

    if (mode === "rumor" && story.rumorText && story.rumorText.trim() !== "") {
      state = "rumor";
    } else if (
      mode === "teaser" &&
      ((story.teaserTitle && story.teaserTitle.trim() !== "") ||
        (story.teaserSummary && story.teaserSummary.trim() !== ""))
    ) {
      state = "teaser";
    }

    return {
      state,
      isStartable: false,
      isListed: false,
      appearsInBrowse: state !== "hidden",
      blockedReasons: snap.discoveryBlocked,
      mutexConflicts: snap.mutexConflicts,
      playerFacing: buildSurfacingPresentation(story, state, continuationHint),
      sequencing,
    };
  }

  if (!snap.isStartable) {
    const state: StorySurfacingState =
      story.listPresentationStyle === "secret" ? "listed_secret" : "listed_locked";
    return {
      state,
      isStartable: false,
      isListed: true,
      appearsInBrowse: true,
      blockedReasons: snap.blockedReasons,
      mutexConflicts: snap.mutexConflicts,
      playerFacing: buildSurfacingPresentation(story, state, continuationHint),
      sequencing,
    };
  }

  const state: StorySurfacingState = "startable";
  return {
    state,
    isStartable: true,
    isListed: true,
    appearsInBrowse: true,
    blockedReasons: [],
    mutexConflicts: snap.mutexConflicts,
    playerFacing: buildSurfacingPresentation(story, state, continuationHint),
    sequencing,
  };
}

/**
 * Backward-compatible gate summary. `isVisible` = any browse presence;
 * `isListable` = main shelf row.
 */
export function evaluateStoryAvailability(
  story: StoryDefinition,
  profile: PersistedProfile,
): StoryAvailability {
  const s = evaluateStorySurfacing(story, profile);
  return {
    isVisible: s.appearsInBrowse,
    isListable: s.isListed,
    isStartable: s.isStartable,
    blockedReasons: s.blockedReasons,
    mutexConflicts: s.mutexConflicts,
  };
}
