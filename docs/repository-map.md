# Repository Map

Express REST + Apollo GraphQL server. CommonJS (`require`), no build step.
Entry: `index.js` → `config/socket.js` (creates app/servers) → `config/appConfiguration.js` (wires middleware) → `api/router.js`.

```
index.js              → Bootstrap: dotenv, cluster fork (prod), http/https start, socket test handlers
api/
  router.js           → Mounts versioned domain routers under SERVER_ROOT_URL
  v1/
    user/             → User domain. Layers: Controller → Service → Repository → Model (mongoose)
                        Files: UserController, userService, userRepository, UserModel, userRoute, userValidation, index (barrel), userTest
    login/            → Auth domain (JWT login). Controller → Service. Files mirror user/ (no Model/Repository)
graphql/
  index.js            → Apollo schema/resolver assembly. appSchema + appResolver merge login/ + user/
  login/, user/       → Per-domain schema.js + resolver.js  (example/demo, not wired to live data)
config/
  socket.js           → Builds express app, http+https servers, socket.io instances
  appConfiguration.js → Central middleware pipeline + root route + 404 + errorHandler
  db.js               → connectDatabase(): connects Mongoose OR Sequelize based on DB_TYPE
  config.js           → Sequelize config (used when DB_TYPE=mysql and by sequelize-cli)
  validateEnv.js      → fail-fast validation of required env vars, called at boot
  logger.js           → winston logger (exports { logger })
  ssl/                → TLS material for HTTPS (untracked/gitignored — provide your own; DENIED from Read)
middleware/           → authorization (JWT), cors, helmet, rateLimiter, tooBusy, translator (i18n),
                        validator (Ajv), tokenService (jwt sign/verify), errorHandler, errorLogger,
                        logHandler (morgan), graphql (Apollo mount)
models/
  index.js            → Sequelize model loader (active when DB_TYPE=mysql); factory-style models
  user.js             → Sequelize User model — mirrors api/v1/user/UserModel.js (Mongoose)
translations/         → i18n locale JSON (currently empty)
util/
  simpleLog.js        → slog helper
  PaginationUtil/     → pagination helper
  rateLimiterUtilities/ → expressRateLimiter + in-memory store
  cli/secretGenerator/  → `npm run secret` — generates APP_SECRET
docs/                 → AI context layer (this map, architecture summaries)
.claude/              → Claude config: rules, skills, agents, memory
```
