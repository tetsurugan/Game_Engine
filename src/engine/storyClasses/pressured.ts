import { evaluatePressuredSnapshot } from "../pressured/evaluatePressured";
import {
  buildPressuredMetaPatch,
  makeLastResolutionRecord,
  readPressuredEngineMeta,
} from "../pressured/engineMeta";
import type {
  AfterChoiceResolveResult,
  BeforeChoiceResolveResult,
  BeforeChoiceVisibleResult,
  StoryClassHandler,
} from "../storyClassTypes";

/**
 * First-pass `pressured` behavior: entirely driven by `story.pressuredConfig`.
 * Stories without config or with `inspect: []` behave like a pass-through.
 */
export const pressuredHandler: StoryClassHandler = {
  beforeChoiceVisible(ctx, choice) {
    const cfg = ctx.story.pressuredConfig;
    if (!cfg?.inspect?.length) return undefined;

    const snap = evaluatePressuredSnapshot(cfg, ctx.runtime, ctx.scene);
    const fx = snap.byChoice.get(choice.id);
    if (!fx) return undefined;

    const out: BeforeChoiceVisibleResult = {};
    if (fx.hide) out.visible = false;
    if (fx.disable) out.available = false;
    if (fx.relabel !== undefined) out.displayText = fx.relabel;
    if (fx.annotate !== undefined) out.displayAnnotation = fx.annotate;

    return Object.keys(out).length > 0 ? out : undefined;
  },

  beforeChoiceResolve(ctx): BeforeChoiceResolveResult | undefined {
    const cfg = ctx.story.pressuredConfig;
    if (!cfg?.inspect?.length) return undefined;

    const snap = evaluatePressuredSnapshot(cfg, ctx.runtime, ctx.scene);
    if (!snap.appendOnResolve.length) return undefined;

    return { appendConsequences: snap.appendOnResolve };
  },

  afterChoiceResolve(ctx): AfterChoiceResolveResult | undefined {
    const cfg = ctx.story.pressuredConfig;
    if (!cfg?.inspect?.length) return undefined;

    const snap = evaluatePressuredSnapshot(cfg, ctx.runtime, ctx.scene);
    const prev = readPressuredEngineMeta(ctx.runtime.engineMeta);

    const nextSlice = {
      ...prev,
      lastResolution: makeLastResolutionRecord({
        choiceId: ctx.choice.id,
        kind: snap.dominantResolutionKind,
        sceneId: ctx.scene.id,
      }),
      pending: [...(prev?.pending ?? []), ...snap.pendingSignals],
    };

    return {
      runtimePatch: {
        engineMeta: buildPressuredMetaPatch(ctx.runtime.engineMeta, nextSlice),
      },
    };
  },
};
