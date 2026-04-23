import { describe, expect, it } from "vitest";
import {
  evaluateCondition,
  evaluateConditions,
  resolveTarget,
} from "../conditionEvaluator";
import type { RuntimeProfileSnapshot, StoryRuntimeState } from "../types";
import { minimalRuntime } from "./fixtures";

const snapshot: RuntimeProfileSnapshot = {
  worldFlags: { wf: true },
  globalEchoes: ["ge1"],
  completedEndings: { story_a: ["end_x"] },
  unlockedModuleIds: ["mod1"],
};

describe("resolveTarget & evaluateCondition", () => {
  it("reads variables.* and flags.* from runtime", () => {
    const state: StoryRuntimeState = minimalRuntime({
      variables: { n: 3 },
      flags: { door_open: true },
      vowStates: { vow_a: "strained" },
    });
    expect(resolveTarget(state, "variables.n")).toBe(3);
    expect(
      evaluateCondition(state, {
        target: "variables.n",
        operator: "gte",
        value: 2,
      }),
    ).toBe(true);
    expect(
      evaluateCondition(state, {
        target: "flags.door_open",
        operator: "eq",
        value: true,
      }),
    ).toBe(true);
    expect(
      evaluateCondition(state, {
        target: "flags.missing_flag",
        operator: "eq",
        value: false,
      }),
    ).toBe(true);
    expect(
      evaluateCondition(state, {
        target: "vows.vow_a",
        operator: "eq",
        value: "strained",
      }),
    ).toBe(true);
  });

  it("reads hidden.variables.* and hidden.flags.*", () => {
    const state: StoryRuntimeState = minimalRuntime({
      hiddenTruth: {
        variables: { secret: 10 },
        flags: { objective: true },
      },
    });
    expect(resolveTarget(state, "hidden.variables.secret")).toBe(10);
    expect(
      evaluateCondition(state, {
        target: "hidden.flags.objective",
        operator: "eq",
        value: true,
      }),
    ).toBe(true);
    expect(resolveTarget(state, "hidden.flags.absent")).toBe(false);
  });

  it("reads profile.* when RuntimeProfileSnapshot is provided", () => {
    const state = minimalRuntime();
    expect(
      resolveTarget(state, "profile.worldFlags.wf", snapshot),
    ).toBe(true);
    expect(
      resolveTarget(state, "profile.globalEchoes", snapshot),
    ).toEqual(["ge1"]);
    expect(
      resolveTarget(state, "profile.completedEndings.story_a", snapshot),
    ).toEqual(["end_x"]);
    expect(
      resolveTarget(state, "profile.unlockedModuleIds", snapshot),
    ).toEqual(["mod1"]);
    expect(
      evaluateCondition(
        state,
        {
          target: "profile.worldFlags.wf",
          operator: "eq",
          value: true,
        },
        snapshot,
      ),
    ).toBe(true);
  });

  it("treats missing profile.worldFlags keys as false", () => {
    const state = minimalRuntime();
    expect(
      resolveTarget(state, "profile.worldFlags.not_set", snapshot),
    ).toBe(false);
  });

  it("returns undefined for profile.* when snapshot is absent", () => {
    const state = minimalRuntime();
    expect(resolveTarget(state, "profile.worldFlags.wf")).toBeUndefined();
    expect(
      evaluateCondition(state, {
        target: "profile.worldFlags.wf",
        operator: "eq",
        value: true,
      }),
    ).toBe(false);
  });

  it("supports includes on arrays (e.g. completed endings)", () => {
    const state = minimalRuntime();
    expect(
      evaluateCondition(
        state,
        {
          target: "profile.completedEndings.story_a",
          operator: "includes",
          value: "end_x",
        },
        snapshot,
      ),
    ).toBe(true);
    expect(
      evaluateCondition(
        state,
        {
          target: "profile.completedEndings.story_a",
          operator: "includes",
          value: "missing",
        },
        snapshot,
      ),
    ).toBe(false);
  });

  it("supports includes on in-run echoes target", () => {
    const state = minimalRuntime({ unlockedEchoes: ["a", "b"] });
    expect(
      evaluateCondition(state, {
        target: "echoes",
        operator: "includes",
        value: "b",
      }),
    ).toBe(true);
  });

  it("evaluateConditions is true for empty or undefined condition lists", () => {
    const state = minimalRuntime();
    expect(evaluateConditions(state, undefined)).toBe(true);
    expect(evaluateConditions(state, [])).toBe(true);
  });
});
