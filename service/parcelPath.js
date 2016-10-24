var ParcelPath = require('../model/parcelPath')
var Order = require('../model/order')

module.exports = {
  confirm: function*(data) {
    this.assert(this.user, 401, 'invalid user')
    this.assert(data && data.id, 400, 'require id')

    var parcelPath = yield ParcelPath.findOne({_id: data.id}).populate('parcel')
    this.assert(parcelPath, 400, 'invalid id')
    this.assert(parcelPath.status == 'wait', 400, 'the path has been confirmed by other user')

    parcelPath.status = 'confirm'
    yield parcelPath.save()

    return yield Order.create({
      user: this.user,
      parcel: parcelPath.parcel,
      parcelPath: parcelPath,
      status: 'confirm',
      credit: 10
    })
  }
}