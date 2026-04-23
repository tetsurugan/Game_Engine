import { describe, expect, it } from "vitest";
import { evaluateStorySurfacing } from "../storyGateEvaluation";
import { resolveEnding } from "../endingResolver";
import { createInitialRuntime } from "../storyEngine";
import { getStoryById, storyRegistry } from "../../stories";
import { emptyProfile } from "./fixtures";
import type { StoryRuntimeState } from "../types";

const personality = "gyre_devoted";

function atCusp(
  belief: { grasps_loop_truth: boolean; closure_heals: boolean },
): StoryRuntimeState {
  const story = getStoryById("gyre_mythic_anchor")!;
  const base = createInitialRuntime(story, personality);
  return {
    ...base,
    currentSceneId: "gyre_cusp",
    history: ["gyre_threshold", "gyre_parley", "gyre_tremor"],
    belief: {
      variables: {},
      flags: {
        grasps_loop_truth: belief.grasps_loop_truth,
        closure_heals: belief.closure_heals,
      },
    },
  };
}

describe("Gyre mythic anchor (loop-reveal proof)", () => {
  const story = getStoryById("gyre_mythic_anchor")!;

  it("is open and startable on empty profile", () => {
    const surf = evaluateStorySurfacing(story, emptyProfile(), {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(true);
    expect(surf.state).toBe("startable");
  });

  it("exposes four Gyre-stance personalities", () => {
    expect(story.personalities?.map((p) => p.id)).toEqual([
      "gyre_devoted",
      "gyre_yearning",
      "gyre_resentful",
      "gyre_numb",
    ]);
  });

  it("hidden spiral facts stay fixed regardless of belief branch", () => {
    const rt = createInitialRuntime(story, personality);
    expect(rt.hiddenTruth?.flags.spiral_stayed_was_prior_visitor).toBe(true);
    expect(rt.hiddenTruth?.flags.under_rage_thread_of_care).toBe(true);
    const blind = atCusp({ grasps_loop_truth: false, closure_heals: false });
    expect(blind.hiddenTruth?.flags.spiral_stayed_was_prior_visitor).toBe(true);
  });

  it("resolveEnding: truth + healing → mercy ending + echo", () => {
    const e = resolveEnding(story, atCusp({ grasps_loop_truth: true, closure_heals: true }));
    expect(e?.id).toBe("gyre_loop_truth_mercy");
    expect(e?.echoes).toContain("gyre_echo_truth_mercy");
  });

  it("resolveEnding: truth + harsh → razor ending", () => {
    const e = resolveEnding(story, atCusp({ grasps_loop_truth: true, closure_heals: false }));
    expect(e?.id).toBe("gyre_loop_truth_razor");
    expect(e?.echoes).toContain("gyre_echo_truth_break");
  });

  it("resolveEnding: blind + soft → grace ending", () => {
    const e = resolveEnding(story, atCusp({ grasps_loop_truth: false, closure_heals: true }));
    expect(e?.id).toBe("gyre_loop_blind_grace");
    expect(e?.echoes).toContain("gyre_echo_blind_grace");
  });

  it("resolveEnding: blind + bitter → bitter ending", () => {
    const e = resolveEnding(story, atCusp({ grasps_loop_truth: false, closure_heals: false }));
    expect(e?.id).toBe("gyre_loop_blind_bitter");
    expect(e?.echoes).toContain("gyre_echo_blind_wound");
  });
});
