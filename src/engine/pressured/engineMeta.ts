import type {
  ChoiceId,
  PressuredEngineMeta,
  PressuredResolutionKind,
  SceneId,
} from "../types";

/** Namespace key inside `StoryRuntimeState.engineMeta`. */
export const PRESSURED_ENGINE_META_KEY = "pressured";

export function readPressuredEngineMeta(
  engineMeta: Record<string, unknown> | undefined,
): PressuredEngineMeta | undefined {
  const raw = engineMeta?.[PRESSURED_ENGINE_META_KEY];
  if (!raw || typeof raw !== "object") return undefined;
  return raw as PressuredEngineMeta;
}

export function buildPressuredMetaPatch(
  baseEngineMeta: Record<string, unknown> | undefined,
  nextSlice: PressuredEngineMeta,
): Record<string, unknown> {
  return {
    ...(baseEngineMeta ?? {}),
    [PRESSURED_ENGINE_META_KEY]: nextSlice,
  };
}

export function makeLastResolutionRecord(input: {
  choiceId: ChoiceId;
  kind: PressuredResolutionKind;
  sceneId: SceneId;
}): NonNullable<PressuredEngineMeta["lastResolution"]> {
  return {
    choiceId: input.choiceId,
    kind: input.kind,
    sceneId: input.sceneId,
    atMs: Date.now(),
  };
}
