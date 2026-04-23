import { afterEach, describe, expect, it, vi } from "vitest";
import * as storyClassRegistry from "../storyClassRegistry";
import { resolveEnding } from "../endingResolver";
import type { StoryDefinition } from "../types";
import { minimalRuntime, minimalStory, profileSnapshot } from "./fixtures";

describe("resolveEnding", () => {
  it("returns the highest-priority matching ending when several match", () => {
    const story: StoryDefinition = minimalStory({
      endings: [
        {
          id: "end_low",
          title: "Low",
          body: [],
          conditions: [],
          priority: 0,
        },
        {
          id: "end_high",
          title: "High",
          body: [],
          conditions: [],
          priority: 10,
        },
      ],
    });
    const state = minimalRuntime({ currentSceneId: "sc_a" });

    const picked = resolveEnding(story, state);
    expect(picked?.id).toBe("end_high");
  });

  it("returns null when no ending conditions match", () => {
    const story: StoryDefinition = minimalStory({
      endings: [
        {
          id: "end_never",
          title: "Never",
          body: [],
          conditions: [
            {
              target: "variables.x",
              operator: "eq",
              value: 999,
            },
          ],
        },
      ],
    });
    const state = minimalRuntime({ variables: { x: 0 } });

    expect(resolveEnding(story, state)).toBeNull();
  });

  it("evaluates ending conditions with RuntimeProfileSnapshot when provided", () => {
    const story: StoryDefinition = minimalStory({
      endings: [
        {
          id: "end_gated",
          title: "Gated",
          body: [],
          conditions: [
            {
              target: "profile.completedEndings.prior",
              operator: "includes",
              value: "done",
            },
          ],
        },
      ],
    });
    const state = minimalRuntime();

    expect(resolveEnding(story, state)).toBeNull();
    expect(
      resolveEnding(
        story,
        state,
        profileSnapshot({
          completedEndings: { prior: ["done"] },
        }),
      )?.id,
    ).toBe("end_gated");
  });

  it("uses beforeEndingResolve endingPriorityDelta to reorder winners", () => {
    vi.spyOn(storyClassRegistry, "getStoryClassHandler").mockImplementation(
      () => ({
        beforeEndingResolve: () => ({
          endingPriorityDelta: { end_low: 100 },
        }),
      }),
    );

    const story: StoryDefinition = minimalStory({
      endings: [
        {
          id: "end_low",
          title: "Low",
          body: [],
          conditions: [],
          priority: 0,
        },
        {
          id: "end_high",
          title: "High",
          body: [],
          conditions: [],
          priority: 10,
        },
      ],
    });
    const state = minimalRuntime({ currentSceneId: "sc_a" });

    expect(resolveEnding(story, state)?.id).toBe("end_low");
  });

  it("uses beforeEndingResolve evaluationState for condition checks", () => {
    vi.spyOn(storyClassRegistry, "getStoryClassHandler").mockImplementation(
      () => ({
        beforeEndingResolve: (ctx) => ({
          evaluationState: {
            ...ctx.runtime,
            variables: { ...ctx.runtime.variables, x: 0 },
          },
        }),
      }),
    );

    const story: StoryDefinition = minimalStory({
      endings: [
        {
          id: "end_small",
          title: "Small x",
          body: [],
          conditions: [
            { target: "variables.x", operator: "lte", value: 5 },
          ],
          priority: 0,
        },
        {
          id: "end_big",
          title: "Big x",
          body: [],
          conditions: [
            { target: "variables.x", operator: "gte", value: 10 },
          ],
          priority: 0,
        },
      ],
    });
    const state = minimalRuntime({ variables: { x: 20 } });

    expect(resolveEnding(story, state)?.id).toBe("end_small");
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
