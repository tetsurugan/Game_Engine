import { evaluateStorySurfacing } from "./storyGateEvaluation";
import type { PersistedProfile, StoryDefinition } from "./types";

/**
 * First-pass **authoring validation** for continuations, variant groups,
 * surfacing metadata, and world-consequence fields. Intended for authors and
 * tooling — not invoked automatically during play.
 */

export type AuthoringIssueSeverity = "error" | "warning";

export interface AuthoringIssue {
  severity: AuthoringIssueSeverity;
  /** Stable machine code for filters / CI. */
  code: string;
  message: string;
  /** Primary story id(s) involved. */
  storyIds?: string[];
}

export interface AuthoringValidationReport {
  issues: AuthoringIssue[];
  errorCount: number;
  warningCount: number;
}

export interface ValidateStoryRegistryOptions {
  /**
   * Profile used for “baseline” variant / mutex checks (default: empty echoes,
   * no flags, no worldlines). Override to simulate mid-anthology state.
   */
  baselineProfile?: PersistedProfile;
}

function defaultBaseline(): PersistedProfile {
  return {
    globalEchoes: [],
    completedEndings: {},
    worldFlags: {},
    unlockedModuleIds: [],
    worldlineBranches: {},
    worldConsequenceMarks: [],
    closedHistoryMarks: [],
    lastRuntime: null,
  };
}

function push(
  issues: AuthoringIssue[],
  severity: AuthoringIssueSeverity,
  code: string,
  message: string,
  storyIds?: string[],
) {
  issues.push({ severity, code, message, storyIds });
}

/** Fingerprint gate fields that usually differentiate sibling continuations. */
function gateFingerprint(story: StoryDefinition): string {
  const req = {
    echoes: [...(story.requiresEchoes ?? [])].sort(),
    endings: [...(story.requiresEndings ?? [])]
      .map((e) => `${e.storyId}:${e.endingId}`)
      .sort(),
    flags: [...(story.requiresFlags ?? [])].sort(),
    anyFlags: [...(story.requiresAnyFlags ?? [])].sort(),
    anyMarks: [...(story.requiresAnyWorldConsequenceMarks ?? [])].sort(),
    mods: [...(story.requiresUnlockedModuleIds ?? [])].sort(),
    wl: story.requiresWorldlineBranch
      ? `${story.requiresWorldlineBranch.groupId}:${story.requiresWorldlineBranch.branchId}`
      : "",
    marks: [...(story.requiresWorldConsequenceMarks ?? [])].sort(),
  };
  return JSON.stringify(req);
}

function validateDuplicateIds(
  stories: StoryDefinition[],
  issues: AuthoringIssue[],
) {
  const seen = new Map<string, StoryDefinition[]>();
  for (const s of stories) {
    const list = seen.get(s.id) ?? [];
    list.push(s);
    seen.set(s.id, list);
  }
  for (const [id, list] of seen) {
    if (list.length > 1) {
      push(
        issues,
        "error",
        "duplicate_story_id",
        `Story id "${id}" appears ${list.length} times in the registry.`,
        [id],
      );
    }
  }
}

function validateContinuationChains(
  stories: StoryDefinition[],
  idSet: Set<string>,
  issues: AuthoringIssue[],
) {
  const byId = new Map(stories.map((s) => [s.id, s] as const));

  for (const story of stories) {
    const ref = story.continuationOf?.storyId;
    if (!ref) continue;

    if (ref === story.id) {
      push(
        issues,
        "error",
        "continuation_self_reference",
        `Story "${story.id}" continues itself.`,
        [story.id],
      );
      continue;
    }

    if (!idSet.has(ref)) {
      push(
        issues,
        "error",
        "continuation_dangling_anchor",
        `Story "${story.id}" continues missing anchor "${ref}".`,
        [story.id],
      );
    }

    const suggested = story.continuationOf?.suggestedVariantId;
    if (suggested && story.variantId && suggested !== story.variantId) {
      push(
        issues,
        "warning",
        "continuation_variant_id_mismatch",
        `Story "${story.id}" has continuationOf.suggestedVariantId "${suggested}" but variantId "${story.variantId}".`,
        [story.id],
      );
    }
  }

  /** Walk child → anchor edges; report each unique cycle once. */
  const reportedCycleKeys = new Set<string>();
  for (const story of stories) {
    if (!story.continuationOf) continue;
    const path: string[] = [];
    const indexInPath = new Map<string, number>();
    let cur: string | undefined = story.id;
    while (cur && idSet.has(cur)) {
      if (indexInPath.has(cur)) {
        const start = indexInPath.get(cur)!;
        const cycleNodes = path.slice(start);
        const key = [...cycleNodes].sort().join("|");
        if (cycleNodes.length > 0 && !reportedCycleKeys.has(key)) {
          const selfLoop =
            cycleNodes.length === 1 &&
            cycleNodes[0] === story.id &&
            story.continuationOf?.storyId === story.id;
          if (!selfLoop) {
            reportedCycleKeys.add(key);
            push(
              issues,
              "error",
              "continuation_cycle",
              `Continuation cycle detected involving: ${cycleNodes.join(" → ")}.`,
              cycleNodes,
            );
          }
        }
        break;
      }
      indexInPath.set(cur, path.length);
      path.push(cur);
      cur = byId.get(cur)?.continuationOf?.storyId;
    }
  }

  const anchorIndex = new Map<string, StoryDefinition[]>();
  for (const s of stories) {
    const a = s.continuationOf?.storyId;
    if (!a) continue;
    const list = anchorIndex.get(a) ?? [];
    list.push(s);
    anchorIndex.set(a, list);
  }

  for (const [anchor, siblings] of anchorIndex) {
    if (siblings.length < 2) continue;
    const fps = new Map<string, StoryDefinition[]>();
    for (const s of siblings) {
      const fp = gateFingerprint(s);
      const g = fps.get(fp) ?? [];
      g.push(s);
      fps.set(fp, g);
    }
    for (const [, group] of fps) {
      if (group.length >= 2) {
        push(
          issues,
          "warning",
          "continuation_siblings_same_gates",
          `Stories continuing "${anchor}" share the same discovery gate fingerprint (${group.map((s) => s.id).join(", ")}); they may be indistinguishable until play differs.`,
          group.map((s) => s.id),
        );
      }
    }
  }
}

