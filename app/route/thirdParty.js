var router = require('koa-router')()

var merchantPolicy = require('../middleware/api/merchant')

router.post('/getAccessToken', require('../controller/third-party/AuthController').getAccessToken)
router.post('/parcel/add', merchantPolicy, require('../controller/third-party/ParcelController').add)
router.post('/order/pass', merchantPolicy, require('../controller/third-party/OrderController').pass)
router.post('/order/finish', merchantPolicy, require('../controller/third-party/OrderController').finish)

module.exports = router;
