var Order = require('../../model/order')
var Parcel = require('../../model/parcel')
var ParcelPath = require('../../model/parcelPath')

module.exports = {
  id: function*() {
    this.assert(this.params.id, 400, 'require id')
    var order = yield Order.findOne({_id: this.params.id})
    this.assert(this.user._id.equals(order.user), 401, 'unauthorized')
    var parcel = yield Parcel.findOne({_id: order.parcel})
    var parcelPath = yield ParcelPath.findOne({_id: order.parcelPath})
    this.body = {result: {order: order, parcel: parcel, parcelPath: parcelPath}}
  },
  confirmed: function*() {
    var order = yield Order.find({user: this.user, status: 'confirm'}).populate('parcel parcelPath')
    this.body = {result: order}
  },
  passing: function*() {
    var order = yield Order.find({user: this.user, status: 'passing'}).populate('parcel parcelPath')
    this.body = {result: order}
  },
  finished: function*() {
    var order = yield Order.find({user: this.user, status: 'finish'}).populate('parcel parcelPath')
    this.body = {result: order}
  }
}