import { describe, expect, it } from "vitest";
import { createEmptyPersistedProfile } from "../storage";

describe("createEmptyPersistedProfile", () => {
  it("matches persisted shape used after erase and failed loads", () => {
    const p = createEmptyPersistedProfile();
    expect(p.globalEchoes).toEqual([]);
    expect(p.completedEndings).toEqual({});
    expect(p.worldFlags).toEqual({});
    expect(p.unlockedModuleIds).toEqual([]);
    expect(p.worldlineBranches).toEqual({});
    expect(p.worldConsequenceMarks).toEqual([]);
    expect(p.closedHistoryMarks).toEqual([]);
    expect(p.lastRuntime).toBeNull();
  });
});