function validateVariantGroups(
  stories: StoryDefinition[],
  baseline: PersistedProfile,
  issues: AuthoringIssue[],
) {
  const byGroup = new Map<string, StoryDefinition[]>();
  for (const s of stories) {
    const g = s.variantGroup;
    if (!g) continue;
    const list = byGroup.get(g) ?? [];
    list.push(s);
    byGroup.set(g, list);
  }

  for (const [groupId, members] of byGroup) {
    if (members.length < 2) continue;

    const missingVid = members.filter((m) => !m.variantId);
    if (missingVid.length > 0) {
      push(
        issues,
        "warning",
        "variant_group_missing_variant_id",
        `Variant group "${groupId}" has ${missingVid.length} member(s) without variantId (${missingVid.map((m) => m.id).join(", ")}).`,
        missingVid.map((m) => m.id),
      );
    }

    const vidCounts = new Map<string, string[]>();
    for (const m of members) {
      if (!m.variantId) continue;
      const list = vidCounts.get(m.variantId) ?? [];
      list.push(m.id);
      vidCounts.set(m.variantId, list);
    }
    for (const [vid, ids] of vidCounts) {
      if (ids.length > 1) {
        push(
          issues,
          "warning",
          "variant_group_duplicate_variant_id",
          `Variant group "${groupId}" reuses variantId "${vid}" for: ${ids.join(", ")}.`,
          ids,
        );
      }
    }

    const startable = members.filter(
      (m) =>
        evaluateStorySurfacing(m, baseline, { allStories: stories }).isStartable,
    );
    if (startable.length > 1) {
      push(
        issues,
        "warning",
        "variant_group_multiple_baseline_startable",
        `Variant group "${groupId}" has ${startable.length} members startable on the baseline profile (${startable.map((s) => s.id).join(", ")}); consider mutex gates or worldlines.`,
        startable.map((s) => s.id),
      );
    }

    const anchors = new Set(
      members.map((m) => m.continuationOf?.storyId ?? "").filter(Boolean),
    );
    if (anchors.size > 1) {
      push(
        issues,
        "warning",
        "variant_group_inconsistent_continuation_anchor",
        `Variant group "${groupId}" mixes continuationOf anchors: ${[...anchors].join(", ")}.`,
        members.map((m) => m.id),
      );
    }
  }
}

function validateSurfacingHeuristics(
  stories: StoryDefinition[],
  issues: AuthoringIssue[],
) {
  for (const s of stories) {
    if (s.preDiscoverySurfacing === "rumor" && !s.rumorText?.trim()) {
      push(
        issues,
        "warning",
        "surfacing_rumor_without_copy",
        `Story "${s.id}" uses preDiscoverySurfacing "rumor" but rumorText is empty.`,
        [s.id],
      );
    }
    if (s.preDiscoverySurfacing === "teaser") {
      const hasTeaser =
        Boolean(s.teaserTitle?.trim()) || Boolean(s.teaserSummary?.trim());
      if (!hasTeaser) {
        push(
          issues,
          "warning",
          "surfacing_teaser_without_copy",
          `Story "${s.id}" uses preDiscoverySurfacing "teaser" but teaserTitle/teaserSummary are empty.`,
          [s.id],
        );
      }
    }
    if (s.listPresentationStyle === "secret" && !s.secretListHint?.trim()) {
      push(
        issues,
        "warning",
        "surfacing_secret_without_hint",
        `Story "${s.id}" uses listPresentationStyle "secret" but secretListHint is empty.`,
        [s.id],
      );
    }

    const hasDiscoveryGate =
      (s.requiresEchoes?.length ?? 0) > 0 ||
      (s.requiresEndings?.length ?? 0) > 0 ||
      (s.requiresFlags?.length ?? 0) > 0 ||
      (s.requiresAnyFlags?.length ?? 0) > 0 ||
      (s.requiresAnyWorldConsequenceMarks?.length ?? 0) > 0 ||
      (s.requiresUnlockedModuleIds?.length ?? 0) > 0 ||
      (s.requiresWorldlineBranch !== undefined) ||
      (s.requiresWorldConsequenceMarks?.length ?? 0) > 0;

    if (s.isHiddenUntilUnlocked && !hasDiscoveryGate) {
      push(
        issues,
        "warning",
        "hidden_until_unlocked_no_gate",
        `Story "${s.id}" sets isHiddenUntilUnlocked but has no requiresEchoes / requiresEndings / requiresFlags / requiresUnlockedModuleIds / worldline / consequence marks (may never differ from default hidden behavior).`,
        [s.id],
      );
    }
  }
}

