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

describe("Paladin proof aftermath (worldline mutex)", () => {
  it("order proof is startable only on order_sanctioned worldline + faithful_blade", () => {
    const orderStory = getStoryById("paladin_proof_order_echo")!;
    const p0 = emptyProfile();
    expect(
      evaluateStorySurfacing(orderStory, p0, { allStories: storyRegistry })
        .isStartable,
    ).toBe(false);

    const p = applyResolvedEndingToProfile(
      p0,
      "paladin_promise",
      paladinEnding("faithful_blade"),
    );
    expect(p.worldlineBranches?.paladin_aftermath).toBe("order_sanctioned");
    const surf = evaluateStorySurfacing(orderStory, p, {
      allStories: storyRegistry,
    });
    expect(surf.isStartable).toBe(true);
  });

  it("mercy proof is startable only on mercy_remembered + shield ending", () => {
    const mercyStory = getStoryById("paladin_proof_mercy_echo")!;
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("shield_of_the_weak"),
    );
    expect(p.worldlineBranches?.paladin_aftermath).toBe("mercy_remembered");
    expect(
      evaluateStorySurfacing(mercyStory, p, { allStories: storyRegistry })
        .isStartable,
    ).toBe(true);
  });

  it("cross-branch: order worldline blocks mercy proof", () => {
    const mercyStory = getStoryById("paladin_proof_mercy_echo")!;
    const p = applyResolvedEndingToProfile(
      emptyProfile(),
      "paladin_promise",
      paladinEnding("faithful_blade"),
    );
    expect(
      evaluateStorySurfacing(mercyStory, p, { allStories: storyRegistry })
        .isStartable,
    ).toBe(false);
  });

  it("lie and fracture endings do not surface either proof", () => {
    const orderStory = getStoryById("paladin_proof_order_echo")!;
    const mercyStory = getStoryById("paladin_proof_mercy_echo")!;
    for (const endingId of [
      "tarnished_oath",
      "broken_saint",
      "fracture_bleak_stern",
      "fracture_bleak_mercy",
      "dark_mirror_doctrine",
      "dark_mirror_mercy",
    ] as const) {
      const p = applyResolvedEndingToProfile(
        emptyProfile(),
        "paladin_promise",
        paladinEnding(endingId),
      );
      expect(
        evaluateStorySurfacing(orderStory, p, { allStories: storyRegistry })
          .isStartable,
      ).toBe(false);
      expect(
        evaluateStorySurfacing(mercyStory, p, { allStories: storyRegistry })
          .isStartable,
      ).toBe(false);
    }
  });
});
