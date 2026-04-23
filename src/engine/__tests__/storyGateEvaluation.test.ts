import { describe, expect, it } from "vitest";
import {
  evaluateStorySurfacing,
} from "../storyGateEvaluation";
import { emptyProfile, minimalStory } from "./fixtures";

describe("evaluateStorySurfacing", () => {
  it("treats a wide-open story as startable on an empty profile", () => {
    const story = minimalStory({ unlockCategory: "open" });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(r.state).toBe("startable");
    expect(r.isStartable).toBe(true);
    expect(r.isListed).toBe(true);
    expect(r.appearsInBrowse).toBe(true);
    expect(r.blockedReasons).toEqual([]);
    expect(r.mutexConflicts).toEqual([]);
  });

  it("hides the story when excludesEchoes mutex fires", () => {
    const story = minimalStory({
      excludesEchoes: ["forbidden_echo"],
    });
    const profile = emptyProfile();
    profile.globalEchoes = ["forbidden_echo"];
    const r = evaluateStorySurfacing(story, profile);
    expect(r.state).toBe("hidden");
    expect(r.isStartable).toBe(false);
    expect(r.isListed).toBe(false);
    expect(r.appearsInBrowse).toBe(false);
    expect(r.mutexConflicts).toEqual([
      { code: "excluded_echo_mutex", echoId: "forbidden_echo" },
    ]);
  });

  it("hides when excludesFlags mutex fires", () => {
    const story = minimalStory({ excludesFlags: ["bad_world"] });
    const profile = emptyProfile();
    profile.worldFlags = { bad_world: true };
    const r = evaluateStorySurfacing(story, profile);
    expect(r.state).toBe("hidden");
    expect(r.mutexConflicts).toEqual([
      { code: "excluded_world_flag_mutex", flagId: "bad_world" },
    ]);
  });

  it("surfaces as rumor when discovery fails and rumor copy is authored", () => {
    const story = minimalStory({
      requiresEchoes: ["need_me"],
      preDiscoverySurfacing: "rumor",
      rumorText: "They say the gate still waits.",
    });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(r.state).toBe("rumor");
    expect(r.isStartable).toBe(false);
    expect(r.isListed).toBe(false);
    expect(r.appearsInBrowse).toBe(true);
    expect(r.blockedReasons.some((b) => b.code === "missing_echo")).toBe(true);
  });

  it("stays hidden when rumor mode is set but rumorText is empty", () => {
    const story = minimalStory({
      requiresEchoes: ["x"],
      preDiscoverySurfacing: "rumor",
      rumorText: "   ",
    });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(r.state).toBe("hidden");
    expect(r.appearsInBrowse).toBe(false);
  });

  it("surfaces as teaser when discovery fails and teaser copy exists", () => {
    const story = minimalStory({
      requiresFlags: ["flag_needed"],
      preDiscoverySurfacing: "teaser",
      teaserTitle: "Soon",
      teaserSummary: "A thread you cannot pull yet.",
    });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(r.state).toBe("teaser");
    expect(r.appearsInBrowse).toBe(true);
    expect(
      r.blockedReasons.some((b) => b.code === "missing_world_flag"),
    ).toBe(true);
  });

  it("lists as locked when discovery passes but lockedUntilEchoes blocks start", () => {
    const story = minimalStory({
      lockedUntilEchoes: ["later_echo"],
      listPresentationStyle: "standard",
    });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(r.state).toBe("listed_locked");
    expect(r.isListed).toBe(true);
    expect(r.isStartable).toBe(false);
    expect(r.blockedReasons).toEqual([
      { code: "locked_until_echo", echoId: "later_echo" },
    ]);
  });

  it("lists as secret when lock applies and presentation is secret", () => {
    const story = minimalStory({
      lockedUntilEchoes: ["later_echo"],
      listPresentationStyle: "secret",
      secretListHint: "Classified shelf row",
    });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(r.state).toBe("listed_secret");
    expect(r.isListed).toBe(true);
    expect(r.isStartable).toBe(false);
    expect(r.playerFacing.secretHint).toBe("Classified shelf row");
  });

  it("blocks discovery for missing requiresEchoes", () => {
    const story = minimalStory({ requiresEchoes: ["a", "b"] });
    const profile = emptyProfile();
    profile.globalEchoes = ["a"];
    const r = evaluateStorySurfacing(story, profile);
    expect(r.isStartable).toBe(false);
    expect(
      r.blockedReasons.filter((b) => b.code === "missing_echo"),
    ).toHaveLength(1);
  });

  it("blocks discovery for missing requiresFlags (missing counts as false)", () => {
    const story = minimalStory({ requiresFlags: ["gate_flag"] });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(r.blockedReasons.some((b) => b.code === "missing_world_flag")).toBe(
      true,
    );
  });

  it("blocks discovery when requiresAnyFlags: none of the OR flags are true", () => {
    const story = minimalStory({
      requiresAnyFlags: ["path_a", "path_b"],
    });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(
      r.blockedReasons.some(
        (b) =>
          b.code === "missing_any_profile_or" &&
          b.flagIds.includes("path_a") &&
          b.flagIds.includes("path_b") &&
          b.markIds.length === 0,
      ),
    ).toBe(true);
  });

  it("allows discovery when requiresAnyFlags: at least one flag is true", () => {
    const story = minimalStory({ requiresAnyFlags: ["path_a", "path_b"] });
    const profile = emptyProfile();
    profile.worldFlags = { path_b: true };
    const r = evaluateStorySurfacing(story, profile);
    expect(
      r.blockedReasons.some((b) => b.code === "missing_any_profile_or"),
    ).toBe(false);
    expect(r.state).toBe("startable");
  });

  it("allows discovery when requiresAnyWorldConsequenceMarks satisfies OR group", () => {
    const story = minimalStory({
      requiresAnyFlags: ["path_a"],
      requiresAnyWorldConsequenceMarks: ["seed_x"],
    });
    const profile = emptyProfile();
    profile.worldConsequenceMarks = ["seed_x"];
    const r = evaluateStorySurfacing(story, profile);
    expect(r.isStartable).toBe(true);
  });

  it("blocks discovery for missing requiresEndings", () => {
    const story = minimalStory({
      requiresEndings: [{ storyId: "prior", endingId: "e_done" }],
    });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(
      r.blockedReasons.some(
        (b) =>
          b.code === "missing_ending" &&
          b.storyId === "prior" &&
          b.endingId === "e_done",
      ),
    ).toBe(true);
  });

  it("allows start when requiresEndings are satisfied", () => {
    const story = minimalStory({
      requiresEndings: [{ storyId: "prior", endingId: "e_done" }],
    });
    const profile = emptyProfile();
    profile.completedEndings = { prior: ["e_done", "other"] };
    const r = evaluateStorySurfacing(story, profile);
    expect(r.state).toBe("startable");
    expect(r.isStartable).toBe(true);
  });

  it("blocks discovery for missing requiresUnlockedModuleIds", () => {
    const story = minimalStory({
      requiresUnlockedModuleIds: ["module_alpha"],
    });
    const r = evaluateStorySurfacing(story, emptyProfile());
    expect(
      r.blockedReasons.some(
        (b) =>
          b.code === "missing_unlocked_module" &&
          b.moduleId === "module_alpha",
      ),
    ).toBe(true);
  });

  it("allows start when requiresUnlockedModuleIds are present", () => {
    const story = minimalStory({
      requiresUnlockedModuleIds: ["module_alpha"],
    });
    const profile = emptyProfile();
    profile.unlockedModuleIds = ["module_alpha", "other"];
    const r = evaluateStorySurfacing(story, profile);
    expect(r.isStartable).toBe(true);
  });
});
