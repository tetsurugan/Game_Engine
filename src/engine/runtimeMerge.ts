import type {
  BeliefRuntimeState,
  HiddenTruthRuntimeState,
  StoryRuntimeState,
} from "./types";

/** Patch shape: nested `hiddenTruth` / `belief` may be partial objects. */
export type StoryRuntimePatch = Partial<
  Omit<StoryRuntimeState, "hiddenTruth" | "belief" | "engineMeta">
> & {
  hiddenTruth?: Partial<HiddenTruthRuntimeState>;
  belief?: Partial<BeliefRuntimeState>;
  engineMeta?: Record<string, unknown>;
};

function mergeHiddenTruth(
  base: HiddenTruthRuntimeState | undefined,
  patch: Partial<HiddenTruthRuntimeState> | undefined,
): HiddenTruthRuntimeState | undefined {
  if (patch === undefined) return base;
  const variables = { ...(base?.variables ?? {}), ...(patch.variables ?? {}) };
  const flags = { ...(base?.flags ?? {}), ...(patch.flags ?? {}) };
  const hasAny =
    Object.keys(variables).length > 0 || Object.keys(flags).length > 0;
  if (!hasAny && !base) return undefined;
  return { variables, flags };
}

function mergeBelief(
  base: BeliefRuntimeState | undefined,
  patch: Partial<BeliefRuntimeState> | undefined,
): BeliefRuntimeState | undefined {
  if (patch === undefined) return base;
  const variables = { ...(base?.variables ?? {}), ...(patch.variables ?? {}) };
  const flags = { ...(base?.flags ?? {}), ...(patch.flags ?? {}) };
  const hasAny =
    Object.keys(variables).length > 0 || Object.keys(flags).length > 0;
  if (!hasAny && !base) return undefined;
  return { variables, flags };
}

/**
 * Merges a partial runtime patch into a full runtime state. Used by
 * `afterChoiceResolve` and any future hook that adjusts state in layers.
 */
export function mergeRuntimePatch(
  base: StoryRuntimeState,
  patch: StoryRuntimePatch,
): StoryRuntimeState {
  const next: StoryRuntimeState = {
    ...base,
    ...patch,
    variables: patch.variables
      ? { ...base.variables, ...patch.variables }
      : base.variables,
    flags: patch.flags ? { ...base.flags, ...patch.flags } : base.flags,
    vowStates: patch.vowStates
      ? { ...base.vowStates, ...patch.vowStates }
      : base.vowStates,
    unlockedEchoes: patch.unlockedEchoes ?? base.unlockedEchoes,
    history: patch.history ?? base.history,
    engineMeta:
      patch.engineMeta !== undefined
        ? { ...(base.engineMeta ?? {}), ...patch.engineMeta }
        : base.engineMeta,
    hiddenTruth:
      patch.hiddenTruth !== undefined
        ? mergeHiddenTruth(base.hiddenTruth, patch.hiddenTruth)
        : base.hiddenTruth,
    belief:
      patch.belief !== undefined
        ? mergeBelief(base.belief, patch.belief)
        : base.belief,
  };
  return next;
}
