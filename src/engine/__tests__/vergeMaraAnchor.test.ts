import { describe, expect, it } from "vitest";
import { resolveChoice } from "../choiceResolver";
import { evaluateStorySurfacing } from "../storyGateEvaluation";
import { resolveEnding } from "../endingResolver";
import { createInitialRuntime, getScene } from "../storyEngine";
import { getStoryById, storyRegistry } from "../../stories";
import { emptyProfile } from "./fixtures";
import type { StoryRuntimeState } from "../types";

describe("Verge Mara anchor (modern clan-gravity proof)", () => {
  const story = getStoryById("verge_mara_anchor")!;

  it("is open and startable on empty profile", () => {
    const surf = evaluateStorySurfacing(story, emptyProfile(), {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(true);
    expect(surf.state).toBe("startable");
  });

  it("hidden truth: Mara meant brake not anoint (stable)", () => {
    const rt = createInitialRuntime(story);
    expect(rt.hiddenTruth?.flags.mara_intended_brake_not_anoint).toBe(true);
  });

  it("resolveEnding: anointment belief → misread ending + echo", () => {
    const base = createInitialRuntime(story);
    const state: StoryRuntimeState = {
      ...base,
      currentSceneId: null,
      history: ["verge_supper_table", "verge_corridor_fork"],
      belief: {
        variables: {},
        flags: { heard_anointment: true },
      },
    };
    const e = resolveEnding(story, state);
    expect(e?.id).toBe("verge_proof_orbit_misread");
    expect(e?.echoes).toContain("verge_proof_orbit_misread");
    expect(e?.worldConsequenceMarks).toContain("verge_mara_anchor_touched");
  });

  it("resolveEnding: brake belief → line-held ending + different echo", () => {
    const base = createInitialRuntime(story);
    const state: StoryRuntimeState = {
      ...base,
      currentSceneId: null,
      history: ["verge_supper_table", "verge_corridor_fork"],
      belief: {
        variables: {},
        flags: { heard_anointment: false },
      },
    };
    const e = resolveEnding(story, state);
    expect(e?.id).toBe("verge_proof_line_held");
    expect(e?.echoes).toContain("verge_proof_dependency_named");
  });

  it("full chain: supper → corridor → anointment read → misread ending", () => {
    let rt = createInitialRuntime(story);
    const supper = getScene(story, rt.currentSceneId)!;
    rt = resolveChoice(story, rt, supper, supper.choices[0]!).nextState;
    expect(rt.currentSceneId).toBe("verge_corridor_fork");
    const corridor = getScene(story, rt.currentSceneId)!;
    rt = resolveChoice(
      story,
      rt,
      corridor,
      corridor.choices.find((c) => c.id === "execute_anointment_read")!,
    ).nextState;
    const e = resolveEnding(story, rt);
    expect(e?.id).toBe("verge_proof_orbit_misread");
  });

  it("full chain: supper → corridor → brake read → line-held ending", () => {
    let rt = createInitialRuntime(story);
    const supper = getScene(story, rt.currentSceneId)!;
    rt = resolveChoice(story, rt, supper, supper.choices[1]!).nextState;
    const corridor = getScene(story, rt.currentSceneId)!;
    rt = resolveChoice(
      story,
      rt,
      corridor,
      corridor.choices.find((c) => c.id === "execute_brake_read")!,
    ).nextState;
    const e = resolveEnding(story, rt);
    expect(e?.id).toBe("verge_proof_line_held");
  });
});
