var router = require('koa-router')()

// policy
var isAuth = require('../policy/isAuth')


router.get('/', function*(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

router.post('parcel/add', require('../controller/ParcelController').add)

router.get('parcel/pass', isAuth, require('../controller/ParcelController').pass)
router.get('parcel/path/search', isAuth, require('../controller/ParcelController').search)
router.get('parcel/path/confirm', isAuth, require('../controller/ParcelPathController').confirm)
router.get('order/:id', isAuth, require('../controller/OrderController').id)

router.get('init/menu', require('../script/init/menu'))
router.get('init/station', require('../script/init/station'))

// router.get('FXBus/enroll', function*() { yield this.render('FXBus/enroll') })
// router.post('FXBus/enroll', require('../module/FXBus/FXController').enroll)
// router.get('GYS/verify', function*() { yield this.render('GYS/verify') })
// router.post('GYS/verify', require('../module/GYS/GYSController').verify)
// router.get('GYS/getCode', require('../module/GYS/GYSController').getCode)
// router.get('ShuttleBus/timetable', function*() { yield this.render('ShuttleBus/timetable') })

// router.get('init/autoReply', require('../script/init/autoReply'))
// router.get('init/fxBusSchedule', require('../script/init/fxBusSchedule'))
// router.get('init/shuttleBusSchedule', require('../script/init/shuttleBusSchedule'))
// router.get('init/fxBus', require('../script/init/fxBusUser'))
// router.get('init/gysUmbrella', require('../script/init/gysUmbrella'))
// router.get('init/gysUser', require('../script/init/gysUser'))

module.exports = router;
