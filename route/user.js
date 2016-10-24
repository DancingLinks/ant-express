var router = require('koa-router')();
var UserController = require('../controller/UserController')

router.get('/', UserController.index);
router.get('/auth', UserController.auth)
router.get('/oauth', UserController.oauth)

module.exports = router;
