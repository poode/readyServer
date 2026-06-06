---
name: refactor-planner
description: Use when asked to refactor a module in this server. Runs full impact analysis with CodeGraph before producing a phased plan. Never produces code directly.
context: fork
disable-model-invocation: true
---

1. Run `codegraph_impact` on the target module — full dependency map
2. Run `codegraph_callers` on every exported symbol being changed
   (watch the `index.js` barrels and `api/router.js` wiring)
3. Identify interface/contract changes and their downstream effects
4. Assess: one session vs phased (use phases if >5 files affected)
5. Output (this format only):
   ## Impact Map
   ## Phased Plan (phase title + file list per phase)
   ## Risk Per Phase
   ## Rollback Strategy
