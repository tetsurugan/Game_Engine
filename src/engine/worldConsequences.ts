import type { EndingDefinition, PersistedProfile } from "./types";

/**
 * Durable **world consequence depth**: worldline mutex commits, named marks,
 * and permanent path closures. Merges from resolved endings only; complements
 * `worldFlags` and echoes (does not replace them).
 *
 * Gate evaluation reads `PersistedProfile` in `storyGateEvaluation.ts` — single
 * canonical evaluator.
 */

export function mergeWorldlineCommit(
  profile: PersistedProfile,
  ref: { groupId: string; branchId: string } | undefined,
): PersistedProfile {
  if (!ref) return profile;
  const worldlineBranches = { ...(profile.worldlineBranches ?? {}) };
  worldlineBranches[ref.groupId] = ref.branchId;
  return { ...profile, worldlineBranches };
}

export function mergeWorldConsequenceMarks(
  profile: PersistedProfile,
  marks: string[] | undefined,
): PersistedProfile {
  if (!marks?.length) return profile;
  const prev = profile.worldConsequenceMarks ?? [];
  const next = [...prev];
  for (const id of marks) {
    if (!next.includes(id)) next.push(id);
  }
  return { ...profile, worldConsequenceMarks: next };
}

export function mergeCloseHistoryMarks(
  profile: PersistedProfile,
  marks: string[] | undefined,
): PersistedProfile {
  if (!marks?.length) return profile;
  const prev = profile.closedHistoryMarks ?? [];
  const next = [...prev];
  for (const id of marks) {
    if (!next.includes(id)) next.push(id);
  }
  return { ...profile, closedHistoryMarks: next };
}

/**
 * Applies `EndingDefinition` world-consequence fields after echoes / worldFlags
 * ordering is handled by the caller.
 */
export function mergeEndingWorldConsequences(
  profile: PersistedProfile,
  ending: EndingDefinition,
): PersistedProfile {
  let next = profile;
  next = mergeWorldlineCommit(next, ending.worldlineCommit);
  next = mergeWorldConsequenceMarks(next, ending.worldConsequenceMarks);
  next = mergeCloseHistoryMarks(next, ending.closeHistoryMarks);
  return next;
}