function collectWorldlineCommits(stories: StoryDefinition[]): Set<string> {
  const keys = new Set<string>();
  for (const story of stories) {
    for (const e of story.endings ?? []) {
      const c = e.worldlineCommit;
      if (c) keys.add(`${c.groupId}:${c.branchId}`);
    }
  }
  return keys;
}

function validateWorldConsequences(
  stories: StoryDefinition[],
  issues: AuthoringIssue[],
) {
  const commits = collectWorldlineCommits(stories);

  for (const story of stories) {
    const req = story.requiresWorldlineBranch;
    if (req) {
      const key = `${req.groupId}:${req.branchId}`;
      if (!commits.has(key)) {
        push(
          issues,
          "warning",
          "worldline_requirement_no_ending_commit",
          `Story "${story.id}" requires worldline "${key}" but no ending in the registry sets worldlineCommit to that pair (may be set only by future content or choices).`,
          [story.id],
        );
      }
    }

    for (const ex of story.excludesWorldlineBranches ?? []) {
      if (req && ex.groupId === req.groupId && ex.branchId === req.branchId) {
        push(
          issues,
          "error",
          "worldline_requires_and_excludes_same_branch",
          `Story "${story.id}" requires and excludes the same worldline branch (${ex.groupId}:${ex.branchId}).`,
          [story.id],
        );
      }
    }
  }

  /** Same story: two endings commit different branches for the same group (expected mutex); flag if >2 branches same group in one story? optional */
  for (const story of stories) {
    const byGroup = new Map<string, Set<string>>();
    for (const e of story.endings ?? []) {
      const c = e.worldlineCommit;
      if (!c) continue;
      const set = byGroup.get(c.groupId) ?? new Set();
      set.add(c.branchId);
      byGroup.set(c.groupId, set);
    }
    for (const [gid, branches] of byGroup) {
      if (branches.size > 1) {
        push(
          issues,
          "warning",
          "story_multiple_worldline_branches_same_group",
          `Story "${story.id}" has endings that commit different branchIds for worldline group "${gid}" (${[...branches].join(", ")}); ensure endings are mutually exclusive by conditions.`,
          [story.id],
        );
      }
    }
  }
}

function validateRequiresEndingsReferences(
  stories: StoryDefinition[],
  idSet: Set<string>,
  storyById: Map<string, StoryDefinition>,
  issues: AuthoringIssue[],
) {
  for (const story of stories) {
    for (const ref of story.requiresEndings ?? []) {
      if (!idSet.has(ref.storyId)) {
        push(
          issues,
          "error",
          "requires_ending_unknown_story",
          `Story "${story.id}" requires ending from unknown story "${ref.storyId}".`,
          [story.id],
        );
        continue;
      }
      const target = storyById.get(ref.storyId);
      const ok = target?.endings.some((e) => e.id === ref.endingId);
      if (!ok) {
        push(
          issues,
          "error",
          "requires_ending_unknown_ending",
          `Story "${story.id}" requires missing ending "${ref.endingId}" on "${ref.storyId}".`,
          [story.id],
        );
      }
    }
  }
}

/**
 * Validates anthology authoring metadata for the given story list (typically
 * `storyRegistry`). Does **not** call `validateStory` / Zod — assume definitions
 * already load; this layer is orthogonal continuity checks.
 */
export function validateStoryRegistryAuthoring(
  stories: StoryDefinition[],
  options?: ValidateStoryRegistryOptions,
): AuthoringValidationReport {
  const issues: AuthoringIssue[] = [];
  const baseline = options?.baselineProfile ?? defaultBaseline();
  const idSet = new Set(stories.map((s) => s.id));
  const storyById = new Map(stories.map((s) => [s.id, s] as const));

  validateDuplicateIds(stories, issues);
  validateContinuationChains(stories, idSet, issues);
  validateRequiresEndingsReferences(stories, idSet, storyById, issues);
  validateVariantGroups(stories, baseline, issues);
  validateSurfacingHeuristics(stories, issues);
  validateWorldConsequences(stories, issues);

  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;

  return { issues, errorCount, warningCount };
}
