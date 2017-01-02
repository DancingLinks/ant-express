var Order = require('../model/order')
var Parcel = require('../model/parcel')
var ParcelPath = require('../model/parcelPath')
var format = require('date-format')

module.exports = {
  index: function*() {

  },
  id: function*() {
    this.assert(this.params.id, 400, 'require id')
    var order = yield Order.findOne({_id: this.params.id})
    this.assert(this.user._id.equals(order.user), 401, 'unauthorized')
    var parcel = yield Parcel.findOne({_id: order.parcel})
    var parcelPath = yield ParcelPath.findOne({_id: order.parcelPath})
    yield this.render('order/item', {
      order: order,
      parcel: parcel,
      parcelPath: parcelPath,
      createdAt: format('yyyy-MM-dd hh:mm:ss', order.createdAt),
      updatedAt: format('yyyy-MM-dd hh:mm:ss', order.updatedAt)
    })
  }
}