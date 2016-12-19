var router = require('koa-router')();
var MerchantController = require('../controller/MerchantController')

router.get('/', MerchantController.index)
router.get('/login', MerchantController.login)
router.post('/login', MerchantController.loginPost)
router.get('/signup', MerchantController.signup)
router.post('/signup', MerchantController.signupPost)
router.get('/info', MerchantController.info)

module.exports = router;
