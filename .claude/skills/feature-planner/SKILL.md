---
name: feature-planner
description: Use before implementing any feature or new API/GraphQL endpoint. Produces a scoped plan with file list, risks, and impact analysis before code is written.
context: fork
---

1. Query CodeGraph before opening any file:
   - `codegraph_impact` on the affected module
   - `codegraph_context` on related modules
2. Run repo-researcher if the domain is unfamiliar
3. Check `.claude/rules/architecture.md` for layering/boundary violations
4. Identify: Mongoose schema changes, new routes, validation, auth, test surface
5. Output (this format only):
   ## Plan (numbered steps)
   ## Files to Modify (path + one-line reason each)
   ## Files to Create
   ## Schema / DB Changes Required
   ## Risks
