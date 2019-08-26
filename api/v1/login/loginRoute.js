const router = require('express-promise-router')();

const { index } = require('./LoginController');
const { authRoute } = require('../../router/appRouteList');

const { root } = authRoute;

router.post(root, index);

module.exports = router;
