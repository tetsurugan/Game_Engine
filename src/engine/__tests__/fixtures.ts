import type {
  PersistedProfile,
  RuntimeProfileSnapshot,
  StoryDefinition,
  StoryRuntimeState,
} from "../types";

/** Empty profile suitable for gate tests. */
export function emptyProfile(): PersistedProfile {
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

/** Minimal valid story for surfacing / gate evaluation. */
export function minimalStory(
  overrides: Partial<StoryDefinition> = {},
): StoryDefinition {
  return {
    id: "fixture_story",
    title: "Fixture",
    storyClass: "stable",
    description: "Fixture description",
    playerRole: "Reader",
    initialSceneId: "sc_a",
    variables: [],
    scenes: [
      {
        id: "sc_a",
        body: ["A"],
        choices: [],
      },
      {
        id: "sc_b",
        body: ["B"],
        choices: [],
      },
    ],
    endings: [
      {
        id: "end_default",
        title: "End",
        body: [],
        conditions: [],
      },
    ],
    ...overrides,
  };
}

export function minimalRuntime(
  overrides: Partial<StoryRuntimeState> = {},
): StoryRuntimeState {
  return {
    storyId: "fixture_story",
    currentSceneId: "sc_a",
    variables: {},
    flags: {},
    vowStates: {},
    unlockedEchoes: [],
    endingId: null,
    history: [],
    ...overrides,
  };
}

/** Shallow snapshot for in-play condition tests (`profile.*` targets). */
export function profileSnapshot(
  overrides: Partial<RuntimeProfileSnapshot> = {},
): RuntimeProfileSnapshot {
  return {
    worldFlags: {},
    globalEchoes: [],
    completedEndings: {},
    unlockedModuleIds: [],
    ...overrides,
  };
}

/**
 * Minimal stable story with one choice `go_b`: sc_a → sc_b, increments `n`
 * by 2 unless overridden.
 */
export function progressionStory(
  overrides: Partial<StoryDefinition> = {},
): StoryDefinition {
  return minimalStory({
    variables: [{ id: "n", type: "number", initialValue: 0 }],
    scenes: [
      {
        id: "sc_a",
        body: [],
        choices: [
          {
            id: "go_b",
            text: "Advance",
            nextSceneId: "sc_b",
            consequences: [
              { type: "incrementVariable", target: "n", value: 2 },
            ],
          },
        ],
      },
      { id: "sc_b", body: [], choices: [] },
    ],
    ...overrides,
  });
}
