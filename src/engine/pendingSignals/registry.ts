import { applyConsequences } from "../consequenceApplier";
import { getScene } from "../storyEngine";
import type { Consequence, PressuredPendingSignal } from "../types";
import type {
  PendingSignalConsumeContext,
  PendingSignalConsumeResult,
  PendingSignalHandlerFn,
} from "./pendingSignalTypes";

function readSceneId(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const sid = (payload as { sceneId?: unknown }).sceneId;
  return typeof sid === "string" && sid.length > 0 ? sid : undefined;
}

function readConsequences(payload: unknown): Consequence[] | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const c = (payload as { consequences?: unknown }).consequences;
  return Array.isArray(c) ? (c as Consequence[]) : undefined;
}

/**
 * Forces `currentSceneId` when the scene exists in the story. Invalid payload
 * or unknown scene drops the signal to avoid a stuck queue.
 */
function handleForcedFollowupScene(
  signal: PressuredPendingSignal,
  ctx: PendingSignalConsumeContext,
): PendingSignalConsumeResult {
  const sceneId = readSceneId(signal.payload);
  if (!sceneId || !getScene(ctx.story, sceneId)) {
    return { consume: true };
  }
  return {
    consume: true,
    runtimePatch: { currentSceneId: sceneId },
    followUpPatch: {
      arrivalKind: "forced",
      forcedToSceneId: sceneId,
    },
  };
}

/**
 * Applies unavoidable consequences once, then removes the signal. Empty or
 * invalid payloads are dropped.
 */
function handlePreSceneConsequence(
  signal: PressuredPendingSignal,
  ctx: PendingSignalConsumeContext,
): PendingSignalConsumeResult {
  const consequences = readConsequences(signal.payload);
  if (!consequences?.length) return { consume: true };

  const after = applyConsequences(ctx.runtime, consequences);
  return {
    consume: true,
    runtimePatch: {
      variables: after.variables,
      flags: after.flags,
      vowStates: after.vowStates,
    },
    followUpPatch: { arrivalKind: "mutated" },
  };
}

/** Built-in handlers. Extend via `registerPendingSignalHandler`. */
export const pendingSignalHandlers: Record<string, PendingSignalHandlerFn> = {
  forced_followup_scene: handleForcedFollowupScene,
  pre_scene_consequence: handlePreSceneConsequence,
};

/**
 * Register or replace a handler for a signal `type`. Call from app bootstrap
 * or a story module side effect — keeps the core engine story-agnostic.
 */
export function registerPendingSignalHandler(
  type: string,
  handler: PendingSignalHandlerFn,
): void {
  pendingSignalHandlers[type] = handler;
}
