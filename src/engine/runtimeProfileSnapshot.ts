import type { PersistedProfile, RuntimeProfileSnapshot } from "./types";

/**
 * Builds a shallow, read-only snapshot of persisted profile state for
 * in-play condition evaluation. Call sites pass this into
 * `evaluateConditions` / `resolveTarget`; the engine does not mutate it.
 */
export function toRuntimeProfileSnapshot(
  profile: PersistedProfile | null | undefined,
): RuntimeProfileSnapshot | undefined {
  if (!profile) return undefined;
  return {
    worldFlags: { ...(profile.worldFlags ?? {}) },
    globalEchoes: [...profile.globalEchoes],
    completedEndings: Object.fromEntries(
      Object.entries(profile.completedEndings).map(([storyId, endings]) => [
        storyId,
        [...endings],
      ]),
    ),
    unlockedModuleIds: [...(profile.unlockedModuleIds ?? [])],
    worldConsequenceMarks: [...(profile.worldConsequenceMarks ?? [])],
  };
}
