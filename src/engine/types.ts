/**
 * Core engine types for the interactive story engine.
 *
 * The engine is data-driven. Stories describe themselves using these types
 * and are executed by the engine without any story-specific code paths.
 */

/**
 * Narrative “contract” for how much agency the story grants.
 *
 * - **stable** — deliberate choices mostly honored.
 * - **pressured** — stress / obsession skews options and outcomes (`pressuredConfig`).
 * - **distorted** — unreliable narration or perception (handler TBD).
 * - **possessed** — **impulse-dominant or partial-loss-of-control** stories: berserker
 *   rage, animal survival or territoriality, compulsions, frenzy, panic override,
 *   curse-driven or feral behavior, and similar—not *only* supernatural possession.
 *   The handler is not implemented yet; routing and types are ready for future hooks.
 * - **witness** — indirect / interpretive agency (handler TBD).
 */
export type StoryClass =
  | "stable"
  | "pressured"
  | "distorted"
  | "possessed"
  | "witness";

export type PersonalityId = string;
export type SceneId = string;
export type ChoiceId = string;
export type EndingId = string;
export type FlagId = string;
export type VariableId = string;
export type VowId = string;

export type VowState = "kept" | "strained" | "broken";

export type VariableValue = number | boolean | string;

export interface VariableDefinition {
  id: VariableId;
  type: "number" | "boolean" | "enum";
  initialValue: VariableValue;
}

export interface VowDefinition {
  id: VowId;
  title: string;
  description?: string;
  initialState?: VowState;
}

export interface PersonalityModifiers {
  /**
   * Free-form tags story-class hooks can read (`hasPersonalityTag`, or direct
   * inspection in handlers). Per-choice stat/vow skew lives on
   * `ChoiceDefinition.personalityAppendConsequences`, not here—keeps modifiers
   * lightweight and data near the choice.
   */
  tags?: string[];
}

export interface PersonalityDefinition {
  id: PersonalityId;
  name: string;
  preview: string;
  description?: string;
  modifiers?: PersonalityModifiers;
}

export type ConditionOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "includes";

/** Declares objective / hidden facts; initialized with the story, not shown in normal UI. */
export interface HiddenTruthDefinition {
  /** Numeric, boolean, or enum facts the world “actually” has. */
  variables?: VariableDefinition[];
  /** Boolean facts (e.g. accusation objectively true). */
  flags?: HiddenTruthFlagDefinition[];
}

export interface HiddenTruthFlagDefinition {
  id: FlagId;
  initialValue: boolean;
}

/** Runtime slice for `hidden.*` condition targets; optional to keep saves small when unused. */
export interface HiddenTruthRuntimeState {
  variables: Record<VariableId, VariableValue>;
  flags: Record<FlagId, boolean>;
}

/**
 * Authoring: what the POV **believes** or has **inferred** — distinct from
 * visible `variables`/`flags`, `hiddenTruth` (objective facts), and profile.
 */
export interface BeliefDefinition {
  variables?: VariableDefinition[];
  flags?: BeliefFlagDefinition[];
}

export interface BeliefFlagDefinition {
  id: FlagId;
  initialValue: boolean;
}

/** Runtime slice for `belief.*` condition targets; omitted when the story has no belief layer. */
export interface BeliefRuntimeState {
  variables: Record<VariableId, VariableValue>;
  flags: Record<FlagId, boolean>;
}

/**
 * A condition targets a runtime value using dotted addressing:
 *   variables.village_trust     — player-visible / POV state
 *   flags.defied_superior
 *   hidden.variables.*          — objective hidden truth (not shown in standard UI)
 *   hidden.flags.*
 *   belief.variables.*          — POV inference / conviction (not objective truth)
 *   belief.flags.*
 *   vows.obey_order
 *   personality
 *   echoes                      (in-run slice on `StoryRuntimeState.unlockedEchoes`)
 *   profile.worldFlags.<id>     — durable flag (requires `RuntimeProfileSnapshot`)
 *   profile.globalEchoes        — durable echo ids array
 *   profile.completedEndings.<storyId> — ending ids completed for that story
 *   profile.unlockedModuleIds   — module ids from prior ending `unlocks`
 *   profile.worldConsequenceMarks — deduped mark ids (requires snapshot array)
 */
