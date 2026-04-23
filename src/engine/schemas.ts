import { z } from "zod";

/**
 * Zod schemas for runtime validation of story data. These mirror the
 * TypeScript types in ./types.ts. If you change one, change the other.
 */

export const vowStateSchema = z.enum(["kept", "strained", "broken"]);

export const storyClassSchema = z.enum([
  "stable",
  "pressured",
  "distorted",
  "possessed",
  "witness",
]);

export const variableValueSchema = z.union([
  z.number(),
  z.boolean(),
  z.string(),
]);

export const variableDefinitionSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["number", "boolean", "enum"]),
  initialValue: variableValueSchema,
});

export const vowDefinitionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  initialState: vowStateSchema.optional(),
});

export const personalityDefinitionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  preview: z.string().min(1),
  description: z.string().optional(),
  modifiers: z
    .object({
      tags: z.array(z.string()).optional(),
    })
    .optional(),
});

export const conditionSchema = z.object({
  target: z.string().min(1),
  operator: z.enum(["eq", "neq", "gt", "gte", "lt", "lte", "includes"]),
  value: z.unknown(),
});

export const consequenceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("setVariable"),
    target: z.string().min(1),
    value: variableValueSchema,
  }),
  z.object({
    type: z.literal("incrementVariable"),
    target: z.string().min(1),
    value: z.number(),
  }),
  z.object({
    type: z.literal("setFlag"),
    target: z.string().min(1),
    value: z.boolean(),
  }),
  z.object({
    type: z.literal("setVowState"),
    target: z.string().min(1),
    value: vowStateSchema,
  }),
  z.object({
    type: z.literal("setHiddenVariable"),
    target: z.string().min(1),
    value: variableValueSchema,
  }),
  z.object({
    type: z.literal("incrementHiddenVariable"),
    target: z.string().min(1),
    value: z.number(),
  }),
  z.object({
    type: z.literal("setHiddenFlag"),
    target: z.string().min(1),
    value: z.boolean(),
  }),
  z.object({
    type: z.literal("setBeliefVariable"),
    target: z.string().min(1),
    value: variableValueSchema,
  }),
  z.object({
    type: z.literal("incrementBeliefVariable"),
    target: z.string().min(1),
    value: z.number(),
  }),
  z.object({
    type: z.literal("setBeliefFlag"),
    target: z.string().min(1),
    value: z.boolean(),
  }),
  z.object({
    type: z.literal("setWorldFlag"),
    target: z.string().min(1),
    value: z.boolean(),
  }),
]);

export const choiceDefinitionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  nextSceneId: z.string().optional(),
  conditions: z.array(conditionSchema).optional(),
  consequences: z.array(consequenceSchema).optional(),
  personalityAppendConsequences: z
    .record(z.string(), z.array(consequenceSchema))
    .optional(),
  tags: z.array(z.string()).optional(),
  showWhenLocked: z.boolean().optional(),
});

export const sceneDefinitionSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  body: z.array(z.string()),
  choices: z.array(choiceDefinitionSchema),
  conditions: z.array(conditionSchema).optional(),
  isTerminal: z.boolean().optional(),
});

const worldlineBranchRefSchema = z.object({
  groupId: z.string().min(1),
  branchId: z.string().min(1),
});

export const endingDefinitionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.array(z.string()),
  conditions: z.array(conditionSchema),
  echoes: z.array(z.string()).optional(),
  worldFlags: z.record(z.string(), z.boolean()).optional(),
  priority: z.number().optional(),
  unlocks: z.array(z.string()).optional(),
  worldlineCommit: worldlineBranchRefSchema.optional(),
  worldConsequenceMarks: z.array(z.string().min(1)).optional(),
  closeHistoryMarks: z.array(z.string().min(1)).optional(),
});

const pressuredResolutionKindSchema = z.enum([
  "normal",
  "strained",
  "mutated",
  "forced",
]);

const pressuredPendingSignalSchema = z.object({
  type: z.string().min(1),
  payload: z.unknown().optional(),
});

const pressuredChoiceTierEffectSchema = z.object({
  choiceId: z.string().min(1),
  hide: z.boolean().optional(),
  disable: z.boolean().optional(),
  relabel: z.string().optional(),
  annotate: z.string().optional(),
});

const pressuredInspectTierSchema = z.object({
  whenGte: z.number(),
  sceneId: z.string().optional(),
  choiceEffects: z.array(pressuredChoiceTierEffectSchema).optional(),
  appendOnResolve: z.array(consequenceSchema).optional(),
  resolutionKind: pressuredResolutionKindSchema.optional(),
  pendingSignals: z.array(pressuredPendingSignalSchema).optional(),
});

const pressuredInspectVariableSchema = z.object({
  variableId: z.string().min(1),
  tiers: z.array(pressuredInspectTierSchema).min(1),
});

export const pressuredStoryConfigSchema = z.object({
  inspect: z.array(pressuredInspectVariableSchema),
});

const narrationLinesByResolutionSchema = z.object({
  normal: z.array(z.string()).optional(),
  strained: z.array(z.string()).optional(),
  mutated: z.array(z.string()).optional(),
  forced: z.array(z.string()).optional(),
});

const narrationLinesByArrivalSchema = z.object({
  free: z.array(z.string()).optional(),
  forced: z.array(z.string()).optional(),
  mutated: z.array(z.string()).optional(),
});

