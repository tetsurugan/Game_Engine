import { persistEchoes } from "./echoManager";
import type { EndingDefinition, PersistedProfile } from "./types";
import { mergeEndingWorldConsequences } from "./worldConsequences";

export interface WorldFlagWrite {
  target: string;
  value: boolean;
}

/**
 * Merge durable world flags from a choice's `setWorldFlag` consequences.
 */
export function mergeWorldFlagWrites(
  profile: PersistedProfile,
  writes: WorldFlagWrite[],
): PersistedProfile {
  if (writes.length === 0) return profile;
  const worldFlags = { ...(profile.worldFlags ?? {}) };
  for (const w of writes) {
    worldFlags[w.target] = w.value;
  }
  return { ...profile, worldFlags };
}

function mergeEndingWorldFlags(
  profile: PersistedProfile,
  worldFlags: Record<string, boolean> | undefined,
): PersistedProfile {
  if (!worldFlags || Object.keys(worldFlags).length === 0) return profile;
  return {
    ...profile,
    worldFlags: { ...(profile.worldFlags ?? {}), ...worldFlags },
  };
}

function mergeEndingUnlocks(
  profile: PersistedProfile,
  unlocks: string[] | undefined,
): PersistedProfile {
  if (!unlocks || unlocks.length === 0) return profile;
  const prev = profile.unlockedModuleIds ?? [];
  const next = [...prev];
  for (const id of unlocks) {
    if (!next.includes(id)) next.push(id);
  }
  return { ...profile, unlockedModuleIds: next };
}

/**
 * Applies echoes, completed endings, `worldFlags`, and `unlocks` from a
 * resolved ending. Single entry point for ending-driven profile writes.
 */
export function applyResolvedEndingToProfile(
  profile: PersistedProfile,
  storyId: string,
  ending: EndingDefinition,
): PersistedProfile {
  let next = persistEchoes(profile, storyId, ending);
  next = mergeEndingWorldFlags(next, ending.worldFlags);
  next = mergeEndingWorldConsequences(next, ending);
  next = mergeEndingUnlocks(next, ending.unlocks);
  return next;
}