export interface Condition {
  target: string;
  operator: ConditionOperator;
  value: unknown;
}

export type Consequence =
  | { type: "setVariable"; target: VariableId; value: VariableValue }
  | { type: "incrementVariable"; target: VariableId; value: number }
  | { type: "setFlag"; target: FlagId; value: boolean }
  | { type: "setVowState"; target: VowId; value: VowState }
  | { type: "setHiddenVariable"; target: VariableId; value: VariableValue }
  | { type: "incrementHiddenVariable"; target: VariableId; value: number }
  | { type: "setHiddenFlag"; target: FlagId; value: boolean }
  | { type: "setBeliefVariable"; target: VariableId; value: VariableValue }
  | { type: "incrementBeliefVariable"; target: VariableId; value: number }
  | { type: "setBeliefFlag"; target: FlagId; value: boolean }
  /**
   * Writes `profile.worldFlags[target]` when the choice resolves (durable;
   * merged in the store). Does not touch scene `runtime.flags`.
   */
  | { type: "setWorldFlag"; target: string; value: boolean };

export interface ChoiceDefinition {
  id: ChoiceId;
  text: string;
  nextSceneId?: SceneId;
  conditions?: Condition[];
  consequences?: Consequence[];
  /**
   * When the player's `personalityId` matches a key, these consequences are
   * appended after `consequences`. Keeps personality skew data-driven.
   */
  personalityAppendConsequences?: Partial<
    Record<PersonalityId, Consequence[]>
  >;
  tags?: string[];
  /**
   * If true and conditions fail, the choice is shown disabled instead of
   * being hidden. Useful for hinting at unreachable paths.
   */
  showWhenLocked?: boolean;
}

export interface SceneDefinition {
  id: SceneId;
  title?: string;
  body: string[];
  choices: ChoiceDefinition[];
  /**
   * Conditions for a scene to be entered. Usually unused for linear flows.
   */
  conditions?: Condition[];
  /**
   * If no choices survive filtering, the engine treats this as a terminal
   * scene and runs ending resolution.
   */
  isTerminal?: boolean;
}

/** Resolution classification for pressured (and future) story-class auditing. */
export type PressuredResolutionKind =
  | "normal"
  | "strained"
  | "mutated"
  | "forced";

export interface PressuredPendingSignal {
  type: string;
  payload?: unknown;
}

/** Per-choice UI / availability skew when a pressure tier is active. */
export interface PressuredChoiceTierEffect {
  choiceId: ChoiceId;
  hide?: boolean;
  disable?: boolean;
  relabel?: string;
  annotate?: string;
}

/**
 * One threshold band for a watched variable. The highest `whenGte` that the
 * current value still satisfies (value >= whenGte) wins for that variable.
 */
export interface PressuredInspectTier {
  whenGte: number;
  /** When set, this tier only applies in this scene. */
  sceneId?: SceneId;
  choiceEffects?: PressuredChoiceTierEffect[];
  /** Appended on every choice resolution while this tier is active. */
  appendOnResolve?: Consequence[];
  /**
   * Audit label for resolutions while this tier contributes. If omitted and
   * `appendOnResolve` is non-empty → `"strained"`. If omitted and
   * `pendingSignals` is non-empty → `"mutated"`.
   */
  resolutionKind?: PressuredResolutionKind;
  /** Merged into `engineMeta.pressured.pending` after the choice resolves. */
  pendingSignals?: PressuredPendingSignal[];
}

export interface PressuredInspectVariable {
  variableId: VariableId;
  tiers: PressuredInspectTier[];
}

/**
 * Optional config for `storyClass: "pressured"`. Omit or use `inspect: []`
 * for a pass-through pressured story until content is ready.
 */
