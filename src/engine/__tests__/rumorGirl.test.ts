import { describe, expect, it } from "vitest";
import { evaluateStorySurfacing } from "../storyGateEvaluation";
import { resolveEnding } from "../endingResolver";
import { createInitialRuntime } from "../storyEngine";
import { getStoryById, storyRegistry } from "../../stories";
import { emptyProfile } from "./fixtures";
import type { StoryRuntimeState } from "../types";

function runtimeAtClose(
  overrides: Partial<StoryRuntimeState> & Pick<StoryRuntimeState, "personalityId">,
): StoryRuntimeState {
  const story = getStoryById("rumor_girl")!;
  const base = createInitialRuntime(story, overrides.personalityId);
  return {
    ...base,
    ...overrides,
    currentSceneId: null,
    history: ["rumor_crossfire", "rumor_before_talk", "rumor_the_talk"],
  };
}

describe("rumor_girl (modern obsession proof)", () => {
  const story = getStoryById("rumor_girl")!;

  it("is open and startable on empty profile", () => {
    const surf = evaluateStorySurfacing(story, emptyProfile(), {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(true);
    expect(surf.state).toBe("startable");
  });

  it("lists four personality stances", () => {
    expect(story.personalities?.map((p) => p.id)).toEqual([
      "rumor_lovefirst",
      "rumor_orbit",
      "rumor_proof",
      "rumor_anchor",
    ]);
  });

  it("resolveEnding: grounded leave → leave ending + soft court seed flag", () => {
    const state = runtimeAtClose({
      personalityId: "rumor_proof",
      variables: { suspicion: 5, humiliation: 4, resolution: "leave_confirmed" },
      belief: {
        variables: {},
        flags: { refused_healthier_exit: false, she_hears_cruel_theater: false },
      },
    });
    const e = resolveEnding(story, state);
    expect(e?.id).toBe("rumor_ending_leave");
    expect(e?.echoes).toContain("rumor_girl_left_with_truth");
    expect(e?.worldFlags?.rumor_girl_belief_gap_soft).toBe(true);
  });

  it("resolveEnding: shock path obsessive → yandere ending + court seed stack", () => {
    const state = runtimeAtClose({
      personalityId: "rumor_orbit",
      variables: { suspicion: 7, humiliation: 5, resolution: "shock" },
      belief: {
        variables: {},
        flags: { refused_healthier_exit: true, she_hears_cruel_theater: true },
      },
    });
    const e = resolveEnding(story, state);
    expect(e?.id).toBe("rumor_ending_shock_orbit");
    expect(e?.echoes).toContain("rumor_girl_shock_her_pov");
    expect(e?.echoes).toContain("rumor_girl_court_seed_stack");
    expect(e?.worldConsequenceMarks).toContain("rumor_girl_fatal_aftermath_seeded");
    expect(e?.worldFlags?.rumor_girl_witness_aftermath_invited).toBe(true);
  });

  it("resolveEnding: shock resolution + fearful dependent → anchor shock ending", () => {
    const state = runtimeAtClose({
      personalityId: "rumor_anchor",
      variables: { suspicion: 8, humiliation: 6, resolution: "shock" },
      belief: {
        variables: {},
        flags: { refused_healthier_exit: true, she_hears_cruel_theater: true },
      },
    });
    const e = resolveEnding(story, state);
    expect(e?.id).toBe("rumor_ending_shock_anchor");
  });

  it("hidden truth: partner cheated + accountable break + words not mockery", () => {
    const rt = createInitialRuntime(story, "rumor_lovefirst");
    expect(rt.hiddenTruth?.flags.partner_cheated_objective).toBe(true);
    expect(rt.hiddenTruth?.flags.partner_seeks_accountable_break).toBe(true);
    expect(rt.hiddenTruth?.flags.his_words_objectively_not_mockery).toBe(true);
  });
});
