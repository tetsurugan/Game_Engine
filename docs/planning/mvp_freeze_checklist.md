# MVP 0.1 — hard freeze checklist

**Purpose:** Repo-visible **boundary** for **version 0.1**. Stops **scope drift** and **new-lane creep** before release. If work is not on this list (or fails the scope guardrails), it is **frozen** until after 0.1 unless it is a **shipping blocker** fix.

**Doctrine stack:** [`design_doctrine.md`](design_doctrine.md) · [`branch_scope_doctrine.md`](branch_scope_doctrine.md) · [`story_registry.md`](story_registry.md)

---

## 1. What ships in MVP 0.1 (checklist)

Check these off when true. **0.1 content = the curated anthology slice below**, not “everything in the repo.”

### 1.1 Narrative modules (player-facing anthology)

- [ ] **`paladin_promise`** — mainline Paladin story (shipped)
- [ ] **Paladin proof / witness cluster** (shipped): e.g. **`paladin_proof_order_echo`**, **`paladin_proof_mercy_echo`**, **`paladin_what_walks_after_oath`**, **`paladin_witness_peace_lies`**, **`paladin_witness_broken_saint`** — as registered in [`story_registry.md`](story_registry.md)
- [ ] **`gyre_mythic_anchor`** — Gyre anchor proof (shipped)
- [ ] **`gyre_witness_survivor_aftermath`** — Survivor-family aftermath (shipped)
- [ ] **`verge_mara_anchor`** — Verge anchor proof (shipped)
- [ ] **`rumor_girl`** — modern grounded lane (shipped)
- [ ] **`court_aftermath`** — Rumor Girl record/witness aftermath consumer (shipped)

### 1.2 Core systems (engineering contract)

- [ ] **Engine:** conditions, consequences, choice/ending resolution, surfacing/gates, profile merges (echoes, flags, marks, unlocks), story-class hook seam (as used by shipped content)
- [ ] **Persistence:** `localStorage` profile (`pov.profile.v1`); load/save path stable for normal play
- [ ] **UI shell:** browse → intro → play → ending → profile; **no raw `storyClass`** on primary player path
- [ ] **`in_dev` labs** (e.g. belief lab, world consequence lab, pressured narration lab): may remain in codebase for **dev/smoke**; they are **not** part of the **0.1 player promise** unless promoted to `shipped` **and** added to §1.1 above **via this checklist** (discouraged during freeze)

### 1.3 Client quality baseline

- [ ] **Desktop browser:** playable end-to-end on primary flows
- [ ] **Mobile browser:** layout, tap targets, safe-area behavior **acceptable** (not necessarily perfect)
- [ ] **Light PWA:** manifest / install-ability where the OS allows; **no** requirement for offline/service worker in 0.1

### 1.4 Tooling gates (must pass for release)

- [ ] **`npm run build`** — clean (TypeScript + Vite production build)
- [ ] **`npm test`** — clean (Vitest)
- [ ] **`npm run lint`** — clean (or explicitly documented exceptions **only** for blockers)
- [ ] **`validateStoryRegistryAuthoring(storyRegistry)`** — **0 errors** in CI or pre-release check (warnings triaged)

### 1.5 Documentation / framing

- [ ] **README** states what the project is and how to run it; **no** implied roadmap that promises frozen items for 0.1
- [ ] **Registry / unlock / echoes** docs match **shipped** gates (no “ghost” shipping promises)

---

## 2. Explicitly frozen for post–0.1 (“not in 0.1”)

**Do not implement, promote to shipped, or sell as part of 0.1** without a formal **un-freeze** decision (new milestone, not this checklist).

- [ ] **Gyre Replacement line** / Replacement-family aftermath modules
- [ ] **Additional Gyre aftermaths** beyond **`gyre_witness_survivor_aftermath`** (no second slice for 0.1)
- [ ] **`rumor_girl_future_locked_prequel`** — implementation (concept docs may stay)
- [ ] **Verge succession / collapse tree** / full **`verge_clan_mara`** saga — any expansion beyond **`verge_mara_anchor`**
- [ ] **New Paladin modules** or Paladin “wave 2” content
- [ ] **New anchor worlds / eras** (no new mythic or clan epic lanes)
- [ ] **Observer / alien / far-future observer** modules
- [ ] **Duel / tournament / boxer / fight-club** demos as **shipped** shelf rows
- [ ] **Berserker / survival / possessed** template **demos** as **shipped** shelf rows
- [ ] **Full `witness` story-class handler** (beyond what shipped witness modules already need — **bugfix-only** if blocking)
- [ ] **Full `distorted` / `possessed` handlers** — **not** 0.1 requirements (lab-only unless blocker)
- [ ] **Major new engine systems** (new gate types, new persistence models, CMS, multiplayer, cloud save) — **forbidden** unless **unblock 0.1 ship** with minimal diff
- [ ] **Echo “spend” / consumption semantics** — design may exist; **not** 0.1 scope
- [ ] **Localization pipeline** — not 0.1
- [ ] **Debug inspector overlay** — nice-to-have; not 0.1 blocker

