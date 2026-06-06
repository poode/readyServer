---
paths:
  - "api/**"
  - "graphql/**"
  - "middleware/**"
---
# API & Middleware Rules
- Validate inputs at the boundary: Joi (`*Validation.js`) or the Ajv `validate` middleware — not inside services.
- Controllers stay thin: no DB access, no business logic (that belongs in the service).
- Protected routes must pass through `isAuthorized` (`middleware/authorization.js`); add 401/403 handling for new auth paths.
- Use `express-promise-router`; bind controller methods with `.bind(Controller)`.
- Forward errors with `next({ message, status })` — do not send ad-hoc error JSON.
- New domains expose an `index.js` barrel `{ service, router }` and register in `api/router.js`.
- GraphQL schema/resolver pairs live in `graphql/<domain>/` and merge via `graphql/appSchema.js` + `appResolver.js`.
