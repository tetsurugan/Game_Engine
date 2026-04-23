import { afterEach, describe, expect, it, vi } from "vitest";
import * as storyClassRegistry from "../storyClassRegistry";
import {
  getVisibleChoices,
  resolveChoice,
} from "../choiceResolver";
import { PRESSURED_ENGINE_META_KEY } from "../pressured/engineMeta";
import type {
  ChoiceDefinition,
  SceneDefinition,
  StoryDefinition,
} from "../types";
import {
  minimalRuntime,
  minimalStory,
  profileSnapshot,
  progressionStory,
} from "./fixtures";

function sceneById(story: StoryDefinition, id: string): SceneDefinition {
  const s = story.scenes.find((x) => x.id === id);
  if (!s) throw new Error(`missing scene ${id}`);
  return s;
}

function choiceById(scene: SceneDefinition, id: string): ChoiceDefinition {
  const c = scene.choices.find((x) => x.id === id);
  if (!c) throw new Error(`missing choice ${id}`);
  return c;
}

describe("resolveChoice", () => {
  it("advances currentSceneId and applies base consequences", () => {
    const story = progressionStory();
    const state = minimalRuntime({ variables: { n: 0 } });
    const scene = sceneById(story, "sc_a");
    const choice = choiceById(scene, "go_b");

    const { nextState, nextScene, terminal } = resolveChoice(
      story,
      state,
      scene,
      choice,
    );

    expect(terminal).toBe(false);
    expect(nextState.currentSceneId).toBe("sc_b");
    expect(nextState.variables.n).toBe(2);
    expect(nextState.history).toEqual(["sc_a"]);
    expect(nextScene?.id).toBe("sc_b");
  });

  it("marks terminal when choice has no nextSceneId", () => {
    const story = progressionStory({
      scenes: [
        {
          id: "sc_a",
          body: [],
          choices: [
            {
              id: "end_here",
              text: "Stop",
              consequences: [
                { type: "setFlag", target: "done", value: true },
              ],
            },
          ],
        },
        { id: "sc_b", body: [], choices: [] },
      ],
    });
    const state = minimalRuntime();
    const scene = sceneById(story, "sc_a");
    const choice = choiceById(scene, "end_here");

    const { nextState, terminal, nextScene } = resolveChoice(
      story,
      state,
      scene,
      choice,
    );

    expect(terminal).toBe(true);
    expect(nextState.currentSceneId).toBeNull();
    expect(nextScene).toBeNull();
    expect(nextState.flags.done).toBe(true);
  });

  it("merges personalityAppendConsequences only for the active personality", () => {
    const story = progressionStory({
      personalities: [
        { id: "p_alpha", name: "Alpha", preview: "A" },
        { id: "p_beta", name: "Beta", preview: "B" },
      ],
      scenes: [
        {
          id: "sc_a",
          body: [],
          choices: [
            {
              id: "go_b",
              text: "Go",
              nextSceneId: "sc_b",
              consequences: [
                { type: "incrementVariable", target: "n", value: 1 },
              ],
              personalityAppendConsequences: {
                p_alpha: [
                  { type: "incrementVariable", target: "n", value: 10 },
                ],
                p_beta: [
                  { type: "incrementVariable", target: "n", value: 100 },
                ],
              },
            },
          ],
        },
        { id: "sc_b", body: [], choices: [] },
      ],
    });

    const scene = sceneById(story, "sc_a");
    const choice = choiceById(scene, "go_b");

    const alpha = resolveChoice(
      story,
      minimalRuntime({ personalityId: "p_alpha", variables: { n: 0 } }),
      scene,
      choice,
    );
    expect(alpha.nextState.variables.n).toBe(11);

    const beta = resolveChoice(
      story,
      minimalRuntime({ personalityId: "p_beta", variables: { n: 0 } }),
      scene,
      choice,
    );
    expect(beta.nextState.variables.n).toBe(101);

    const none = resolveChoice(
      story,
      minimalRuntime({ variables: { n: 0 } }),
      scene,
      choice,
    );
    expect(none.nextState.variables.n).toBe(1);
  });

  it("partitions setWorldFlag into profileWorldFlagWrites and does not apply it to runtime", () => {
    const story = progressionStory({
      scenes: [
        {
          id: "sc_a",
          body: [],
          choices: [
            {
              id: "go_b",
              text: "Go",
              nextSceneId: "sc_b",
              consequences: [
                { type: "incrementVariable", target: "n", value: 1 },
                { type: "setWorldFlag", target: "dur_flag", value: true },
              ],
            },
          ],
        },
        { id: "sc_b", body: [], choices: [] },
      ],
    });
    const state = minimalRuntime({ variables: { n: 0 } });
    const scene = sceneById(story, "sc_a");
    const choice = choiceById(scene, "go_b");

    const { nextState, profileWorldFlagWrites } = resolveChoice(
      story,
      state,
      scene,
      choice,
    );

    expect(profileWorldFlagWrites).toEqual([
      { target: "dur_flag", value: true },
    ]);
    expect(nextState.variables.n).toBe(1);
    expect(nextState.flags).toEqual({});
  });

  it("appends pressured tier consequences via beforeChoiceResolve", () => {
    const story = progressionStory({
      storyClass: "pressured",
      variables: [
        { id: "heat", type: "number", initialValue: 1 },
        { id: "n", type: "number", initialValue: 0 },
      ],
      pressuredConfig: {
        inspect: [
          {
            variableId: "heat",
            tiers: [
              {
                whenGte: 0,
                appendOnResolve: [
                  { type: "incrementVariable", target: "n", value: 3 },
                ],
              },
            ],
          },
        ],
      },
    });
    const state = minimalRuntime({ variables: { heat: 1, n: 0 } });
    const scene = sceneById(story, "sc_a");
    const choice = choiceById(scene, "go_b");

    const { nextState } = resolveChoice(story, state, scene, choice);

    expect(nextState.variables.n).toBe(5);
    const meta = nextState.engineMeta?.[PRESSURED_ENGINE_META_KEY] as {
      lastResolution?: { kind: string };
    };
    expect(meta?.lastResolution?.kind).toBe("strained");
  });

  it("applies stubbed beforeChoiceResolve override + append + nextSceneIdOverride", () => {
    vi.spyOn(storyClassRegistry, "getStoryClassHandler").mockImplementation(
      () => ({
        beforeChoiceResolve: () => ({
          consequencesOverride: [
            { type: "setVariable", target: "n", value: 40 },
          ],
          appendConsequences: [
            { type: "incrementVariable", target: "n", value: 2 },
          ],
          nextSceneIdOverride: "sc_b",
        }),
      }),
    );

    const story = progressionStory({
      scenes: [
        {
          id: "sc_a",
          body: [],
          choices: [
            {
              id: "go_b",
              text: "Go",
              consequences: [
                { type: "incrementVariable", target: "n", value: 999 },
              ],
            },
          ],
        },
        { id: "sc_b", body: [], choices: [] },
      ],
    });
    const state = minimalRuntime({ variables: { n: 0 } });
    const scene = sceneById(story, "sc_a");
    const choice = choiceById(scene, "go_b");

    const { nextState, terminal } = resolveChoice(story, state, scene, choice);

    expect(terminal).toBe(false);
    expect(nextState.currentSceneId).toBe("sc_b");
    expect(nextState.variables.n).toBe(42);
  });

  it("merges postChoiceNarrationLines from afterChoiceResolve stub", () => {
    vi.spyOn(storyClassRegistry, "getStoryClassHandler").mockImplementation(
      () => ({
        afterChoiceResolve: () => ({
          postChoiceNarrationLines: ["Hook line."],
        }),
      }),
    );

    const story = progressionStory();
    const state = minimalRuntime({ variables: { n: 0 } });
    const scene = sceneById(story, "sc_a");
    const choice = choiceById(scene, "go_b");

    const { nextState } = resolveChoice(story, state, scene, choice);

    const pn = nextState.engineMeta?.playNarration as {
      hookPostChoiceLines?: string[];
    };
    expect(pn?.hookPostChoiceLines).toEqual(["Hook line."]);
  });
});

describe("getVisibleChoices + profile snapshot", () => {
  it("uses RuntimeProfileSnapshot for choice conditions when provided", () => {
    const story = minimalStory({
      scenes: [
        {
          id: "sc_a",
          body: [],
          choices: [
            {
              id: "gated",
              text: "Gated",
              nextSceneId: "sc_b",
              conditions: [
                {
                  target: "profile.worldFlags.open",
                  operator: "eq",
                  value: true,
                },
              ],
            },
          ],
        },
        { id: "sc_b", body: [], choices: [] },
      ],
    });
    const state = minimalRuntime();
    const scene = sceneById(story, "sc_a");

    const without = getVisibleChoices(story, state, scene);
    expect(without.some((v) => v.choice.id === "gated")).toBe(false);

    const withSnap = getVisibleChoices(
      story,
      state,
      scene,
      profileSnapshot({ worldFlags: { open: true } }),
    );
    const row = withSnap.find((v) => v.choice.id === "gated");
    expect(row?.available).toBe(true);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
