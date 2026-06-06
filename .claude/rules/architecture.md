# Architecture Rules

Hard constraints for this codebase. These apply everywhere.

## Layering (REST domains)
- Flow per request: Route → Controller → Service → Repository → Model
- Controllers: parse req, call services, shape responses. No DB calls, no business rules.
- Services: business logic. Call repositories, never the Mongoose model directly.
- Repositories / `*Model.js`: the ONLY place that touches the database.
- Never skip a layer (e.g. controller calling the model).

## Wiring
- New REST domains go in `api/v1/<domain>/` and expose an `index.js` barrel `{ service, router }`.
- Register routers in `api/router.js` via `route.BaseRoute` + router.
- Middleware order is defined once in `config/appConfiguration.js` — change it there, not per-route.

## Datastore
- MongoDB/Mongoose (`config/db.js`) is the live datastore. `*Model.js` defines schemas.
- `models/` + `config/config.js` are Sequelize/MySQL scaffolding — do not assume they are active.

## Security / boundaries
- Auth is enforced by `middleware/authorization.js` (JWT). Protected routes use `isAuthorized`.
- Token sign/verify lives only in `middleware/tokenService.js`.
- Secrets/TLS (`config/*.key`, `*.crt`, `config/ssl/`, `.env`) are never read or printed.

## Errors & logging
- Throw/forward errors as `{ message, status }` via `next(...)`; `middleware/errorHandler.js` formats them.
- Log through winston (`config/logger.js`), not `console.log` (existing stray logs are legacy).
