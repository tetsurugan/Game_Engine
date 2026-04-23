import type { Consequence, StoryRuntimeState, VariableValue } from "./types";

/**
 * Applies a list of consequences to a runtime state, returning a new state.
 * The input state is not mutated.
 */
export function applyConsequences(
  state: StoryRuntimeState,
  consequences: Consequence[] | undefined,
): StoryRuntimeState {
  if (!consequences || consequences.length === 0) return state;

  const nextHiddenVars: Record<string, VariableValue> = {
    ...(state.hiddenTruth?.variables ?? {}),
  };
  const nextHiddenFlags: Record<string, boolean> = {
    ...(state.hiddenTruth?.flags ?? {}),
  };
  let hiddenTouched = false;

  const nextBeliefVars: Record<string, VariableValue> = {
    ...(state.belief?.variables ?? {}),
  };
  const nextBeliefFlags: Record<string, boolean> = {
    ...(state.belief?.flags ?? {}),
  };
  let beliefTouched = false;

  const next: StoryRuntimeState = {
    ...state,
    variables: { ...state.variables },
    flags: { ...state.flags },
    vowStates: { ...state.vowStates },
  };

  for (const c of consequences) {
    switch (c.type) {
      case "setVariable":
        next.variables[c.target] = c.value;
        break;
      case "incrementVariable": {
        const current = next.variables[c.target];
        const base = typeof current === "number" ? current : 0;
        next.variables[c.target] = base + c.value;
        break;
      }
      case "setFlag":
        next.flags[c.target] = c.value;
        break;
      case "setVowState":
        next.vowStates[c.target] = c.value;
        break;
      case "setHiddenVariable":
        hiddenTouched = true;
        nextHiddenVars[c.target] = c.value;
        break;
      case "incrementHiddenVariable": {
        hiddenTouched = true;
        const current = nextHiddenVars[c.target];
        const base = typeof current === "number" ? current : 0;
        nextHiddenVars[c.target] = base + c.value;
        break;
      }
      case "setHiddenFlag":
        hiddenTouched = true;
        nextHiddenFlags[c.target] = c.value;
        break;
      case "setBeliefVariable":
        beliefTouched = true;
        nextBeliefVars[c.target] = c.value;
        break;
      case "incrementBeliefVariable": {
        beliefTouched = true;
        const current = nextBeliefVars[c.target];
        const base = typeof current === "number" ? current : 0;
        nextBeliefVars[c.target] = base + c.value;
        break;
      }
      case "setBeliefFlag":
        beliefTouched = true;
        nextBeliefFlags[c.target] = c.value;
        break;
    }
  }

  if (state.hiddenTruth || hiddenTouched) {
    next.hiddenTruth = {
      variables: nextHiddenVars,
      flags: nextHiddenFlags,
    };
  }

  if (state.belief || beliefTouched) {
    next.belief = {
      variables: nextBeliefVars,
      flags: nextBeliefFlags,
    };
  }

  return next;
}
