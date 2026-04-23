import { describe, expect, it } from "vitest";
import {
  appendPlayNarrationHookLines,
  PLAY_NARRATION_META_KEY,
  resolvePlayNarration,
} from "../playNarration";
import { PRESSURED_ENGINE_META_KEY } from "../pressured/engineMeta";
import type { StoryDefinition, StoryRuntimeState } from "../types";
import { minimalRuntime, minimalStory } from "./fixtures";

describe("resolvePlayNarration", () => {
  it("returns empty object when no authoring or hook lines exist", () => {
    const story = minimalStory();
    const runtime = minimalRuntime();
    expect(resolvePlayNarration(story, runtime)).toEqual({});
  });

  it("resolves post-choice lines from pressuredNarration by resolution kind", () => {
    const story: StoryDefinition = minimalStory({
      storyClass: "pressured",
      pressuredNarration: {
        postChoiceByKind: {
          strained: ["The vow tightens."],
        },
      },
    });
    const runtime: StoryRuntimeState = minimalRuntime({
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          lastResolution: {
            choiceId: "c1",
            kind: "strained",
            sceneId: "sc_a",
            atMs: 1,
          },
        },
      },
    });
    const r = resolvePlayNarration(story, runtime);
    expect(r.postChoice?.lines).toEqual(["The vow tightens."]);
    expect(r.postChoice?.resolutionKind).toBe("strained");
    expect(r.sceneArrival).toBeUndefined();
  });

  it("shows forced arrival only when forcedToSceneId matches current scene", () => {
    const story: StoryDefinition = minimalStory({
      storyClass: "pressured",
      pressuredNarration: {
        sceneArrivalByKind: {
          forced: ["Shoved through."],
        },
      },
    });
    const onB: StoryRuntimeState = minimalRuntime({
      currentSceneId: "sc_b",
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          followUp: {
            arrivalKind: "forced",
            forcedToSceneId: "sc_b",
          },
        },
      },
    });
    expect(resolvePlayNarration(story, onB).sceneArrival).toEqual({
      lines: ["Shoved through."],
      kind: "forced",
    });

    const wrongScene = minimalRuntime({
      currentSceneId: "sc_a",
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          followUp: {
            arrivalKind: "forced",
            forcedToSceneId: "sc_b",
          },
        },
      },
    });
    expect(resolvePlayNarration(story, wrongScene).sceneArrival).toBeUndefined();
  });

  it("merges hook post-choice lines before authored lines", () => {
    const story: StoryDefinition = minimalStory({
      storyClass: "pressured",
      pressuredNarration: {
        postChoiceByKind: {
          normal: ["Authored."],
        },
      },
    });
    let runtime: StoryRuntimeState = minimalRuntime({
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          lastResolution: {
            choiceId: "c1",
            kind: "normal",
            sceneId: "sc_a",
            atMs: 1,
          },
        },
      },
    });
    runtime = appendPlayNarrationHookLines(runtime, ["From hook."]);
    const r = resolvePlayNarration(story, runtime);
    expect(r.postChoice?.lines).toEqual(["From hook.", "Authored."]);
  });

  it("omits postChoice when there is no lastResolution and no hook lines", () => {
    const story: StoryDefinition = minimalStory({
      pressuredNarration: {
        postChoiceByKind: { forced: ["X"] },
      },
    });
    const runtime = minimalRuntime();
    expect(resolvePlayNarration(story, runtime)).toEqual({});
  });

  it("allows hook-only postChoice without pressured resolution kind", () => {
    const story = minimalStory();
    const runtime = appendPlayNarrationHookLines(
      minimalRuntime(),
      ["Possession whispers."],
    );
    const r = resolvePlayNarration(story, runtime);
    expect(r.postChoice?.lines).toEqual(["Possession whispers."]);
    expect(r.postChoice?.resolutionKind).toBeUndefined();
  });

  it("resolves mutated arrival when followUp says mutated", () => {
    const story: StoryDefinition = minimalStory({
      pressuredNarration: {
        sceneArrivalByKind: { mutated: ["Same room, wrong air."] },
      },
    });
    const runtime = minimalRuntime({
      engineMeta: {
        [PRESSURED_ENGINE_META_KEY]: {
          followUp: { arrivalKind: "mutated" },
        },
      },
    });
    expect(resolvePlayNarration(story, runtime).sceneArrival).toEqual({
      lines: ["Same room, wrong air."],
      kind: "mutated",
    });
  });

  it("ignores stray playNarration object without hook lines", () => {
    const story = minimalStory();
    const runtime: StoryRuntimeState = minimalRuntime({
      engineMeta: {
        [PLAY_NARRATION_META_KEY]: {},
      },
    });
    expect(resolvePlayNarration(story, runtime)).toEqual({});
  });
});
