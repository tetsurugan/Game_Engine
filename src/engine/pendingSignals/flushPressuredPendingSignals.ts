import { applyConsequences } from "../consequenceApplier";
import {
  buildPressuredMetaPatch,
  readPressuredEngineMeta,
} from "../pressured/engineMeta";
import { mergeRuntimePatch } from "../runtimeMerge";
import type {
  PressuredEngineMeta,
  PressuredPendingSignal,
  StoryDefinition,
  StoryRuntimeState,
} from "../types";
import { pendingSignalHandlers } from "./registry";
import type { PendingSignalConsumeContext } from "./pendingSignalTypes";

const CONSUMED_HISTORY_CAP = 32;

/**
 * Processes `engineMeta.pressured.pending` for `storyClass: "pressured"` stories.
 * Unknown `type` values are preserved. No-op for other story classes or empty queues.
 */
export function flushPressuredPendingSignals(
  story: StoryDefinition,
  runtime: StoryRuntimeState,
): StoryRuntimeState {
  if (story.storyClass !== "pressured") return runtime;

  const baseSlice = readPressuredEngineMeta(runtime.engineMeta);
  const queue = baseSlice?.pending ?? [];
  if (!queue.length) return runtime;

  const remaining: PressuredPendingSignal[] = [];
  const consumedAt = Date.now();
  const consumedHistory = [...(baseSlice?.consumedHistory ?? [])];
  let followUp: PressuredEngineMeta["followUp"] = { ...baseSlice?.followUp };

  let state = runtime;

  for (const signal of queue) {
    const handler = pendingSignalHandlers[signal.type];
    if (!handler) {
      remaining.push(signal);
      continue;
    }

    const ctx: PendingSignalConsumeContext = { story, runtime: state };
    const result = handler(signal, ctx);

    if (!result.consume) {
      remaining.push(signal);
      continue;
    }

    consumedHistory.push({ type: signal.type, atMs: consumedAt });
    while (consumedHistory.length > CONSUMED_HISTORY_CAP) {
      consumedHistory.shift();
    }

    let next = state;
    if (result.applyConsequences?.length) {
      next = applyConsequences(next, result.applyConsequences);
    }
    if (result.runtimePatch) {
      next = mergeRuntimePatch(next, result.runtimePatch);
    }
    state = next;

    if (result.followUpPatch) {
      followUp = { ...followUp, ...result.followUpPatch };
    }
  }

  const newSlice: PressuredEngineMeta = {
    ...(baseSlice ?? {}),
    pending: remaining,
    consumedHistory,
    followUp,
  };

  return mergeRuntimePatch(state, {
    engineMeta: buildPressuredMetaPatch(state.engineMeta, newSlice),
  });
}
