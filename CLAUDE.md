# Express Ready Server

Reusable Express + GraphQL server boilerplate (`express-ready-server` v2.1.0).

## Stack
- Runtime:   Node.js, CommonJS (`require`), no build/transpile step
- HTTP:      Express 4 + apollo-server-express (GraphQL)
- Realtime:  socket.io (http & https; not cluster-safe — known issue, needs redis adapter)
- Database:  MongoDB (Mongoose) or MySQL (Sequelize), selected by `DB_TYPE`; exactly one active per run (`config/db.js`)
- Auth:      jsonwebtoken (JWT) + bcrypt
- Validation: Joi (domain schemas) + Ajv (`middleware/validator.js`)
- Security:  helmet, cors, express-rate-limit, toobusy-js
- Logging:   winston (`config/logger.js`) + morgan
- i18n:      i18n-express (translations in `req.app.locals.trans`)
- Lint:      ESLint (airbnb-base). Tests: jest (devDep)

## Structure
@docs/repository-map.md

## Architecture Rules
@.claude/rules/architecture.md

## Conventions
- REST domains live in `api/v1/<domain>/`, layered Controller → Service → Repository → Model
- Each domain has an `index.js` barrel exporting `{ service, router }`
- Routes use `express-promise-router`; controller methods bound with `.bind(Controller)`
- Domain validation uses Joi schemas (`*Validation.js`)
- Config is read from `process.env` (dotenv); `HTTPS` env is a string, `JSON.parse` it

## Commands
- Install: `npm i`
- Dev:     `npm run dev`   (nodemon)
- Start:   `npm run start`
- Secret:  `npm run secret`  (generates APP_SECRET)
- Test:    `npx jest`

## Never
- Never read TLS/secret files: `config/*.key`, `config/*.crt`, `config/ssl/**`, `.env`
- Never put DB access in controllers or services — only in repositories / `*Model.js`
- Never commit a real `.env` (only `.env.example` is tracked)
- Never load both ORMs at once — `DB_TYPE` selects exactly one (`mongodb` | `mysql`)

## Compact Instructions
- After any research phase, /compact keeping only the plan
- Preserve: architecture decisions, file paths, task scope
- Drop: file contents, search results, intermediate reasoning

## CodeGraph
- Query CodeGraph before opening any file (see @.claude/rules/context-acquisition.md)
- Run `codegraph sync` if a symbol cannot be found (index may be stale)
