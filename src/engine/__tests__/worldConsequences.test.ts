import { describe, expect, it } from "vitest";
import { applyResolvedEndingToProfile } from "../profileOutcomes";
import { evaluateStorySurfacing } from "../storyGateEvaluation";
import {
  mergeCloseHistoryMarks,
  mergeEndingWorldConsequences,
  mergeWorldConsequenceMarks,
  mergeWorldlineCommit,
} from "../worldConsequences";
import { emptyProfile, minimalStory } from "./fixtures";
import type { EndingDefinition, StoryDefinition } from "../types";

const sampleEnding = (
  overrides: Partial<EndingDefinition> = {},
): EndingDefinition => ({
  id: "end_x",
  title: "End",
  body: [],
  conditions: [],
  ...overrides,
});

describe("worldConsequences merge", () => {
  it("commits worldline branch (last write per group)", () => {
    let p = emptyProfile();
    p = mergeWorldlineCommit(p, { groupId: "g", branchId: "a" });
    expect(p.worldlineBranches?.g).toBe("a");
    p = mergeWorldlineCommit(p, { groupId: "g", branchId: "b" });
    expect(p.worldlineBranches?.g).toBe("b");
  });

  it("dedupes worldConsequenceMarks", () => {
    let p = emptyProfile();
    p = mergeWorldConsequenceMarks(p, ["m1", "m1", "m2"]);
    expect(p.worldConsequenceMarks).toEqual(["m1", "m2"]);
  });

  it("dedupes closedHistoryMarks", () => {
    let p = emptyProfile();
    p = mergeCloseHistoryMarks(p, ["c1", "c1"]);
    expect(p.closedHistoryMarks).toEqual(["c1"]);
  });

  it("mergeEndingWorldConsequences applies all ending fields", () => {
    const p0 = emptyProfile();
    const next = mergeEndingWorldConsequences(
      p0,
      sampleEnding({
        worldlineCommit: { groupId: "arena", branchId: "banned" },
        worldConsequenceMarks: ["outcome_a"],
        closeHistoryMarks: ["route_pits"],
      }),
    );
    expect(next.worldlineBranches?.arena).toBe("banned");
    expect(next.worldConsequenceMarks).toContain("outcome_a");
    expect(next.closedHistoryMarks).toContain("route_pits");
  });

  it("applyResolvedEndingToProfile preserves then adds world consequences", () => {
    let p = emptyProfile();
    p = applyResolvedEndingToProfile(p, "s1", {
      ...sampleEnding({
        echoes: ["e1"],
        worldFlags: { flag_a: true },
        worldlineCommit: { groupId: "g", branchId: "one" },
        worldConsequenceMarks: ["mark1"],
        closeHistoryMarks: ["closed1"],
        unlocks: ["mod1"],
      }),
    });
    expect(p.globalEchoes).toContain("e1");
    expect(p.worldFlags?.flag_a).toBe(true);
    expect(p.worldlineBranches?.g).toBe("one");
    expect(p.worldConsequenceMarks).toContain("mark1");
    expect(p.closedHistoryMarks).toContain("closed1");
    expect(p.unlockedModuleIds).toContain("mod1");
  });
});

describe("worldConsequences + gates", () => {
  const gatedStory = (overrides: Partial<StoryDefinition> = {}): StoryDefinition =>
    minimalStory({
      id: "gated",
      requiresWorldlineBranch: { groupId: "wg", branchId: "holy" },
      requiresWorldConsequenceMarks: ["must_have"],
      ...overrides,
    });

  it("evaluateStorySurfacing fails discovery when worldline missing", () => {
    const story = gatedStory();
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(r.isStartable).toBe(false);
    expect(r.blockedReasons.some((b) => b.code === "missing_worldline_branch")).toBe(
      true,
    );
  });

  it("evaluateStorySurfacing passes when worldline and marks match", () => {
    const story = gatedStory();
    const profile = emptyProfile();
    profile.worldlineBranches = { wg: "holy" };
    profile.worldConsequenceMarks = ["must_have"];
    const r = evaluateStorySurfacing(story, profile);
    expect(r.isStartable).toBe(true);
  });

  it("mutex excludes when excludesWorldlineBranches matches profile", () => {
    const story = minimalStory({
      id: "x",
      excludesWorldlineBranches: [{ groupId: "wg", branchId: "dark" }],
    });
    const profile = emptyProfile();
    profile.worldlineBranches = { wg: "dark" };
    const r = evaluateStorySurfacing(story, profile);
    expect(r.state).toBe("hidden");
    expect(
      r.mutexConflicts.some((m) => m.code === "excluded_worldline_branch_mutex"),
    ).toBe(true);
  });

  it("blockedWhenHistoryClosed mutex when closure present", () => {
    const story = minimalStory({
      id: "y",
      blockedWhenHistoryClosed: ["sealed_path"],
    });
    const profile = emptyProfile();
    profile.closedHistoryMarks = ["sealed_path"];
    const r = evaluateStorySurfacing(story, profile);
    expect(r.mutexConflicts.some((m) => m.code === "excluded_closed_history_mutex")).toBe(
      true,
    );
  });

  it("excludesWorldConsequenceMarks mutex", () => {
    const story = minimalStory({
      id: "z",
      excludesWorldConsequenceMarks: ["forbidden"],
    });
    const profile = emptyProfile();
    profile.worldConsequenceMarks = ["forbidden", "ok"];
    const r = evaluateStorySurfacing(story, profile);
    expect(
      r.mutexConflicts.some(
        (m) => m.code === "excluded_world_consequence_mark_mutex",
      ),
    ).toBe(true);
  });
});
