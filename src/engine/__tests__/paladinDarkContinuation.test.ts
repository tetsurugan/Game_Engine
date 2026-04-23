import { describe, expect, it } from "vitest";
import { evaluateStorySurfacing } from "../storyGateEvaluation";
import { applyResolvedEndingToProfile } from "../profileOutcomes";
import { resolveEnding } from "../endingResolver";
import { getStoryById, storyRegistry } from "../../stories";
import { emptyProfile, minimalRuntime } from "./fixtures";
import type { EndingDefinition } from "../types";

function paladinEnding(id: string): EndingDefinition {
  const story = getStoryById("paladin_promise");
  const e = story?.endings.find((x) => x.id === id);
  if (!e) throw new Error(`missing ending ${id}`);
  return e;
}

const kneelBase = {
  storyId: "paladin_promise",
  currentSceneId: "breaking_point",
  flags: {
    prayed_aloud: true,
    paladin_dark_doctrine_ruin: true,
  },
  vowStates: {
    obey_order: "broken",
    speak_no_lie: "broken",
    protect_innocent: "strained",
  },
  variables: { divine_favor: 0, village_trust: 0, order_loyalty: 8 },
} as const;

describe("Paladin dark continuation proof", () => {
  it("qualifying stern path resolves dark_mirror_doctrine", () => {
    const story = getStoryById("paladin_promise")!;
    const state = minimalRuntime({
      ...kneelBase,
      personalityId: "stern_devout",
    });
    expect(resolveEnding(story, state)?.id).toBe("dark_mirror_doctrine");
  });

  it("non-qualifying stern kneel resolves fracture_bleak_stern", () => {
    const story = getStoryById("paladin_promise")!;
    const state = minimalRuntime({
      ...kneelBase,
      personalityId: "stern_devout",
      variables: { divine_favor: 0, village_trust: 0, order_loyalty: 4 },
    });
    expect(resolveEnding(story, state)?.id).toBe("fracture_bleak_stern");
  });

  it("qualifying compassionate path resolves dark_mirror_mercy", () => {
    const story = getStoryById("paladin_promise")!;
    const state = minimalRuntime({
      storyId: "paladin_promise",
      currentSceneId: "breaking_point",
      personalityId: "compassionate_convert",
      flags: {
        prayed_aloud: true,
        paladin_dark_mercy_ruin: true,
      },
      vowStates: {
        obey_order: "broken",
        speak_no_lie: "broken",
        protect_innocent: "strained",
      },
      variables: { divine_favor: 0, village_trust: 5, order_loyalty: 0 },
    });
    expect(resolveEnding(story, state)?.id).toBe("dark_mirror_mercy");
  });

  it("non-qualifying compassionate kneel resolves fracture_bleak_mercy", () => {
    const story = getStoryById("paladin_promise")!;
    const state = minimalRuntime({
      storyId: "paladin_promise",
      currentSceneId: "breaking_point",
      personalityId: "compassionate_convert",
      flags: {
        prayed_aloud: true,
        paladin_dark_mercy_ruin: true,
      },
      vowStates: {
        obey_order: "broken",
        speak_no_lie: "broken",
        protect_innocent: "strained",
      },
      variables: { divine_favor: 0, village_trust: 2, order_loyalty: 0 },
    });
    expect(resolveEnding(story, state)?.id).toBe("fracture_bleak_mercy");
  });

  it("dark ascension profile unlocks secret continuation as startable", () => {
    const secret = getStoryById("paladin_what_walks_after_oath")!;
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("dark_mirror_doctrine"),
    );
    expect(p.worldlineBranches?.paladin_aftermath).toBe("dark_mirror_walks");
    expect(p.unlockedModuleIds).toContain("unlock_paladin_what_walks_after_oath");
    expect(p.worldConsequenceMarks).toContain("paladin_dark_continuity_earned");
    const surf = evaluateStorySurfacing(secret, p, {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(true);
    expect(surf.state).toBe("startable");
    expect(surf.playerFacing.secretHint).toBeTruthy();
  });

  it("fracture-without-ascension does not unlock secret continuation but writes marks", () => {
    const secret = getStoryById("paladin_what_walks_after_oath")!;
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("fracture_bleak_stern"),
    );
    expect(p.worldlineBranches?.paladin_aftermath).toBe("oath_fracture");
    expect(p.unlockedModuleIds ?? []).not.toContain(
      "unlock_paladin_what_walks_after_oath",
    );
    expect(p.worldConsequenceMarks).toContain("paladin_fracture_without_ascension");
    expect(
      evaluateStorySurfacing(secret, p, { allStories: storyRegistry })
        .isStartable,
    ).toBe(false);
  });

  it("tarnished path writes compromise mark and does not unlock dark continuation", () => {
    const secret = getStoryById("paladin_what_walks_after_oath")!;
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("tarnished_oath"),
    );
    expect(p.worldConsequenceMarks).toContain("paladin_compromised_by_lies");
    expect(p.worldlineBranches?.paladin_aftermath).toBe("peace_by_lies");
    expect(
      evaluateStorySurfacing(secret, p, { allStories: storyRegistry })
        .isStartable,
    ).toBe(false);
  });

  it("empty profile keeps secret continuation hidden (no browse presence)", () => {
    const secret = getStoryById("paladin_what_walks_after_oath")!;
    const surf = evaluateStorySurfacing(secret, emptyProfile(), {
      allStories: storyRegistry,
    });
    expect(surf.state).toBe("hidden");
    expect(surf.isListed).toBe(false);
    expect(surf.appearsInBrowse).toBe(false);
  });

  it("partial gate (unlock only) does not start secret continuation", () => {
    const secret = getStoryById("paladin_what_walks_after_oath")!;
    const p: ReturnType<typeof emptyProfile> = {
      ...emptyProfile(),
      unlockedModuleIds: ["unlock_paladin_what_walks_after_oath"],
      worldlineBranches: { paladin_aftermath: "oath_fracture" },
    };
    const surf = evaluateStorySurfacing(secret, p, {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(false);
  });
});
