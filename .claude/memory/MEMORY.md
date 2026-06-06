# Project Memory

## Decisions
- Dual ORM: `DB_TYPE` selects exactly one of Mongoose(`mongodb`) / Sequelize(`mysql`); only the active driver is required/connected (`config/db.js`). Still valid: yes
- REST router IS mounted via `myRouter(app)` in `config/appConfiguration.js` → `api/router.js`. Still valid: yes
- Repository abstracts the ORM: `api/v1/user/userRepository.js` exposes findAll/findOne/create for both backends; services/controllers stay ORM-agnostic. Still valid: yes
- HTTPS is optional and lazy — TLS only loaded when `HTTPS=true` (`config/socket.js`). Still valid: yes
- Env is validated at boot (`config/validateEnv.js`, called from `index.js`); missing APP_SECRET/PORT/DB_TYPE throws early. Still valid: yes

## Patterns
- REST domain layering → `api/v1/<domain>/`: Route → Controller → Service → Repository → Model
- Public vs guarded routes → register public routes (e.g. `/create`) BEFORE `router.all('*', isAuthorized)` in the route file
- Domain barrel → each `api/v1/<domain>/index.js` exports `{ service, router }`, consumed by `api/router.js`
- Client-safe output → controllers return `_.pick(doc.toJSON(), PUBLIC_FIELDS)`; works for Mongoose `_id` and Sequelize `id`
- Errors → forwarded as `next({ message, status })`, formatted (without mutating the error) by `middleware/errorHandler.js`
- Validation → Joi schemas via `Schema.validate()` (NOT the removed `Joi.validate()`); Ajv generic `validate` in `middleware/validator.js`

## Pitfalls
- Keep both ORM User models in sync: `api/v1/user/UserModel.js` (Mongoose) and `models/user.js` (Sequelize) must mirror fields
- TLS keys are gitignored + untracked; `config/ssl/{my-api.key,my-api.crt}` must exist on disk only when `HTTPS=true`
- ESLint is pinned to v8 (airbnb-base@15 does not support v9/flat-config); `.eslintrc.json` is the rc-format config
- Lazy `require()` in `config/db.js` / `userRepository.js` is intentional (per-ORM loading) — has an eslint-disable for `global-require`

## Known Issues
- GraphQL under `graphql/` is placeholder/example only (resolvers return stub strings) — not wired to real data. Status: open
- `npm audit` reports pre-existing transitive vulnerabilities (mostly via apollo-server-express 3 / older deps). Status: open
