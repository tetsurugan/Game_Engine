import type {
  Condition,
  ConditionOperator,
  RuntimeProfileSnapshot,
  StoryRuntimeState,
} from "./types";

/**
 * Resolves a dotted target path against runtime state and optional persisted
 * profile snapshot (`profile.*` targets require the snapshot).
 *
 * Hidden truth: `hidden.variables.<id>`, `hidden.flags.<id>` reads
 * `state.hiddenTruth` (objective layer). Belief: `belief.variables.*`,
 * `belief.flags.*` reads `state.belief` (POV inference). Visible:
 * `variables.*`, `flags.*`.
 */
export function resolveTarget(
  state: StoryRuntimeState,
  target: string,
  profileSnapshot?: RuntimeProfileSnapshot,
): unknown {
  const parts = target.split(".");

  if (parts[0] === "profile") {
    if (!profileSnapshot) return undefined;
    const bucket = parts[1];
    if (bucket === "worldFlags" && parts.length >= 3) {
      const id = parts.slice(2).join(".");
      return profileSnapshot.worldFlags[id] ?? false;
    }
    if (bucket === "globalEchoes" && parts.length === 2) {
      return profileSnapshot.globalEchoes;
    }
    if (bucket === "completedEndings" && parts.length >= 3) {
      const storyId = parts.slice(2).join(".");
      return profileSnapshot.completedEndings[storyId] ?? [];
    }
    if (bucket === "unlockedModuleIds" && parts.length === 2) {
      return profileSnapshot.unlockedModuleIds;
    }
    return undefined;
  }

  if (target === "personality") return state.personalityId;
  if (target === "echoes") return state.unlockedEchoes;
  if (target === "ending") return state.endingId;
  if (target === "scene") return state.currentSceneId;

  if (parts[0] === "hidden" && parts.length >= 3) {
    const bucket = parts[1];
    const id = parts.slice(2).join("."); // allow ids with dots (rare)
    const ht = state.hiddenTruth;
    if (bucket === "variables") return ht?.variables[id];
    if (bucket === "flags") return ht?.flags[id] ?? false;
    return undefined;
  }

  if (parts[0] === "belief" && parts.length >= 3) {
    const bucket = parts[1];
    const id = parts.slice(2).join(".");
    const bel = state.belief;
    if (bucket === "variables") return bel?.variables[id];
    if (bucket === "flags") return bel?.flags[id] ?? false;
    return undefined;
  }

  const [namespace, key] = parts;
  if (!key) return undefined;

  switch (namespace) {
    case "variables":
      return state.variables[key];
    case "flags":
      return state.flags[key] ?? false;
    case "vows":
      return state.vowStates[key];
    default:
      return undefined;
  }
}

function compare(
  left: unknown,
  operator: ConditionOperator,
  right: unknown,
): boolean {
  switch (operator) {
    case "eq":
      return left === right;
    case "neq":
      return left !== right;
    case "gt":
      return typeof left === "number" && typeof right === "number"
        ? left > right
        : false;
    case "gte":
      return typeof left === "number" && typeof right === "number"
        ? left >= right
        : false;
    case "lt":
      return typeof left === "number" && typeof right === "number"
        ? left < right
        : false;
    case "lte":
      return typeof left === "number" && typeof right === "number"
        ? left <= right
        : false;
    case "includes":
      if (Array.isArray(left)) return left.includes(right as never);
      if (typeof left === "string")
        return left.includes(String(right));
      return false;
    default:
      return false;
  }
}

export function evaluateCondition(
  state: StoryRuntimeState,
  condition: Condition,
  profileSnapshot?: RuntimeProfileSnapshot,
): boolean {
  const left = resolveTarget(state, condition.target, profileSnapshot);
  return compare(left, condition.operator, condition.value);
}

/**
 * Conditions combine with AND semantics by default. Absent or empty arrays
 * are treated as "always true".
 */
export function evaluateConditions(
  state: StoryRuntimeState,
  conditions: Condition[] | undefined,
  profileSnapshot?: RuntimeProfileSnapshot,
): boolean {
  if (!conditions || conditions.length === 0) return true;
  return conditions.every((c) => evaluateCondition(state, c, profileSnapshot));
}
