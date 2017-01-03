var router = require('koa-router')()

// policy
var isAuth = require('../policy/isAuth')


router.get('/', function*(next) {
  yield this.render('index', {
    title: 'Ant Express'
  });
});

router.get('parcel/pass', isAuth, require('../controller/ParcelController').pass)
router.get('parcel/path/search', isAuth, require('../controller/ParcelController').search)
router.get('parcel/path/confirm', isAuth, require('../controller/ParcelPathController').confirm)
router.get('order/:id', isAuth, require('../controller/OrderController').id)

router.get('list/confirmed', require('../controller/ListController').confirmed)
router.get('list/passing', require('../controller/ListController').passing)
router.get('list/finished', require('../controller/ListController').finished)

router.get('init/menu', require('../script/init/menu'))
router.get('init/station', require('../script/init/station'))

router.get('test/auth', require('../controller/TestController').auth)

// router.get('init/autoReply', require('../script/init/autoReply'))

module.exports = router;
