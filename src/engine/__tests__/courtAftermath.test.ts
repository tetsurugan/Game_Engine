import { describe, expect, it } from "vitest";
import { evaluateStorySurfacing } from "../storyGateEvaluation";
import { resolveEnding } from "../endingResolver";
import { applyResolvedEndingToProfile } from "../profileOutcomes";
import { createInitialRuntime } from "../storyEngine";
import { resolveChoice } from "../choiceResolver";
import { getStoryById, storyRegistry } from "../../stories";
import { emptyProfile } from "./fixtures";
import type { StoryRuntimeState } from "../types";

function rumorRuntimeClose(
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

describe("court_aftermath (Rumor Girl record / witness proof)", () => {
  const court = getStoryById("court_aftermath")!;

  it("surfaces as rumor before gates pass; not startable on empty profile", () => {
    const surf = evaluateStorySurfacing(court, emptyProfile(), {
      allStories: storyRegistry,
    });
    expect(surf.state).toBe("rumor");
    expect(surf.isStartable).toBe(false);
    expect(surf.isListed).toBe(false);
    expect(surf.appearsInBrowse).toBe(true);
  });

  it("not startable with rumor_girl mark only — requires witness OR belief_gap flag", () => {
    const rumor = getStoryById("rumor_girl")!;
    const denial = rumor.endings.find((e) => e.id === "rumor_ending_denial")!;
    const p = applyResolvedEndingToProfile(emptyProfile(), "rumor_girl", denial);
    expect(p.worldConsequenceMarks).toContain("rumor_girl_proof_resolved");
    expect(p.worldFlags?.rumor_girl_witness_aftermath_invited).toBeFalsy();
    expect(p.worldFlags?.rumor_girl_belief_gap_soft).toBeFalsy();
    const surf = evaluateStorySurfacing(court, p, { allStories: storyRegistry });
    expect(surf.isStartable).toBe(false);
    expect(
      surf.blockedReasons.some((b) => b.code === "missing_any_world_flag"),
    ).toBe(true);
  });

  it("startable after shock path (witness flag + court stack echo family)", () => {
    const state = rumorRuntimeClose({
      personalityId: "rumor_orbit",
      variables: { suspicion: 7, humiliation: 5, resolution: "shock" },
      belief: {
        variables: {},
        flags: { refused_healthier_exit: true, she_hears_cruel_theater: true },
      },
    });
    const rumor = getStoryById("rumor_girl")!;
    const ending = resolveEnding(rumor, state)!;
    expect(ending.echoes).toContain("rumor_girl_court_seed_stack");
    const p = applyResolvedEndingToProfile(emptyProfile(), "rumor_girl", ending);
    const surf = evaluateStorySurfacing(court, p, { allStories: storyRegistry });
    expect(surf.isStartable).toBe(true);
    expect(surf.state).toBe("startable");
    expect(p.worldFlags?.rumor_girl_witness_aftermath_invited).toBe(true);
  });

  it("startable after grounded leave (belief_gap_soft, no witness flag)", () => {
    const state = rumorRuntimeClose({
      personalityId: "rumor_proof",
      variables: { suspicion: 5, humiliation: 4, resolution: "leave_confirmed" },
      belief: {
        variables: {},
        flags: { refused_healthier_exit: false, she_hears_cruel_theater: false },
      },
    });
    const rumor = getStoryById("rumor_girl")!;
    const ending = resolveEnding(rumor, state)!;
    expect(ending.worldFlags?.rumor_girl_belief_gap_soft).toBe(true);
    const p = applyResolvedEndingToProfile(emptyProfile(), "rumor_girl", ending);
    const surf = evaluateStorySurfacing(court, p, { allStories: storyRegistry });
    expect(surf.isStartable).toBe(true);
    expect(surf.state).toBe("startable");
  });

  it("resolveEnding: shock profile → shock-flavored court closing", () => {
    const rumor = getStoryById("rumor_girl")!;
    const shock = resolveEnding(
      rumor,
      rumorRuntimeClose({
        personalityId: "rumor_orbit",
        variables: { suspicion: 7, humiliation: 5, resolution: "shock" },
        belief: {
          variables: {},
          flags: { refused_healthier_exit: true, she_hears_cruel_theater: true },
        },
      }),
    )!;
    const p = applyResolvedEndingToProfile(emptyProfile(), "rumor_girl", shock);
    const rt = createInitialRuntime(court);
    const scene = court.scenes[0]!;
    const after = resolveChoice(court, rt, scene, scene.choices[0]!).nextState;
    const snap = {
      globalEchoes: p.globalEchoes,
      worldFlags: p.worldFlags ?? {},
      unlockedModuleIds: p.unlockedModuleIds ?? [],
      completedEndings: p.completedEndings,
      worldConsequenceMarks: p.worldConsequenceMarks ?? [],
    };
    const e = resolveEnding(court, after, snap);
    expect(e?.id).toBe("court_aftermath_close_shock_invited");
    expect(e?.echoes).toContain("rumor_girl_court_aftermath_logged");
  });

  it("resolveEnding: leave profile → soft-gap court closing", () => {
    const rumor = getStoryById("rumor_girl")!;
    const leave = resolveEnding(
      rumor,
      rumorRuntimeClose({
        personalityId: "rumor_proof",
        variables: { suspicion: 5, humiliation: 4, resolution: "leave_confirmed" },
        belief: {
          variables: {},
          flags: { refused_healthier_exit: false, she_hears_cruel_theater: false },
        },
      }),
    )!;
    const p = applyResolvedEndingToProfile(emptyProfile(), "rumor_girl", leave);
    const rt = createInitialRuntime(court);
    const scene = court.scenes[0]!;
    const after = resolveChoice(court, rt, scene, scene.choices[1]!).nextState;
    const snap = {
      globalEchoes: p.globalEchoes,
      worldFlags: p.worldFlags ?? {},
      unlockedModuleIds: p.unlockedModuleIds ?? [],
      completedEndings: p.completedEndings,
      worldConsequenceMarks: p.worldConsequenceMarks ?? [],
    };
    const e = resolveEnding(court, after, snap);
    expect(e?.id).toBe("court_aftermath_close_belief_gap");
    expect(e?.echoes).toContain("rumor_girl_court_aftermath_logged");
  });
});
