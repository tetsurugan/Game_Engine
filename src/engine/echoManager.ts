import type { EndingDefinition, FlagId, PersistedProfile } from "./types";

/**
 * Merges the echoes from a resolved ending into a persisted profile. Echo
 * ids are unique across the profile; adding an already-known echo is a no-op.
 */
export function persistEchoes(
  profile: PersistedProfile,
  storyId: string,
  ending: EndingDefinition,
): PersistedProfile {
  const newEchoes = (ending.echoes ?? []).filter(
    (e) => !profile.globalEchoes.includes(e),
  );
  const prevEndings = profile.completedEndings[storyId] ?? [];
  const completedEndings = {
    ...profile.completedEndings,
    [storyId]: prevEndings.includes(ending.id)
      ? prevEndings
      : [...prevEndings, ending.id],
  };
  return {
    ...profile,
    globalEchoes: [...profile.globalEchoes, ...newEchoes],
    completedEndings,
  };
}

export function hasEcho(profile: PersistedProfile, echo: FlagId): boolean {
  return profile.globalEchoes.includes(echo);
}
