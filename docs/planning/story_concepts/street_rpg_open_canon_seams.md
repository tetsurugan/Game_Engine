# Street RPG — Open Canon Seams (false-canon prevention)
**Purpose:** Record **unresolved** or **deliberately open** questions so POV integration does **not** hard-code one competing draft as “the” canon by accident.
For each seam: **competing versions** → **what implementation touches** → **recommendation**.
---
| Seam | Competing versions | Affected systems | Recommendation |
|------|-------------------|------------------|----------------|
| **When Rocket knows Travis is his son** | (a) Final moments only. (b) Dawning suspicion earlier + **letter** in `THE_PATRICIDE_COMPLETE` that he **found out about the boy**. | Cutscenes, letter asset, save flags, MC1 **flashback** order | **Lock** before final VO / letter pipeline; or **lock** which **ending family** the build targets. |
| **Rocket’s death** | (a) **True** public death, aftermath is grief truth. (b) **Staged** + Round Table in `SECRET_ENDING_REFINED` / `MASTER`. (c) **Construct** as continued presence. | Death flags, **NG+**, **boss** availability, **epilogue** | **Core integration:** default to **spine-agnostic** flag `rocket_publicly_dead: true` with **optional** `systemic_layer_unlocked`. **Keep** transcendence **open** or **separate** **SKU** / **content pack** until design locks. |
| **Round Table scale** | e.g. **6** in `FACTION_DYNAMICS` vs **13** in `MASTER` | Faction UI, codex, boss arena scope | **Defer** or **abstract** to “shadow coordination” in core; **lock** for lore-heavy release. |
| **MC2 gender** | Fixed **male** in `character_names` vs **flex** section same file | Pronouns, art, **voice** | **Lock** for a **content** **slice**; or implement **one** **canonical** **path** **first**. |
| **Time jump** | “**Six months later**” vs other skips (`GAME_STRUCTURE` / `PATRICIDE`) | Chapter headers, **aging** | **Lock** as presentation string; low risk. |
| **Travis’s recognition timing** | **Instant** at kill (quote + “son” in `THE_PATRICIDE_COMPLETE`) vs **gradual** investigation-only in other docs | **Tutorial** **guilt** **curves** | **Lock** per **act** **design** **—** don’t **mix** **without** **player-facing** **label** (e.g. “some truths delayed”). |
| **Public vs additive secret** | `ENDING_VARIANTS` says secret **enriches** standard without changing **core**; other docs add **wipe** / **reality** **blur** | Save schema, “true ending” **definition** | **Document** which **endings** are **layers** in `street_rpg_aftermath_families.md`; **don’t** **merge** **flags** **blindly**. |
---
**Guidance for POV**
- **Branch scope:** Do **not** **commit** the repo to **all** **aftermath** **variants** at once; **families** first.  
- **World connection:** Street RPG is an **add-on** **anchor**; **cross-lane** links are **opt-in** **stubs** only.  
- **Personality continuity:** Rocket vs Construct **differ** in **voice** **rules** — **don’t** **collapse** **until** **canon** **chooses** **one** **reality** **per** **save**.  
- **Relational verdicts:** Elena / David / Steady **verdicts** **scale** with **redemption** **family**; **Cog** **family** **aborts** **most** **positive** **verdict** **threads**.
**Next step:** **Canon council** (or lead) **ticks** each seam **: locked** | **optional** **layer** | **deferred**.
---
*Updates here should be mirrored in `story_registry.md` when a seam locks.*
