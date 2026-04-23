import { describe, expect, it } from "vitest";
import { evaluateStorySurfacing } from "../storyGateEvaluation";
import { applyResolvedEndingToProfile } from "../profileOutcomes";
import { getStoryById, storyRegistry } from "../../stories";
import { emptyProfile } from "./fixtures";
import type { EndingDefinition } from "../types";

function gyreEnding(id: string): EndingDefinition {
  const story = getStoryById("gyre_mythic_anchor");
  const e = story?.endings.find((x) => x.id === id);
  if (!e) throw new Error(`missing ending ${id}`);
  return e;
}

describe("Gyre witness survivor aftermath (Survivor-family slice)", () => {
  const witness = getStoryById("gyre_witness_survivor_aftermath")!;

  it("surfaces as rumor before gyre anchor mark, not listable or startable", () => {
    const surf = evaluateStorySurfacing(witness, emptyProfile(), {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(false);
    expect(surf.isListed).toBe(false);
    expect(surf.state).toBe("rumor");
    expect(surf.appearsInBrowse).toBe(true);
    expect(surf.playerFacing.rumorText?.trim()).toBeTruthy();
  });

  it("is not startable with only Paladin history (no gyre mark)", () => {
    const paladin = getStoryById("paladin_promise")!;
    const faithful = paladin.endings.find((e) => e.id === "faithful_blade")!;
    const p = applyResolvedEndingToProfile(emptyProfile(), "paladin_promise", faithful);
    const surf = evaluateStorySurfacing(witness, p, { allStories: storyRegistry });
    expect(surf.isStartable).toBe(false);
    expect(surf.state).toBe("rumor");
  });

  it("is not startable when gyre echo exists but anchor mark is missing", () => {
    const p = {
      ...emptyProfile(),
      globalEchoes: ["gyre_echo_truth_mercy"],
      completedEndings: { gyre_mythic_anchor: ["gyre_loop_truth_mercy"] },
    };
    const surf = evaluateStorySurfacing(witness, p, { allStories: storyRegistry });
    expect(surf.isStartable).toBe(false);
    expect(surf.blockedReasons.some((r) => r.code === "missing_world_consequence_mark")).toBe(
      true,
    );
    expect(surf.state).toBe("rumor");
  });

  it("is startable after any gyre mythic anchor ending (mark on profile)", () => {
    for (const endingId of [
      "gyre_loop_truth_mercy",
      "gyre_loop_truth_razor",
      "gyre_loop_blind_grace",
      "gyre_loop_blind_bitter",
    ] as const) {
      const p = applyResolvedEndingToProfile(
        emptyProfile(),
        "gyre_mythic_anchor",
        gyreEnding(endingId),
      );
      expect(p.worldConsequenceMarks).toContain("gyre_mythic_anchor_touched");
      const surf = evaluateStorySurfacing(witness, p, {
        allStories: storyRegistry,
      });
      expect(surf.isStartable).toBe(true);
      expect(surf.state).toBe("startable");
      expect(surf.isListed).toBe(true);
    }
  });
});
