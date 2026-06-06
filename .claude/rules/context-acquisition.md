# Context Acquisition Rules

These apply to every session and every subagent.

## Order of Operations — always follow this sequence
1. `.claude/memory/MEMORY.md`         ← check before any analysis
2. `docs/repository-map.md`           ← locate the module
3. `.claude/rules/architecture.md`    ← check constraints
4. CodeGraph query                    ← map symbols and dependencies
5. Source files                       ← only what CodeGraph couldn't answer

## CodeGraph — use before opening any file
| Intent                      | Tool                  |
|-----------------------------|-----------------------|
| Find a symbol               | codegraph_search      |
| Map a module / area         | codegraph_context     |
| Survey related symbols      | codegraph_explore     |
| Trace a call path X→Y       | codegraph_trace       |
| Find callers of a function  | codegraph_callers     |
| Find what a function calls  | codegraph_callees     |
| Plan a change safely        | codegraph_impact      |
| Read one symbol's source    | codegraph_node        |

Treat `codegraph_node` output as already read — do not re-open the file.
Run `codegraph sync` if a symbol cannot be found (index may be stale).

## Forbidden patterns
- Never recursively read a directory to understand structure — use the map + CodeGraph.
- Never open a file when CodeGraph can answer the question.
- Never re-analyze something already in MEMORY.md or docs/.
- Never load all skills — only the one relevant to the current task.
- Never carry research file-reads into implementation context.
- Never read denied paths (`config/*.key`, `*.crt`, `config/ssl/`, `.env`, logs).

## When to fork into a subagent (context: fork)
Use isolation when the task:
- Is research/investigation (output is a report, not code)
- Would open more than 3–4 files
- Involves a domain you haven't worked in this session
- Produces output (logs, test results) you won't reference again

## Compaction discipline
- /compact after every research phase before implementation.
- Keep: architecture decisions, file paths, the plan.
- Drop: file contents, search results, intermediate reasoning.
- If context exceeds 70%: /compact immediately.
