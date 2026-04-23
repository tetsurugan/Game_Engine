import type {
  ChoiceDefinition,
  Consequence,
  EndingId,
  PersonalityDefinition,
  SceneDefinition,
  SceneId,
  StoryDefinition,
  StoryRuntimeState,
} from "./types";

/**
 * Context passed to every story-class hook. All logic keys are ids; display
 * strings live on the story definition and are never consulted by handlers.
 */
export interface StoryClassHookContext {
  story: StoryDefinition;
  scene: SceneDefinition;
  runtime: StoryRuntimeState;
  personality: PersonalityDefinition | null;
}

/** Context when a specific choice is being considered or applied. */
export interface StoryClassChoiceContext extends StoryClassHookContext {
  choice: ChoiceDefinition;
}

/** Context after consequences run, before the scene pointer advances. */
export interface AfterChoiceResolveContext extends StoryClassChoiceContext {
  nextState: StoryRuntimeState;
}

export interface BeforeChoiceVisibleResult {
  /**
   * When false, the choice is hidden entirely (even if `showWhenLocked`
   * would normally show it disabled).
   */
  visible?: boolean;
  /** Overrides whether the player can click this choice. */
  available?: boolean;
  /** Replaces the visible label; base `choice.text` remains the content id anchor. */
  displayText?: string;
  /** Shown beneath the label — use for subtle distortion / emphasis later. */
  displayAnnotation?: string;
}

export interface BeforeChoiceResolveResult {
  /**
   * When set, replaces the merged base + personality consequences entirely.
   * `appendConsequences` is still applied after this override.
   */
  consequencesOverride?: Consequence[];
  /** Appended after the effective consequence list (override or merged base). */
  appendConsequences?: Consequence[];
  /** Overrides `choice.nextSceneId` when branching needs to be intercepted. */
  nextSceneIdOverride?: SceneId | null;
}

export interface AfterChoiceResolveResult {
  /**
   * Shallow-merged into the post-consequence runtime before the scene cursor
   * moves. Nested maps (`variables`, `flags`, `vowStates`) are merged.
   */
  runtimePatch?: Partial<StoryRuntimeState>;
  /**
   * Appended to `engineMeta.playNarration.hookPostChoiceLines` for
   * `resolvePlayNarration` (possessed / custom hooks; story-agnostic).
   */
  postChoiceNarrationLines?: string[];
}

export interface BeforeEndingResolveResult {
  /**
   * When set, ending *conditions* are evaluated against this state snapshot
   * instead of `runtime`. The persisted runtime is unchanged — useful for
   * distorted narratives where what the player "believes" differs from truth.
   */
  evaluationState?: StoryRuntimeState;
  /**
   * Optional per-ending priority delta for this resolution pass only.
   * Positive raises an ending in the sort order. Reserved for future classes.
   */
  endingPriorityDelta?: Partial<Record<EndingId, number>>;
}

/**
 * Story-class handlers extend engine behavior without embedding class logic
 * in React or in individual story files.
 */
export interface StoryClassHandler {
  beforeChoiceVisible?: (
    ctx: StoryClassHookContext,
    choice: ChoiceDefinition,
  ) => BeforeChoiceVisibleResult | void;

  beforeChoiceResolve?: (
    ctx: StoryClassChoiceContext,
  ) => BeforeChoiceResolveResult | void;

  afterChoiceResolve?: (
    ctx: AfterChoiceResolveContext,
  ) => AfterChoiceResolveResult | void;

  beforeEndingResolve?: (
    ctx: StoryClassHookContext,
  ) => BeforeEndingResolveResult | void;
}
