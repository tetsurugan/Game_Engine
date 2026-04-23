import { describe, expect, it } from "vitest";
import {
  applyResolvedEndingToProfile,
  mergeWorldFlagWrites,
} from "../profileOutcomes";
import type { EndingDefinition, PersistedProfile } from "../types";
import { emptyProfile } from "./fixtures";

function baseEnding(overrides: Partial<EndingDefinition> = {}): EndingDefinition {
  return {
    id: "end_one",
    title: "One",
    body: [],
    conditions: [],
    ...overrides,
  };
}

describe("mergeWorldFlagWrites", () => {
  it("merges flags and leaves other profile fields intact", () => {
    const profile = emptyProfile();
    profile.globalEchoes = ["e"];
    const next = mergeWorldFlagWrites(profile, [
      { target: "region.peace", value: true },
    ]);
    expect(next.worldFlags).toEqual({ "region.peace": true });
    expect(next.globalEchoes).toEqual(["e"]);
  });

  it("returns the same reference when writes array is empty", () => {
    const profile = emptyProfile();
    expect(mergeWorldFlagWrites(profile, [])).toBe(profile);
  });

  it("later writes override the same key", () => {
    const profile = emptyProfile();
    const next = mergeWorldFlagWrites(profile, [
      { target: "same", value: true },
      { target: "same", value: false },
    ]);
    expect(next.worldFlags).toEqual({ same: false });
  });
});

describe("applyResolvedEndingToProfile", () => {
  it("appends echoes and completed ending once", () => {
    const profile = emptyProfile();
    const ending = baseEnding({ echoes: ["echo_a", "echo_b"] });
    const next = applyResolvedEndingToProfile(profile, "story_z", ending);
    expect(next.globalEchoes).toEqual(["echo_a", "echo_b"]);
    expect(next.completedEndings).toEqual({ story_z: ["end_one"] });
  });

  it("does not duplicate echoes or ending ids on repeat apply", () => {
    let profile: PersistedProfile = emptyProfile();
    const ending = baseEnding({ echoes: ["echo_a"] });
    profile = applyResolvedEndingToProfile(profile, "story_z", ending);
    profile = applyResolvedEndingToProfile(profile, "story_z", ending);
    expect(profile.globalEchoes).toEqual(["echo_a"]);
    expect(profile.completedEndings.story_z).toEqual(["end_one"]);
  });

  it("merges ending worldFlags into profile", () => {
    const profile = emptyProfile();
    profile.worldFlags = { old: true };
    const ending = baseEnding({
      worldFlags: { old: false, new_flag: true },
    });
    const next = applyResolvedEndingToProfile(profile, "s", ending);
    expect(next.worldFlags).toEqual({ old: false, new_flag: true });
  });

  it("appends unlock ids without duplicates", () => {
    const profile = emptyProfile();
    profile.unlockedModuleIds = ["already"];
    const ending = baseEnding({ unlocks: ["already", "next_mod"] });
    const next = applyResolvedEndingToProfile(profile, "s", ending);
    expect(next.unlockedModuleIds).toEqual(["already", "next_mod"]);
  });
});
