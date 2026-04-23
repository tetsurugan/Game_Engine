import { describe, expect, it } from "vitest";
import { applyConsequences } from "../consequenceApplier";
import { resolveTarget, evaluateCondition } from "../conditionEvaluator";
import { mergeRuntimePatch } from "../runtimeMerge";
import { createInitialRuntime } from "../storyEngine";
import type { StoryDefinition, StoryRuntimeState } from "../types";
import { minimalRuntime, minimalStory } from "./fixtures";

describe("belief layer", () => {
  it("initializes belief from StoryDefinition when authored", () => {
    const story: StoryDefinition = minimalStory({
      belief: {
        flags: [{ id: "trusts_tip", initialValue: false }],
        variables: [{ id: "confidence", type: "number", initialValue: 3 }],
      },
    });
    const rt = createInitialRuntime(story);
    expect(rt.belief?.flags.trusts_tip).toBe(false);
    expect(rt.belief?.variables.confidence).toBe(3);
  });

  it("omits belief when the story does not declare it", () => {
    const story = minimalStory();
    const rt = createInitialRuntime(story);
    expect(rt.belief).toBeUndefined();
  });

  it("resolveTarget reads belief.variables and belief.flags", () => {
    const state: StoryRuntimeState = minimalRuntime({
      belief: {
        variables: { certainty: 40 },
        flags: { thinks_guilty: true },
      },
    });
    expect(resolveTarget(state, "belief.variables.certainty")).toBe(40);
    expect(resolveTarget(state, "belief.flags.thinks_guilty")).toBe(true);
    expect(resolveTarget(state, "belief.flags.missing")).toBe(false);
  });

  it("applies belief consequences without touching hidden or visible flags", () => {
    const state: StoryRuntimeState = minimalRuntime({
      variables: { n: 0 },
      flags: {},
      hiddenTruth: { variables: {}, flags: { obj: true } },
      belief: { variables: { c: 1 }, flags: { b: false } },
    });
    const next = applyConsequences(state, [
      { type: "setBeliefFlag", target: "b", value: true },
      { type: "incrementBeliefVariable", target: "c", value: 5 },
      { type: "setBeliefVariable", target: "note", value: "maybe" },
    ]);
    expect(next.belief?.flags.b).toBe(true);
    expect(next.belief?.variables.c).toBe(6);
    expect(next.belief?.variables.note).toBe("maybe");
    expect(next.variables.n).toBe(0);
    expect(next.hiddenTruth?.flags.obj).toBe(true);
  });

  it("mergeRuntimePatch deep-merges belief like hiddenTruth", () => {
    const base: StoryRuntimeState = minimalRuntime({
      belief: {
        variables: { a: 1 },
        flags: { f: false },
      },
    });
    const next = mergeRuntimePatch(base, {
      belief: { flags: { f: true } },
    });
    expect(next.belief?.variables.a).toBe(1);
    expect(next.belief?.flags.f).toBe(true);
  });

  it("hidden and belief namespaces are independent for the same flag id", () => {
    const state: StoryRuntimeState = minimalRuntime({
      hiddenTruth: { variables: {}, flags: { same_id: true } },
      belief: { variables: {}, flags: { same_id: false } },
    });
    expect(
      evaluateCondition(state, {
        target: "hidden.flags.same_id",
        operator: "eq",
        value: true,
      }),
    ).toBe(true);
    expect(
      evaluateCondition(state, {
        target: "belief.flags.same_id",
        operator: "eq",
        value: true,
      }),
    ).toBe(false);
  });
});
