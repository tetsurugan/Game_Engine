import { describe, expect, it } from "vitest";
import { validateStoryRegistryAuthoring } from "../authoringValidation";
import { storyRegistry } from "../../stories";
import { emptyProfile, minimalStory } from "./fixtures";

describe("validateStoryRegistryAuthoring", () => {
  it("registry snapshot has no errors", () => {
    const r = validateStoryRegistryAuthoring(storyRegistry);
    expect(r.errorCount).toBe(0);
  });

  it("flags dangling continuation anchor", () => {
    const anchor = minimalStory({ id: "anchor_ok" });
    const bad = minimalStory({
      id: "orphan",
      continuationOf: { storyId: "missing_anchor" },
    });
    const r = validateStoryRegistryAuthoring([anchor, bad]);
    expect(r.errorCount).toBeGreaterThanOrEqual(1);
    expect(r.issues.some((i) => i.code === "continuation_dangling_anchor")).toBe(
      true,
    );
  });

  it("flags continuation self-reference", () => {
    const s = minimalStory({
      id: "self",
      continuationOf: { storyId: "self" },
    });
    const r = validateStoryRegistryAuthoring([s]);
    expect(r.issues.some((i) => i.code === "continuation_self_reference")).toBe(
      true,
    );
  });

  it("flags continuation cycle", () => {
    const a = minimalStory({ id: "a", continuationOf: { storyId: "b" } });
    const b = minimalStory({ id: "b", continuationOf: { storyId: "a" } });
    const r = validateStoryRegistryAuthoring([a, b]);
    expect(r.issues.some((i) => i.code === "continuation_cycle")).toBe(true);
  });

  it("flags duplicate story ids", () => {
    const a = minimalStory({ id: "dup" });
    const b = minimalStory({ id: "dup", title: "Other" });
    const r = validateStoryRegistryAuthoring([a, b]);
    expect(r.issues.some((i) => i.code === "duplicate_story_id")).toBe(true);
  });

  it("flags requiresEndings pointing at missing ending", () => {
    const anchor = minimalStory({ id: "anchor" });
    const bad = minimalStory({
      id: "needs",
      requiresEndings: [{ storyId: "anchor", endingId: "nope" }],
    });
    const r = validateStoryRegistryAuthoring([anchor, bad]);
    expect(r.issues.some((i) => i.code === "requires_ending_unknown_ending")).toBe(
      true,
    );
  });

  it("flags requires and excludes same worldline", () => {
    const s = minimalStory({
      id: "bad_wl",
      requiresWorldlineBranch: { groupId: "g", branchId: "x" },
      excludesWorldlineBranches: [{ groupId: "g", branchId: "x" }],
    });
    const r = validateStoryRegistryAuthoring([s]);
    expect(
      r.issues.some((i) => i.code === "worldline_requires_and_excludes_same_branch"),
    ).toBe(true);
  });

  it("warns when variant group has multiple baseline-startable members", () => {
    const openA = minimalStory({
      id: "va",
      variantGroup: "fork",
      variantId: "a",
      unlockCategory: "open",
    });
    const openB = minimalStory({
      id: "vb",
      variantGroup: "fork",
      variantId: "b",
      unlockCategory: "open",
    });
    const r = validateStoryRegistryAuthoring([openA, openB]);
    expect(
      r.issues.some((i) => i.code === "variant_group_multiple_baseline_startable"),
    ).toBe(true);
  });

  it("warns rumor surfacing without rumorText", () => {
    const s = minimalStory({
      id: "r",
      preDiscoverySurfacing: "rumor",
    });
    const r = validateStoryRegistryAuthoring([s]);
    expect(r.issues.some((i) => i.code === "surfacing_rumor_without_copy")).toBe(
      true,
    );
  });

  it("respects custom baseline profile for variant check", () => {
    const gated = minimalStory({
      id: "g1",
      variantGroup: "g",
      variantId: "1",
      requiresEchoes: ["e"],
    });
    const gated2 = minimalStory({
      id: "g2",
      variantGroup: "g",
      variantId: "2",
      requiresEchoes: ["e"],
    });
    const p = emptyProfile();
    p.globalEchoes = ["e"];
    const r = validateStoryRegistryAuthoring([gated, gated2], {
      baselineProfile: p,
    });
    expect(
      r.issues.some((i) => i.code === "variant_group_multiple_baseline_startable"),
    ).toBe(true);
  });
});
