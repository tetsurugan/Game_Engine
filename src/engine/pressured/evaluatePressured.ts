import type {
  ChoiceId,
  Consequence,
  PressuredChoiceTierEffect,
  PressuredInspectTier,
  PressuredPendingSignal,
  PressuredResolutionKind,
  PressuredStoryConfig,
  SceneDefinition,
  StoryRuntimeState,
  VariableId,
} from "../types";

const KIND_RANK: Record<PressuredResolutionKind, number> = {
  normal: 0,
  strained: 1,
  mutated: 2,
  forced: 3,
};

function maxKind(
  a: PressuredResolutionKind,
  b: PressuredResolutionKind,
): PressuredResolutionKind {
  return KIND_RANK[b] > KIND_RANK[a] ? b : a;
}

function readNumeric(runtime: StoryRuntimeState, id: VariableId): number {
  const v = runtime.variables[id];
  return typeof v === "number" && !Number.isNaN(v) ? v : 0;
}

function tierAppliesToScene(tier: PressuredInspectTier, scene: SceneDefinition): boolean {
  if (tier.sceneId === undefined) return true;
  return tier.sceneId === scene.id;
}

function inferTierKind(tier: PressuredInspectTier): PressuredResolutionKind {
  if (tier.resolutionKind !== undefined) return tier.resolutionKind;
  const hasAppend = (tier.appendOnResolve?.length ?? 0) > 0;
  const hasPending = (tier.pendingSignals?.length ?? 0) > 0;
  const hasChoiceFx = (tier.choiceEffects?.length ?? 0) > 0;
  if (hasAppend) return "strained";
  if (hasPending) return "mutated";
  if (hasChoiceFx) return "strained";
  return "normal";
}

export interface MergedPressuredChoiceEffect {
  hide: boolean;
  disable: boolean;
  relabel?: string;
  annotate?: string;
}

export interface PressuredSnapshot {
  appendOnResolve: Consequence[];
  byChoice: Map<ChoiceId, MergedPressuredChoiceEffect>;
  dominantResolutionKind: PressuredResolutionKind;
  pendingSignals: PressuredPendingSignal[];
}

function emptySnapshot(): PressuredSnapshot {
  return {
    appendOnResolve: [],
    byChoice: new Map(),
    dominantResolutionKind: "normal",
    pendingSignals: [],
  };
}

function mergeChoiceEffect(
  into: MergedPressuredChoiceEffect,
  fx: PressuredChoiceTierEffect,
): void {
  if (fx.hide) into.hide = true;
  if (fx.disable) into.disable = true;
  if (fx.relabel !== undefined) into.relabel = fx.relabel;
  if (fx.annotate !== undefined) into.annotate = fx.annotate;
}

/**
 * Computes the active pressure snapshot for the current runtime *before* a
 * choice's consequences are applied. Used by visibility, resolve, and audit hooks.
 */
export function evaluatePressuredSnapshot(
  config: PressuredStoryConfig | undefined,
  runtime: StoryRuntimeState,
  scene: SceneDefinition,
): PressuredSnapshot {
  if (!config?.inspect?.length) return emptySnapshot();

  const byChoice = new Map<ChoiceId, MergedPressuredChoiceEffect>();
  const appendOnResolve: Consequence[] = [];
  const pendingSignals: PressuredPendingSignal[] = [];
  let dominantResolutionKind: PressuredResolutionKind = "normal";

  for (const watch of config.inspect) {
    const value = readNumeric(runtime, watch.variableId);
    const sorted = [...watch.tiers].sort((a, b) => b.whenGte - a.whenGte);
    const active = sorted.find(
      (t) => value >= t.whenGte && tierAppliesToScene(t, scene),
    );
    if (!active) continue;

    dominantResolutionKind = maxKind(
      dominantResolutionKind,
      inferTierKind(active),
    );

    if (active.appendOnResolve?.length)
      appendOnResolve.push(...active.appendOnResolve);
    if (active.pendingSignals?.length)
      pendingSignals.push(...active.pendingSignals);

    for (const ce of active.choiceEffects ?? []) {
      const prev = byChoice.get(ce.choiceId) ?? {
        hide: false,
        disable: false,
      };
      mergeChoiceEffect(prev, ce);
      byChoice.set(ce.choiceId, prev);
    }
  }

  return {
    appendOnResolve,
    byChoice,
    dominantResolutionKind,
    pendingSignals,
  };
}
