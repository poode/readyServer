---
paths:
  - "**/*Test.js"
  - "**/*.test.js"
  - "**/*.spec.js"
---
# Test Rules
- Test runner is jest (`npx jest`). Existing tests use the `*Test.js` suffix (e.g. `userTest.js`, `LoginTest.js`) and sit beside the source file.
- Mock external dependencies (DB, network, JWT) in unit tests — never hit the live MongoDB.
- A test file mirrors the source file path and name.
- Cover auth failure paths (missing/invalid token → 403) for protected routes.
