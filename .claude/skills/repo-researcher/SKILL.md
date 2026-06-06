---
name: repo-researcher
description: Use when asked to explore, understand, or map an unfamiliar module or domain in this Express/GraphQL server before implementing. Queries CodeGraph before opening files.
context: fork
---

1. Query CodeGraph FIRST — no file reads until CodeGraph is exhausted:
   - `codegraph_search` to locate the symbol or entry point
   - `codegraph_context` to map the module boundary
   - `codegraph_explore` to survey related symbols
2. Read `docs/repository-map.md` for file locations
3. Read `.claude/rules/architecture.md` for constraints
4. Open source files ONLY if CodeGraph is insufficient
5. Output (this format only):
   ## Findings
   ## Relevant Files (paths, no content)
   ## Constraints That Apply
   ## Recommendation
