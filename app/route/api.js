var router = require('koa-router')();
var UserController = require('../controller/api/UserController')
var ParcelController = require('../controller/api/ParcelController')
var ParcelPathController = require('../controller/api/ParcelPathController')
var OrderController = require('../controller/api/OrderController')

// policy
var isAuth = require('../policy/isAuth')

router.get('/user/getSMSCode', UserController.getSMSCode)
router.post('/user/signup', UserController.signup)
router.post('/user/login', UserController.login)
router.get('/user/logout', UserController.logout)
router.get('/user/info', UserController.info)

router.get('/user/test', UserController.test)

router.get('/parcel/path/search', isAuth, ParcelPathController.search)
router.get('/parcel/path/confirm', isAuth, ParcelPathController.confirm)
router.get('/order/:id', isAuth, OrderController.id)
router.get('/order/confirmed', isAuth, OrderController.confirmed)
router.get('/order/passing', isAuth, OrderController.passing)
router.get('/order/finished', isAuth, OrderController.finished)

module.exports = router;
