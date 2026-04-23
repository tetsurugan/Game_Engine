import {
  buildPressuredMetaPatch,
  readPressuredEngineMeta,
} from "./pressured/engineMeta";
import { mergeRuntimePatch } from "./runtimeMerge";
import type {
  PlayNarrationArrivalKind,
  PlayNarrationEngineMeta,
  PressuredEngineMeta,
  PressuredNarrationConfig,
  PressuredResolutionKind,
  ResolvedPlayNarration,
  StoryDefinition,
  StoryRuntimeState,
} from "./types";

/** Namespace inside `StoryRuntimeState.engineMeta` for hook + resolver I/O. */
export const PLAY_NARRATION_META_KEY = "playNarration";

export function readPlayNarrationMeta(
  engineMeta: Record<string, unknown> | undefined,
): PlayNarrationEngineMeta | undefined {
  const raw = engineMeta?.[PLAY_NARRATION_META_KEY];
  if (!raw || typeof raw !== "object") return undefined;
  return raw as PlayNarrationEngineMeta;
}

/**
 * Merges hook-returned lines into runtime (after `afterChoiceResolve` patches).
 */
export function appendPlayNarrationHookLines(
  runtime: StoryRuntimeState,
  lines: string[],
): StoryRuntimeState {
  if (!lines.length) return runtime;
  const base = runtime.engineMeta ?? {};
  const prev = readPlayNarrationMeta(base);
  const hookPostChoiceLines = [...(prev?.hookPostChoiceLines ?? []), ...lines];
  return mergeRuntimePatch(runtime, {
    engineMeta: {
      ...base,
      [PLAY_NARRATION_META_KEY]: { ...prev, hookPostChoiceLines },
    },
  });
}

/**
 * Clears hook-supplied post-choice lines before the next choice so banners
 * do not repeat stale copy.
 */
export function stripPlayNarrationHookLines(
  runtime: StoryRuntimeState,
): StoryRuntimeState {
  const em = runtime.engineMeta;
  if (!em) return runtime;
  const pn = readPlayNarrationMeta(em);
  if (!pn?.hookPostChoiceLines?.length) return runtime;

  const restPn: PlayNarrationEngineMeta = { ...pn };
  delete restPn.hookPostChoiceLines;
  const nextEm: Record<string, unknown> = { ...em };
  if (Object.keys(restPn).length > 0) {
    nextEm[PLAY_NARRATION_META_KEY] = restPn;
  } else {
    delete nextEm[PLAY_NARRATION_META_KEY];
  }

  if (Object.keys(nextEm).length === 0) {
    return { ...runtime, engineMeta: undefined };
  }
  return { ...runtime, engineMeta: nextEm };
}

/**
 * Drops arrival fields from `followUp` so a prior beat’s arrival narration is
 * not reused on the next choice. Call at the start of resolving a new choice.
 */
export function stripPressuredFollowUpArrival(
  runtime: StoryRuntimeState,
): StoryRuntimeState {
  const slice = readPressuredEngineMeta(runtime.engineMeta);
  if (!slice?.followUp) return runtime;

  const { arrivalKind, forcedToSceneId, ...rest } = slice.followUp;
  if (arrivalKind === undefined && forcedToSceneId === undefined) {
    return runtime;
  }

  const nextFollow =
    Object.keys(rest).length > 0
      ? ({ ...rest } as NonNullable<PressuredEngineMeta["followUp"]>)
      : undefined;

  const newSlice: PressuredEngineMeta = {
    ...slice,
    followUp: nextFollow,
  };

  return mergeRuntimePatch(runtime, {
    engineMeta: buildPressuredMetaPatch(runtime.engineMeta, newSlice),
  });
}

export function stripEphemeralNarrationTransport(
  runtime: StoryRuntimeState,
): StoryRuntimeState {
  let next = stripPlayNarrationHookLines(runtime);
  next = stripPressuredFollowUpArrival(next);
  return next;
}

function collectAuthoredPostChoice(
  cfg: PressuredNarrationConfig | undefined,
  choiceId: string | undefined,
  kind: PressuredResolutionKind | undefined,
): string[] {
  if (!cfg || !kind || !choiceId) return [];
  const perChoice = cfg.postChoiceByChoice?.[choiceId]?.[kind];
  const perKind = cfg.postChoiceByKind?.[kind];
  return [...(perChoice ?? []), ...(perKind ?? [])];
}

function pickSceneArrival(
  cfg: PressuredNarrationConfig | undefined,
  runtime: StoryRuntimeState,
  arrivalKind: PlayNarrationArrivalKind | undefined,
  forcedToSceneId: string | undefined,
): ResolvedPlayNarration["sceneArrival"] | undefined {
  if (!cfg?.sceneArrivalByKind || !arrivalKind) return undefined;
  const lines = cfg.sceneArrivalByKind[arrivalKind];
  if (!lines?.length) return undefined;

  if (arrivalKind === "forced") {
    if (forcedToSceneId !== runtime.currentSceneId) return undefined;
    return { lines, kind: "forced" };
  }

  if (arrivalKind === "mutated") {
    return { lines, kind: "mutated" };
  }

  if (arrivalKind === "free") {
    return { lines, kind: "free" };
  }

  return undefined;
}

/**
 * Pure: derives a single display frame from story authoring + runtime meta.
 * Does not mutate. The store snapshots the result after each choice for UI.
 */
export function resolvePlayNarration(
  story: StoryDefinition,
  runtime: StoryRuntimeState,
): ResolvedPlayNarration {
  const out: ResolvedPlayNarration = {};
  const hookLines =
    readPlayNarrationMeta(runtime.engineMeta)?.hookPostChoiceLines?.filter(
      (s) => typeof s === "string" && s.length > 0,
    ) ?? [];

  const pressured = readPressuredEngineMeta(runtime.engineMeta);
  const last = pressured?.lastResolution;
  const follow = pressured?.followUp;
  const cfg = story.pressuredNarration;

  const authored = collectAuthoredPostChoice(
    cfg,
    last?.choiceId,
    last?.kind,
  );
  const postLines = [...hookLines, ...authored];

  if (postLines.length > 0) {
    out.postChoice = {
      lines: postLines,
      resolutionKind: last?.kind,
    };
  }

  const arrival = pickSceneArrival(
    cfg,
    runtime,
    follow?.arrivalKind,
    follow?.forcedToSceneId,
  );
  if (arrival) out.sceneArrival = arrival;

  return out;
}
