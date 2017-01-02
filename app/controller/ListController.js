var Order = require('../model/order')
var format = require('date-format')

module.exports = {
  confirmed: function*() {
    var orders = yield Order.find({user: this.user, status: 'confirm'}).populate('parcel parcelPath').limit(5)
    var result = []
    for (var i = 0, l = orders.length; i < l; ++i) {
      var order = orders[i]
      result.push({
        desc: `${order.parcelPath.start} ➪ ${order.parcelPath.end}  ${format('MM月dd日')}`,
        url: `https://ant-express.picfood.cn/order/${order._id}`
      })
    }
    yield this.render('list/confirmed', {result: result})
  },
  passing: function*() {
    var orders = yield Order.find({user: this.user, status: 'passing'}).populate('parcel parcelPath').limit(5)
    this.body = {
      title: 'passing',
      user: this.user
    }
  },
  finished: function*() {
    var orders = yield Order.find({user: this.user, status: 'finish'}).populate('parcel parcelPath').limit(5)
    this.body = {
      title: 'finished',
      user: this.user
    }
  }
}