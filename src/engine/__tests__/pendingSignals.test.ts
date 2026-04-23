import { describe, expect, it } from "vitest";
import { flushPressuredPendingSignals } from "../pendingSignals/flushPressuredPendingSignals";
import { PRESSURED_ENGINE_META_KEY } from "../pressured/engineMeta";
import type { StoryDefinition, StoryRuntimeState } from "../types";
import { minimalRuntime, minimalStory } from "./fixtures";

function pressuredStory(): StoryDefinition {
  return minimalStory({
    id: "pressured_fixture",
    storyClass: "pressured",
    variables: [{ id: "x", type: "number", initialValue: 0 }],
  });
}

describe("flushPressuredPendingSignals", () => {
  it("no-ops for non-pressured stories", () => {
    const story = minimalStory({ storyClass: "stable" });
    const runtime = minimalRuntime({
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          pending: [{ type: "forced_followup_scene", payload: { sceneId: "sc_b" } }],
        },
      },
    });
    const out = flushPressuredPendingSignals(story, runtime);
    expect(out).toBe(runtime);
  });

  it("no-ops when pending queue is empty", () => {
    const story = pressuredStory();
    const runtime = minimalRuntime({ storyId: story.id });
    const out = flushPressuredPendingSignals(story, runtime);
    expect(out).toBe(runtime);
  });

  it("consumes forced_followup_scene and moves cursor when scene exists", () => {
    const story = pressuredStory();
    const runtime: StoryRuntimeState = minimalRuntime({
      storyId: story.id,
      currentSceneId: "sc_a",
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          pending: [
            { type: "forced_followup_scene", payload: { sceneId: "sc_b" } },
          ],
        },
      },
    });
    const out = flushPressuredPendingSignals(story, runtime);
    expect(out.currentSceneId).toBe("sc_b");
    const meta = out.engineMeta?.[PRESSURED_ENGINE_META_KEY] as {
      pending?: unknown[];
      followUp?: { arrivalKind?: string; forcedToSceneId?: string };
      consumedHistory?: { type: string; atMs: number }[];
    };
    expect(meta?.pending).toEqual([]);
    expect(meta?.followUp).toMatchObject({
      arrivalKind: "forced",
      forcedToSceneId: "sc_b",
    });
    expect(meta?.consumedHistory?.length).toBe(1);
    expect(meta?.consumedHistory?.[0]?.type).toBe("forced_followup_scene");
  });

  it("drops invalid forced_followup_scene without patching scene (still consumes)", () => {
    const story = pressuredStory();
    const runtime: StoryRuntimeState = minimalRuntime({
      storyId: story.id,
      currentSceneId: "sc_a",
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          pending: [
            { type: "forced_followup_scene", payload: { sceneId: "nope" } },
          ],
        },
      },
    });
    const out = flushPressuredPendingSignals(story, runtime);
    expect(out.currentSceneId).toBe("sc_a");
    const meta = out.engineMeta?.[PRESSURED_ENGINE_META_KEY] as {
      pending?: unknown[];
      consumedHistory?: unknown[];
    };
    expect(meta?.pending).toEqual([]);
    expect(meta?.consumedHistory?.length).toBe(1);
  });

  it("applies pre_scene_consequence and sets mutated follow-up", () => {
    const story = pressuredStory();
    const runtime: StoryRuntimeState = minimalRuntime({
      storyId: story.id,
      currentSceneId: "sc_a",
      variables: { x: 0 },
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          pending: [
            {
              type: "pre_scene_consequence",
              payload: {
                consequences: [
                  { type: "incrementVariable", target: "x", value: 5 },
                ],
              },
            },
          ],
        },
      },
    });
    const out = flushPressuredPendingSignals(story, runtime);
    expect(out.variables.x).toBe(5);
    const meta = out.engineMeta?.[PRESSURED_ENGINE_META_KEY] as {
      pending?: unknown[];
      followUp?: { arrivalKind?: string };
    };
    expect(meta?.pending).toEqual([]);
    expect(meta?.followUp?.arrivalKind).toBe("mutated");
  });

  it("consumes empty pre_scene_consequence without consequences", () => {
    const story = pressuredStory();
    const runtime: StoryRuntimeState = minimalRuntime({
      storyId: story.id,
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          pending: [{ type: "pre_scene_consequence", payload: {} }],
        },
      },
    });
    const out = flushPressuredPendingSignals(story, runtime);
    const meta = out.engineMeta?.[PRESSURED_ENGINE_META_KEY] as {
      pending?: unknown[];
    };
    expect(meta?.pending).toEqual([]);
  });

  it("preserves unknown signal types in pending", () => {
    const story = pressuredStory();
    const unknown = { type: "future_signal", payload: {} };
    const runtime: StoryRuntimeState = minimalRuntime({
      storyId: story.id,
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          pending: [unknown],
        },
      },
    });
    const out = flushPressuredPendingSignals(story, runtime);
    const meta = out.engineMeta?.[PRESSURED_ENGINE_META_KEY] as {
      pending?: typeof unknown[];
    };
    expect(meta?.pending).toEqual([unknown]);
  });
});
