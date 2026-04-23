import type {
  Consequence,
  PressuredEngineMeta,
  PressuredPendingSignal,
  StoryDefinition,
  StoryRuntimeState,
} from "../types";

/**
 * Context passed to a pending-signal handler. `runtime` is always the latest
 * state in the flush pass (after prior signals in the same batch).
 */
export interface PendingSignalConsumeContext {
  story: StoryDefinition;
  runtime: StoryRuntimeState;
}

/**
 * Result of handling one queued `{ type, payload? }` signal.
 */
export interface PendingSignalConsumeResult {
  /**
   * When true, the signal is removed from `engineMeta.pressured.pending`.
   * When false, it is left on the queue (retry later or unknown handler).
   */
  consume: boolean;
  /** Applied to `runtime` before `runtimePatch`, using the current `runtime`. */
  applyConsequences?: Consequence[];
  /** Shallow-merged via `mergeRuntimePatch` after consequences. */
  runtimePatch?: Partial<StoryRuntimeState>;
  /** Deep-merged into `engineMeta.pressured.followUp` for this flush pass. */
  followUpPatch?: Partial<NonNullable<PressuredEngineMeta["followUp"]>>;
}

export type PendingSignalHandlerFn = (
  signal: PressuredPendingSignal,
  ctx: PendingSignalConsumeContext,
) => PendingSignalConsumeResult;