**Rule of thumb:** If it **opens a new lane** or **expands a concept row** into a **shipping** promise, it is **post-0.1**.

---

## 3. Quality gates (release bar)

### 3.1 Content quality

- [ ] Titles, intros, endings for **§1.1 modules** feel **intentional** (tone matches doctrine; no placeholder voice)
- [ ] No **accidental** “proof” copy that reads like **mock data** on the primary path
- [ ] **Hidden vs belief** tension is **preserved** where the design depends on it (no accidental flattening in player-facing blurbs)

### 3.2 Shelf / discovery quality

- [ ] **Rumor / teaser / locked** rows feel **curated** — copy matches surfacing state; no empty `rumorText` / teaser when that mode is used
- [ ] **Continuations** (e.g. `continuationOf`, hints) do not imply **unbuilt** sequels for frozen lanes
- [ ] **No ghost rows:** browse does not imply modules that are **concept-only** as if **shipped** (registry + `authoringAvailability` honest)

### 3.3 Stability

- [ ] **Profile persistence:** completing stories, flags, marks, echoes — **consistent** across refresh and re-entry (known schema/version limits documented if any)
- [ ] **No critical** runtime errors on happy paths through **§1.1** modules
- [ ] **Gate logic:** startable modules are startable **only** when intended; locked modules show **coherent** reasons (player-facing hints where authored)

### 3.4 Browser / mobile readiness

- [ ] **Readable** text and **tap-safe** controls on small viewports for **play** and **story select**
- [ ] **Safe-area** padding respected on notched devices where tested
- [ ] **Performance:** acceptable on a mid-tier phone browser for **text-heavy** play (no mandatory fix for jank unless blocker)

### 3.5 Release framing

- [ ] **README + planning** do not **oversell** frozen content
- [ ] **CHANGELOG / version tag** plan: 0.1 = this checklist satisfied (process up to maintainers)

---

## 4. Scope guardrails — is this work allowed before 0.1?

Answer **yes** to **at least one** of the following, or **stop** (or defer to post-0.1).

| # | Question | If “no” → |
|---|----------|-----------|
| G1 | Does this **directly help ship 0.1** as defined in §1? | Freeze |
| G2 | Is this **fixing or polishing existing §1.1 content** (copy, gates, bugs, tests), **not** opening a new lane? | If new lane → freeze |
| G3 | Could this be solved with **polish, copy, or shelf/registry cleanup** instead of new systems or modules? | Prefer polish; freeze expansion |
| G4 | Is this a **tooling/build/test** fix required for §1.4? | Allow |
| G5 | Is this a **post-0.1 idea pretending to be urgent** (cool sequel, new era, “small” new anchor)? | Freeze |

**Blunt rule:** **New module ids** or **new shipped rows** are **presumed forbidden** during freeze unless you can mark **G1 + G2** with a straight face **and** you add them to §1.1 **explicitly** (exception: **unblocker** only, minimal scope).

---

## 5. MVP decision rule (0.1 is “ready” when…)

**0.1 is ready to release when:**

1. **§1** is **checked** (or consciously waived with written rationale — not recommended).
2. **§3** quality gates are **met** at the bar the team agrees is “good enough” for a **first anthology slice**.
3. **§2** remains **respected** — no active work **opening major new lanes** at ship time.
4. The **shelf** tells one **coherent** story: *this engine holds a **defined** set of proofs; more is **explicitly later**.*

**Ship ≠ stop improving.** After 0.1, use a **new milestone** to un-freeze items from §2.

---

## 6. Maintenance

- **Update this file** only when **0.1 scope truly changes** (rare) or when **checklist sections** need clearer wording — not for every PR.
- **Link** this doc from handoff and backlog when priorities shift; **do not** duplicate long scope lists elsewhere.

---

*This document is control doctrine, not player-facing canon.*
