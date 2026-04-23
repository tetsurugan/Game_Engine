import { describe, expect, it } from "vitest";
import {
  evaluateFollowUpsForAnchor,
  filterFollowUpsListed,
  getFollowUpsForAnchor,
  indexContinuationsByAnchor,
  summarizeVariantGroup,
} from "../continuationRouting";
import { evaluateStorySurfacing } from "../storyGateEvaluation";
import { emptyProfile, minimalStory } from "./fixtures";
import type { StoryDefinition } from "../types";

function anchorAndFollowUps(): StoryDefinition[] {
  const anchor = minimalStory({
    id: "anchor_tale",
    title: "Anchor Tale",
    playerTitle: "The Anchor",
  });
  const sequelOpen = minimalStory({
    id: "sequel_open",
    title: "Sequel Open",
    continuationOf: { storyId: "anchor_tale" },
    variantGroup: "paladin_fork",
    variantId: "light",
  });
  const sequelGated = minimalStory({
    id: "sequel_gated",
    title: "Sequel Gated",
    continuationOf: { storyId: "anchor_tale" },
    requiresEndings: [{ storyId: "anchor_tale", endingId: "end_rare" }],
    variantGroup: "paladin_fork",
    variantId: "dark",
    preDiscoverySurfacing: "rumor",
    rumorText: "A darker oath is spoken where you cannot go yet.",
  });
  return [anchor, sequelOpen, sequelGated];
}

describe("continuationRouting", () => {
  it("indexes continuations by anchor id", () => {
    const stories = anchorAndFollowUps();
    const idx = indexContinuationsByAnchor(stories);
    expect(idx.get("anchor_tale")?.map((s) => s.id).sort()).toEqual([
      "sequel_gated",
      "sequel_open",
    ]);
  });

  it("lists follow-ups for anchor", () => {
    const stories = anchorAndFollowUps();
    expect(getFollowUpsForAnchor("anchor_tale", stories).map((s) => s.id)).toEqual(
      ["sequel_open", "sequel_gated"],
    );
  });

  it("returns no follow-ups for unknown anchor", () => {
    const stories = anchorAndFollowUps();
    expect(getFollowUpsForAnchor("missing", stories)).toEqual([]);
    expect(evaluateFollowUpsForAnchor("missing", stories, emptyProfile())).toEqual(
      [],
    );
  });

  it("evaluates follow-ups with surfacing: open vs hidden vs rumor", () => {
    const stories = anchorAndFollowUps();
    const profile = emptyProfile();
    const rows = evaluateFollowUpsForAnchor("anchor_tale", stories, profile);
    const byId = Object.fromEntries(rows.map((r) => [r.story.id, r.surfacing]));

    expect(byId.sequel_open.isStartable).toBe(true);
    expect(byId.sequel_open.state).toBe("startable");

    expect(byId.sequel_gated.isStartable).toBe(false);
    expect(byId.sequel_gated.state).toBe("rumor");
    expect(byId.sequel_gated.appearsInBrowse).toBe(true);
  });

  it("variant group summary lists startable vs gated members", () => {
    const stories = anchorAndFollowUps();
    const summary = summarizeVariantGroup("paladin_fork", stories, emptyProfile());
    expect(summary.members).toHaveLength(2);
    expect(summary.startableStoryIds).toEqual(["sequel_open"]);
    expect(summary.listedStoryIds.sort()).toEqual(["sequel_open"]);
    expect(summary.visibleStoryIds.sort()).toEqual(["sequel_gated", "sequel_open"]);
  });

  it("filterFollowUpsListed excludes rumor-only rows", () => {
    const stories = anchorAndFollowUps();
    const rows = evaluateFollowUpsForAnchor("anchor_tale", stories, emptyProfile());
    const listed = filterFollowUpsListed(rows);
    expect(listed.map((r) => r.story.id)).toEqual(["sequel_open"]);
  });

  it("continuation hint appears when allStories passed to surfacing", () => {
    const stories = anchorAndFollowUps();
    const sequel = stories.find((s) => s.id === "sequel_open")!;
    const r = evaluateStorySurfacing(sequel, emptyProfile(), {
      allStories: stories,
    });
    expect(r.playerFacing.continuationHint).toBe('Continues from “The Anchor”');
  });

  it("respects playerContinuationHint override", () => {
    const stories = anchorAndFollowUps();
    const sequel: StoryDefinition = {
      ...stories.find((s) => s.id === "sequel_open")!,
      playerContinuationHint: "After the vow broke.",
    };
    const r = evaluateStorySurfacing(sequel, emptyProfile(), {
      allStories: stories,
    });
    expect(r.playerFacing.continuationHint).toBe("After the vow broke.");
  });

  it("omits continuation hint when registry not passed", () => {
    const stories = anchorAndFollowUps();
    const sequel = stories.find((s) => s.id === "sequel_open")!;
    const r = evaluateStorySurfacing(sequel, emptyProfile());
    expect(r.playerFacing.continuationHint).toBeUndefined();
  });
});
