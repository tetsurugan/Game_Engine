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

describe("Paladin witness broken saint (oath_fracture catch-all)", () => {
  const witness = getStoryById("paladin_witness_broken_saint")!;

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

  it("is startable after broken_saint with oath_fracture and catchall mark", () => {
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("broken_saint"),
    );
    expect(p.worldlineBranches?.paladin_aftermath).toBe("oath_fracture");
    expect(p.completedEndings.paladin_promise).toContain("broken_saint");
    expect(p.worldConsequenceMarks).toContain("paladin_fracture_catchall");
    const surf = evaluateStorySurfacing(witness, p, {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(true);
    expect(surf.state).toBe("startable");
    expect(surf.isListed).toBe(true);
  });

  it("fracture_bleak_* shares oath_fracture but wrong mark: rumor only, not startable", () => {
    for (const endingId of ["fracture_bleak_stern", "fracture_bleak_mercy"] as const) {
      const p = applyResolvedEndingToProfile(
        emptyProfile(),
        "paladin_promise",
        paladinEnding(endingId),
      );
      expect(p.worldlineBranches?.paladin_aftermath).toBe("oath_fracture");
      expect(p.worldConsequenceMarks).toContain("paladin_fracture_without_ascension");
      expect(p.worldConsequenceMarks).not.toContain("paladin_fracture_catchall");
      const surf = evaluateStorySurfacing(witness, p, {
        allStories: storyRegistry,
      });
      expect(surf.isStartable).toBe(false);
      expect(surf.state).toBe("rumor");
    }
  });

  it("incompatible Paladin outcomes: rumor may appear but never startable", () => {
    for (const endingId of [
      "tarnished_oath",
      "faithful_blade",
      "dark_mirror_doctrine",
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

  it("blocks when catchall mark stripped despite broken_saint ending recorded", () => {
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("broken_saint"),
    );
    const stripped = {
      ...p,
      worldConsequenceMarks: (p.worldConsequenceMarks ?? []).filter(
        (m) => m !== "paladin_fracture_catchall",
      ),
    };
    const surf = evaluateStorySurfacing(witness, stripped, {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(false);
    expect(surf.state).toBe("rumor");
    expect(
      surf.blockedReasons.some((r) => r.code === "missing_world_consequence_mark"),
    ).toBe(true);
  });
});
