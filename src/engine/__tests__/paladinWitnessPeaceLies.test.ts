import { describe, expect, it } from "vitest";
import { evaluateStorySurfacing } from "../storyGateEvaluation";
import { applyResolvedEndingToProfile } from "../profileOutcomes";
import { getStoryById, storyRegistry } from "../../stories";
import { emptyProfile } from "./fixtures";
import type { EndingDefinition } from "../types";

function paladinEnding(id: string): EndingDefinition {
  const story = getStoryById("paladin_promise");
  const e = story?.endings.find((x) => x.id === id);
  if (!e) throw new Error(`missing ending ${id}`);
  return e;
}

describe("Paladin witness peace-by-lies (tarnished_oath aftermath)", () => {
  const witness = getStoryById("paladin_witness_peace_lies")!;

  it("surfaces as rumor before gates clear, without main list or play", () => {
    const surf = evaluateStorySurfacing(witness, emptyProfile(), {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(false);
    expect(surf.isListed).toBe(false);
    expect(surf.state).toBe("rumor");
    expect(surf.appearsInBrowse).toBe(true);
    expect(surf.playerFacing.rumorText?.trim()).toBeTruthy();
  });

  it("is startable after tarnished_oath with peace_by_lies and compromise mark", () => {
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("tarnished_oath"),
    );
    expect(p.worldlineBranches?.paladin_aftermath).toBe("peace_by_lies");
    expect(p.completedEndings.paladin_promise).toContain("tarnished_oath");
    expect(p.worldConsequenceMarks).toContain("paladin_compromised_by_lies");
    const surf = evaluateStorySurfacing(witness, p, {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(true);
    expect(surf.state).toBe("startable");
    expect(surf.isListed).toBe(true);
  });

  it("incompatible Paladin outcomes: rumor may appear but never startable", () => {
    for (const endingId of [
      "dark_mirror_doctrine",
      "shield_of_the_weak",
      "faithful_blade",
      "fracture_bleak_stern",
      "fracture_bleak_mercy",
      "broken_saint",
    ] as const) {
      const p = applyResolvedEndingToProfile(
        emptyProfile(),
        "paladin_promise",
        paladinEnding(endingId),
      );
      const surf = evaluateStorySurfacing(witness, p, {
        allStories: storyRegistry,
      });
      expect(surf.isStartable).toBe(false);
      expect(surf.isListed).toBe(false);
      expect(surf.state).toBe("rumor");
    }
  });

  it("blocks discovery when ending matches but worldline was overwritten (rumor only)", () => {
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("tarnished_oath"),
    );
    const diverged = {
      ...p,
      worldlineBranches: { paladin_aftermath: "order_sanctioned" },
    };
    const surf = evaluateStorySurfacing(witness, diverged, {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(false);
    expect(surf.state).toBe("rumor");
  });

  it("blocks discovery when mark is missing despite tarnished in history (rumor only)", () => {
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("tarnished_oath"),
    );
    const stripped = {
      ...p,
      worldConsequenceMarks: (p.worldConsequenceMarks ?? []).filter(
        (m) => m !== "paladin_compromised_by_lies",
      ),
    };
    const surf = evaluateStorySurfacing(witness, stripped, {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(false);
    expect(surf.state).toBe("rumor");
    expect(surf.blockedReasons.some((r) => r.code === "missing_world_consequence_mark")).toBe(
      true,
    );
  });
});
