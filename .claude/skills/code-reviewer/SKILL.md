---
name: code-reviewer
description: Use when reviewing a diff or completed implementation in this server for layering violations, DB-access-in-wrong-layer, auth gaps, and known pitfalls.
---

1. Read `.claude/memory/MEMORY.md` — known patterns and past violations
2. Read `.claude/rules/architecture.md`
3. Use `codegraph_impact` to check if changed symbols affect other modules
4. Check: layer boundary violations (DB in controller/service), missing `isAuthorized`,
   ad-hoc error JSON instead of `next({message,status})`, missing input validation,
   `console.log` instead of winston, secrets/TLS exposure
5. Output (this format only):
   ## Summary
   ## Violations (file:line — specific)
   ## Suggestions
   ## Decision: Approved / Needs Changes