export interface PressuredStoryConfig {
  inspect: PressuredInspectVariable[];
}

/** Audit entries written when a pending signal is consumed. */
export interface PressuredConsumedRecord {
  type: string;
  atMs: number;
}

/**
 * Structured follow-up context after pending-signal consumption (not raw
 * payload dumps — keeps `engineMeta` inspectable).
 */
export interface PressuredFollowUpMeta {
  /** How the player arrived at the current scene after the last flush. */
  arrivalKind?: "free" | "forced" | "mutated";
  /** Last scene id applied by a `forced_followup_scene` signal. */
  forcedToSceneId?: SceneId;
}

/** Mirrors `PressuredFollowUpMeta.arrivalKind` for narration authoring keys. */
export type PlayNarrationArrivalKind = NonNullable<
  PressuredFollowUpMeta["arrivalKind"]
>;

/**
 * Optional authorable copy for pressured (and similar) stories: short lines
 * keyed by resolution / arrival semantics. No engine-local prose — all
 * strings live on the story definition or hook returns.
 */
export interface PressuredNarrationConfig {
  /** Lines after a choice resolves, keyed by `lastResolution.kind`. */
  postChoiceByKind?: Partial<Record<PressuredResolutionKind, string[]>>;
  /** Per-choice overrides or additions (same keys as `postChoiceByKind`). */
  postChoiceByChoice?: Partial<
    Record<ChoiceId, Partial<Record<PressuredResolutionKind, string[]>>>
  >;
  /** Shown when `engineMeta.pressured.followUp` describes the latest arrival. */
  sceneArrivalByKind?: Partial<Record<PlayNarrationArrivalKind, string[]>>;
}

/**
 * Runtime bag at `engineMeta.playNarration` — hook-supplied lines merged by
 * `choiceResolver`; read by `resolvePlayNarration`.
 */
export interface PlayNarrationEngineMeta {
  hookPostChoiceLines?: string[];
}

/** One resolved “frame” of player-facing narration after a choice + flush. */
export interface ResolvedPostChoiceNarration {
  lines: string[];
  /** Present when copy is tied to pressured audit; omitted for hook-only lines. */
  resolutionKind?: PressuredResolutionKind;
}

export interface ResolvedSceneArrivalNarration {
  lines: string[];
  kind: PlayNarrationArrivalKind;
}

export interface ResolvedPlayNarration {
  postChoice?: ResolvedPostChoiceNarration;
  sceneArrival?: ResolvedSceneArrivalNarration;
}

/**
 * Typed slice stored at `engineMeta.pressured` for pressured stories.
 */
export interface PressuredEngineMeta {
  lastResolution?: {
    choiceId: ChoiceId;
    kind: PressuredResolutionKind;
    sceneId?: SceneId;
    atMs?: number;
  };
  pending?: PressuredPendingSignal[];
  /** Recent consumed signals (FIFO-capped by the flusher). */
  consumedHistory?: PressuredConsumedRecord[];
  /** Last follow-up semantics from signal consumption. */
  followUp?: PressuredFollowUpMeta;
}

/** One active branch per `groupId` on the persisted profile (mutex worldline). */
export interface WorldlineBranchRef {
  groupId: string;
  branchId: string;
}

export interface EndingDefinition {
  id: EndingId;
  title: string;
  body: string[];
  conditions: Condition[];
  echoes?: FlagId[];
  /**
   * Merged into `profile.worldFlags` when this ending resolves (durable).
   * Use for regional / institutional facts (e.g. pits banned, order fell).
   */
  worldFlags?: Record<string, boolean>;
  /**
   * Higher priority endings are matched first when multiple are eligible.
   * Defaults to 0.
   */
  priority?: number;
  /**
   * Story / module ids appended to `profile.unlockedModuleIds` when this
   * ending resolves (for gates that use `requiresUnlockedModuleIds`).
   */
  unlocks?: string[];
  /**
   * World consequence depth: commits the winning branch for a mutex
   * **worldline family** (`profile.worldlineBranches[groupId] = branchId`).
   */
  worldlineCommit?: WorldlineBranchRef;
  /**
   * Named historical marks appended to `profile.worldConsequenceMarks`
   * (deduped). Use for anthology-scale tags beyond boolean flags.
   */
  worldConsequenceMarks?: string[];
  /**
   * Permanently record closure ids on `profile.closedHistoryMarks` (deduped).
   * Stories with `blockedWhenHistoryClosed` mutex-exclude when any match.
   */
  closeHistoryMarks?: string[];
}

