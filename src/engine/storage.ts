import type { PersistedProfile } from "./types";

const STORAGE_KEY = "pov.profile.v1";

const emptyProfile: PersistedProfile = {
  globalEchoes: [],
  completedEndings: {},
  worldFlags: {},
  unlockedModuleIds: [],
  worldlineBranches: {},
  worldConsequenceMarks: [],
  closedHistoryMarks: [],
  lastRuntime: null,
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function loadProfile(): PersistedProfile {
  if (!isBrowser()) return { ...emptyProfile };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...emptyProfile };
    const parsed = JSON.parse(raw) as Partial<PersistedProfile>;
    return {
      globalEchoes: parsed.globalEchoes ?? [],
      completedEndings: parsed.completedEndings ?? {},
      worldFlags: parsed.worldFlags ?? {},
      unlockedModuleIds: parsed.unlockedModuleIds ?? [],
      worldlineBranches: parsed.worldlineBranches ?? {},
      worldConsequenceMarks: parsed.worldConsequenceMarks ?? [],
      closedHistoryMarks: parsed.closedHistoryMarks ?? [],
      lastRuntime: parsed.lastRuntime ?? null,
    };
  } catch {
    return { ...emptyProfile };
  }
}

export function saveProfile(profile: PersistedProfile): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage may be full or disabled; fail silently for the prototype.
  }
}

export function clearProfile(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
