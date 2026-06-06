---
paths:
  - "**/*Model.js"
  - "**/*Repository.js"
  - "models/**"
  - "config/db.js"
  - "config/config.js"
---
# Database Rules
- DB access belongs ONLY in repositories (`*Repository.js`) and Mongoose models (`*Model.js`) — never in services or controllers.
- MongoDB/Mongoose is the live datastore (`config/db.js`); define schemas in `*Model.js`.
- `models/index.js` + `config/config.js` are Sequelize/MySQL scaffolding — confirm before treating as active; do not mix ORMs in one domain.
- Keep query logic behind repository methods (`findOne`, `findAll`, `create`, …); callers pass plain query objects.
- Enforce field constraints in the Mongoose schema (required/min/max/unique), mirroring the Joi validation.