/**
 * Authoring / tooling only — not shown to players. See `design_doctrine.md`.
 */
export type StoryUnlockCategory =
  | "open"
  | "outcome_gated"
  | "world_gated"
  | "role_gated"
  | "secret"
  | "mutually_exclusive";

/**
 * Planning / anthology organization — aligns with `docs/planning/eras_and_scales.md`.
 * Not player-facing; optional on each story.
 */
export type StoryEraId =
  | "bc_mythic"
  | "ancient_early_historical"
  | "medieval_holy_arena_curse"
  | "modern_fractured_court_media_ai"
  | "near_future"
  | "far_future_observer_alien"
  | "side_slice_misc";

/**
 * Module template — aligns with `docs/planning/module_templates.md`.
 * Not shown as raw taxonomy in primary UI.
 */
export type StoryModuleTemplateId =
  | "narrative"
  | "duel_tournament"
  | "survival_instinct"
  | "witness_interpretation"
  | "distorted_perception"
  | "observer_documentary"
  | "slice_of_life_social";

/** Authoring pipeline; browse rules use `evaluateStorySurfacing` / `getStoryBrowseState`. */
export type StoryAuthoringAvailability = "shipped" | "in_dev" | "concept";

/** Required completed ending elsewhere for gates (outcome-gated sequels). */
export interface StoryEndingRequirement {
  storyId: string;
  endingId: EndingId;
}

/** How to surface a story on the shelf **before** discovery gates pass. */
export type StoryPreDiscoverySurfacing = "hidden" | "rumor" | "teaser";

/** Main-row presentation when the story is on the list but not yet playable. */
export type StoryListPresentationStyle = "standard" | "secret";

/** Prior module this entry continues or branches from (sequencing / variants). */
export interface StoryContinuationRef {
  storyId: string;
  /** Future: pick this variant when multiple continuations share an id. */
  suggestedVariantId?: string;
}

