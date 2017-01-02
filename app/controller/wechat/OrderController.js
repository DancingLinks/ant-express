var Order = require('../../model/order')
var format = require('date-format')
var auth = require('../../service/auth')

var generateResult = function (title, orders, list_url) {
  var result = [{
    title: title,
    picurl: 'http://qiniu.cdn.picfood.cn/ant-express/ant-express-banner.jpg',
    // url: list_url
  }]
  for (var i = 0, l = orders.length; i < l; ++i) {
    var order = orders[i]
    result.push({
      title: `${order.parcelPath.start} ➪ ${order.parcelPath.end}  ${format('MM月dd日')}`,
      picurl: 'http://qiniu.cdn.picfood.cn/ant-express/ant-express-small-logo.jpg',
      url: `https://ant-express.picfood.cn/order/${order._id}`
    })
  }
  // if (orders.length == 5) {
  //   result.push({
  //     title: '显示更多',
  //     picurl: 'http://qiniu.cdn.picfood.cn/ant-express/ant-express-small-logo.jpg',
  //     url: 'https://ant-express.picfood.cn/'
  //   })
  // }
  return result
}

module.exports = {
  confirmed: function*() {
    var orders = yield Order.find({user: this.wxuser, status: 'confirm'}).populate('parcel parcelPath').limit(5)
    var list_url = yield* auth.generateUrl.call(this, '/list/confirmed')
    this.body = generateResult('已接单的包裹', orders, list_url)
  },
    passing: function*() {
    var orders = yield Order.find({user: this.wxuser, status: 'passing'}).populate('parcel parcelPath').limit(5)
    var list_url = yield* auth.generateUrl.call(this, '/list/passing')
    this.body = generateResult('运送中的包裹', orders, list_url)
  },
  finished: function*() {
    var orders = yield Order.find({user: this.wxuser, status: 'finish'}).populate('parcel parcelPath').limit(5)
    var list_url = yield* auth.generateUrl.call(this, '/list/finished')
    this.body = generateResult('历史包裹', orders, list_url)
  }
}