export const pressuredNarrationSchema = z.object({
  postChoiceByKind: narrationLinesByResolutionSchema.partial().optional(),
  postChoiceByChoice: z
    .record(z.string(), narrationLinesByResolutionSchema.partial())
    .optional(),
  sceneArrivalByKind: narrationLinesByArrivalSchema.partial().optional(),
});

const hiddenTruthFlagDefinitionSchema = z.object({
  id: z.string().min(1),
  initialValue: z.boolean(),
});

export const hiddenTruthDefinitionSchema = z.object({
  variables: z.array(variableDefinitionSchema).optional(),
  flags: z.array(hiddenTruthFlagDefinitionSchema).optional(),
});

const beliefFlagDefinitionSchema = z.object({
  id: z.string().min(1),
  initialValue: z.boolean(),
});

export const beliefDefinitionSchema = z.object({
  variables: z.array(variableDefinitionSchema).optional(),
  flags: z.array(beliefFlagDefinitionSchema).optional(),
});

const storyUnlockCategorySchema = z.enum([
  "open",
  "outcome_gated",
  "world_gated",
  "role_gated",
  "secret",
  "mutually_exclusive",
]);

const storyEraIdSchema = z.enum([
  "bc_mythic",
  "ancient_early_historical",
  "medieval_holy_arena_curse",
  "modern_fractured_court_media_ai",
  "near_future",
  "far_future_observer_alien",
  "side_slice_misc",
]);

const storyModuleTemplateIdSchema = z.enum([
  "narrative",
  "duel_tournament",
  "survival_instinct",
  "witness_interpretation",
  "distorted_perception",
  "observer_documentary",
  "slice_of_life_social",
]);

const storyAuthoringAvailabilitySchema = z.enum([
  "shipped",
  "in_dev",
  "concept",
]);

const storyEndingRequirementSchema = z.object({
  storyId: z.string().min(1),
  endingId: z.string().min(1),
});

const storyContinuationRefSchema = z.object({
  storyId: z.string().min(1),
  suggestedVariantId: z.string().optional(),
});

const storyWorldlineBranchRefSchema = z.object({
  groupId: z.string().min(1),
  branchId: z.string().min(1),
});

const storyPreDiscoverySurfacingSchema = z.enum(["hidden", "rumor", "teaser"]);

const storyListPresentationStyleSchema = z.enum(["standard", "secret"]);

export const storyDefinitionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  storyClass: storyClassSchema,
  description: z.string(),
  playerRole: z.string(),
  initialSceneId: z.string().min(1),
  playerTitle: z.string().optional(),
  playerSummary: z.string().optional(),
  playerRoleHint: z.string().optional(),
  playerUnlockHint: z.string().optional(),
  unlockHint: z.string().optional(),
  playerToneHint: z.string().optional(),
  rumorText: z.string().optional(),
  teaserTitle: z.string().optional(),
  teaserSummary: z.string().optional(),
  preDiscoverySurfacing: storyPreDiscoverySurfacingSchema.optional(),
  secretListHint: z.string().optional(),
  listPresentationStyle: storyListPresentationStyleSchema.optional(),
  continuationOf: storyContinuationRefSchema.optional(),
  playerContinuationHint: z.string().optional(),
  variantGroup: z.string().optional(),
  variantId: z.string().optional(),
  isHiddenUntilUnlocked: z.boolean().optional(),
  requiresEchoes: z.array(z.string()).optional(),
  excludesEchoes: z.array(z.string()).optional(),
  requiresFlags: z.array(z.string()).optional(),
  requiresAnyFlags: z.array(z.string()).optional(),
  requiresAnyWorldConsequenceMarks: z.array(z.string().min(1)).optional(),
  excludesFlags: z.array(z.string()).optional(),
  requiresEndings: z.array(storyEndingRequirementSchema).optional(),
  requiresUnlockedModuleIds: z.array(z.string()).optional(),
  requiresWorldlineBranch: storyWorldlineBranchRefSchema.optional(),
  excludesWorldlineBranches: z.array(storyWorldlineBranchRefSchema).optional(),
  requiresWorldConsequenceMarks: z.array(z.string().min(1)).optional(),
  excludesWorldConsequenceMarks: z.array(z.string().min(1)).optional(),
  blockedWhenHistoryClosed: z.array(z.string().min(1)).optional(),
  lockedUntilEchoes: z.array(z.string()).optional(),
  unlockCategory: storyUnlockCategorySchema.optional(),
  era: storyEraIdSchema.optional(),
  moduleTemplate: storyModuleTemplateIdSchema.optional(),
  authoringAvailability: storyAuthoringAvailabilitySchema.optional(),
  personalities: z.array(personalityDefinitionSchema).optional(),
  variables: z.array(variableDefinitionSchema),
  vows: z.array(vowDefinitionSchema).optional(),
  scenes: z.array(sceneDefinitionSchema),
  endings: z.array(endingDefinitionSchema),
  pressuredConfig: pressuredStoryConfigSchema.optional(),
  pressuredNarration: pressuredNarrationSchema.optional(),
  hiddenTruth: hiddenTruthDefinitionSchema.optional(),
  belief: beliefDefinitionSchema.optional(),
});

export type StoryDefinitionParsed = z.infer<typeof storyDefinitionSchema>;
