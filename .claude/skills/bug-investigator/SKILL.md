---
name: bug-investigator
description: Use when tracing a bug or unexpected behavior in this server. Checks memory and runs CodeGraph trace before reading source files.
context: fork
---

1. Read `.claude/memory/MEMORY.md` — check if this issue is known
2. Run CodeGraph to trace before reading source:
   - `codegraph_search` to find the symbol in the error
   - `codegraph_trace` to trace the call path (request → controller → service → repository)
   - `codegraph_callers` to find upstream triggers
3. Read source files only for the symbols CodeGraph identified
4. Output (this format only):
   ## Root Cause
   ## Affected Files (paths only)
   ## Fix Recommendation
   ## Regression Risk
