---
name: session-start
description: Use at the start of every new session to restore context efficiently. Reads memory and maps without scanning source files.
---

1. Read `.claude/memory/MEMORY.md` — what was learned in past sessions
2. Read `docs/repository-map.md` — where everything lives
3. Read `.claude/rules/architecture.md` — hard constraints
4. State: what you know, what domain today's task is in, what you need
5. Do NOT open any source files during this step
6. Do NOT run CodeGraph queries during this step unless asked