export interface StoryDefinition {
  id: string;
  title: string;
  storyClass: StoryClass;
  description: string;
  playerRole: string;
  initialSceneId: SceneId;
  /**
   * Player-facing shell copy (menu, intro, headers). Omit any field to fall
   * back to `title`, `description`, or `playerRole`. Never use `storyClass`
   * as player-facing taxonomy.
   */
  playerTitle?: string;
  playerSummary?: string;
  playerRoleHint?: string;
  /** Shown when a story is listed but not yet playable (see `lockedUntilEchoes`). */
  playerUnlockHint?: string;
  /**
   * Optional unlock copy; merged with `playerUnlockHint` as
   * `unlockHint ?? playerUnlockHint` in surfacing presentation.
   */
  unlockHint?: string;
  /** Short atmospheric tagline, e.g. setting or mood — optional eyebrow in UI. */
  playerToneHint?: string;
  /** One-line whisper when `preDiscoverySurfacing` is `rumor`. */
  rumorText?: string;
  /** Eyebrow title when surfacing as `teaser` before discovery. */
  teaserTitle?: string;
  /** Blurb when surfacing as `teaser` before discovery. */
  teaserSummary?: string;
  /**
   * When discovery fails, whether the player sees nothing, a rumor strip, or a
   * teaser band (off the main list). Defaults to `hidden` when omitted.
   */
  preDiscoverySurfacing?: StoryPreDiscoverySurfacing;
  /** Mystery copy on the main list when `listPresentationStyle` is `secret`. */
  secretListHint?: string;
  /** Shelf row flavor when listed but locked (or startable with secret tone). */
  listPresentationStyle?: StoryListPresentationStyle;
  /** Optional: prior story this module follows or contradicts. */
  continuationOf?: StoryContinuationRef;
  /**
   * Optional full continuation line for browse/intro (e.g. “After the trial…”).
   * When omitted and `continuationOf` is set, surfacing may synthesize a soft
   * lineage line (e.g. “An echo of …”) if the anchor exists in the registry
   * passed to `evaluateStorySurfacing` / `getStoryBrowseState`.
   */
  playerContinuationHint?: string;
  /** Optional: branch family (e.g. holy vs dark sequel bucket). */
  variantGroup?: string;
  /** Optional: disambiguator within `variantGroup`. */
  variantId?: string;
  /**
   * Authoring marker for “secret / not on shelf until discovered.” Mechanical
   * gating uses `requiresEchoes` (when non-empty), `excludes*`, flags, and
   * endings via `evaluateStoryAvailability`. If true and `requiresEchoes` is
   * empty, browse is not suppressed by echo requirements alone (authoring guard).
   */
  isHiddenUntilUnlocked?: boolean;
  /**
   * All ids must exist on `profile.globalEchoes` for the story to be
   * listable/startable (unless `isHiddenUntilUnlocked` is true and this array
   * is empty — then no echo prerequisite). See `evaluateStoryAvailability`.
   */
  requiresEchoes?: FlagId[];
  /** If any id is present on the profile, the story is mutex-blocked (not listed). */
  excludesEchoes?: FlagId[];
  /** All ids must be true on `profile.worldFlags` (missing counts as false). */
  requiresFlags?: string[];
  /**
   * At least one id must be true on `profile.worldFlags` (OR). For mutually
   * exclusive seeds that open the same follow-up (e.g. shock vs soft aftermath).
   */
  requiresAnyFlags?: string[];
  /**
   * At least one mark must appear on `profile.worldConsequenceMarks` (OR).
   * Evaluated together with `requiresAnyFlags` as a single OR group: pass if
   * any listed flag is true **or** any listed mark is present (when either
   * array is non-empty).
   */
  requiresAnyWorldConsequenceMarks?: string[];
  /** If any id is true on `profile.worldFlags`, the story is mutex-blocked. */
  excludesFlags?: string[];
  /** Player must have completed these endings (any order). */
  requiresEndings?: StoryEndingRequirement[];
  /**
   * Every id must appear on `profile.unlockedModuleIds` (from prior ending
   * `unlocks`) for discovery to pass.
   */
  requiresUnlockedModuleIds?: string[];
  /**
   * Discovery requires this worldline branch (`profile.worldlineBranches`).
   * If the group is missing or differs, discovery fails.
   */
  requiresWorldlineBranch?: WorldlineBranchRef;
  /**
   * Mutex: story is excluded if the profile’s committed branch matches any
   * entry (same `groupId` and `branchId`).
   */
  excludesWorldlineBranches?: WorldlineBranchRef[];
  /** Discovery requires every mark on `profile.worldConsequenceMarks`. */
  requiresWorldConsequenceMarks?: string[];
  /**
   * Mutex: exclude if **any** of these marks appear on
   * `profile.worldConsequenceMarks`.
   */
  excludesWorldConsequenceMarks?: string[];
  /**
   * Mutex: exclude if **any** id is present on `profile.closedHistoryMarks`
   * (permanent path / resolution closures from prior endings).
   */
  blockedWhenHistoryClosed?: string[];
  /**
   * Story appears in the list but cannot be started until all these echoes
   * are present; use with `playerUnlockHint`.
   */
  lockedUntilEchoes?: FlagId[];
  /** Planning / analytics / future tools — not player-facing copy. */
  unlockCategory?: StoryUnlockCategory;
  /** Optional: era bucket for docs and tooling. */
  era?: StoryEraId;
  /** Optional: interaction template; see `module_templates.md`. */
  moduleTemplate?: StoryModuleTemplateId;
  /** Optional: shipped vs pipeline; does not replace runtime unlock gates. */
  authoringAvailability?: StoryAuthoringAvailability;
  personalities?: PersonalityDefinition[];
  variables: VariableDefinition[];
  vows?: VowDefinition[];
  scenes: SceneDefinition[];
  endings: EndingDefinition[];
  /**
   * Data-driven pressure model for `storyClass: "pressured"`. Ignored for
   * other classes (including `stable`).
   */
  pressuredConfig?: PressuredStoryConfig;
  /**
   * Optional short narration lines for `storyClass: "pressured"` (ignored if
   * absent). Resolved by `resolvePlayNarration` from audit + follow-up meta.
   */
  pressuredNarration?: PressuredNarrationConfig;
  /**
   * Objective state the POV may not know yet. Drives `hidden.*` conditions;
   * not listed in standard player UI.
   */
  hiddenTruth?: HiddenTruthDefinition;
  /**
   * POV belief / inference layer. Drives `belief.*` conditions; optional.
   * Not shown in standard player UI unless a story adds bespoke chrome.
   */
  belief?: BeliefDefinition;
}

/**
 * Runtime state for a single in-progress story.
 */
export interface StoryRuntimeState {
  storyId: string;
  personalityId?: PersonalityId;
  currentSceneId: SceneId | null;
  variables: Record<VariableId, VariableValue>;
  flags: Record<FlagId, boolean>;
  vowStates: Record<VowId, VowState>;
  unlockedEchoes: FlagId[];
  endingId: EndingId | null;
  history: SceneId[];
  /**
   * Opaque key-value bag for story-class hooks (pending interrupts, counters,
   * audit). Not interpreted by base engine logic.
   */
  engineMeta?: Record<string, unknown>;
  /**
   * Objective / hidden layer: what is true in the world vs what visible
   * `variables` / `flags` represent (UI-facing state, clues).
   */
  hiddenTruth?: HiddenTruthRuntimeState;
  /**
   * What the POV believes or has inferred — parallel to `hiddenTruth`, not a
   * substitute for it.
   */
  belief?: BeliefRuntimeState;
}

/**
 * Read-only slice of `PersistedProfile` for in-play condition evaluation.
 * Supplied by the store via `toRuntimeProfileSnapshot` — the engine never
 * mutates it during condition resolution.
 */
export interface RuntimeProfileSnapshot {
  worldFlags: Record<string, boolean>;
  globalEchoes: FlagId[];
  completedEndings: Record<string, EndingId[]>;
  unlockedModuleIds: string[];
  /** Consequence marks (e.g. ending-gated conditions via `includes`). */
  worldConsequenceMarks: string[];
}

/**
 * Persisted across sessions: global echoes unlocked from any completed
 * story, plus the most recent in-progress runtime state.
 */
export interface PersistedProfile {
  globalEchoes: FlagId[];
  completedEndings: Record<string, EndingId[]>;
  /** Cross-story world facts for gate evaluation (e.g. `underground_fighting_banned`). */
  worldFlags?: Record<string, boolean>;
  /**
   * Module ids granted by resolved endings (`EndingDefinition.unlocks`).
   * Optional gate: `StoryDefinition.requiresUnlockedModuleIds`.
   */
  unlockedModuleIds?: string[];
  /**
   * Mutex worldlines: at most one `branchId` per `groupId` (last ending commit wins).
   */
  worldlineBranches?: Record<string, string>;
  /**
   * Named consequence marks from endings (historical tags; deduped).
   */
  worldConsequenceMarks?: string[];
  /**
   * Permanent closures (path ids); mutex with `blockedWhenHistoryClosed` on stories.
   */
  closedHistoryMarks?: string[];
  lastRuntime: StoryRuntimeState | null;
}
