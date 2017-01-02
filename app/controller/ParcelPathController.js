var ParcelPathService = require('../service/parcelPath')

module.exports = {
  confirm: function*() {
    var order = yield* ParcelPathService.confirm.call(this, this.request.query)
    this.redirect(`/order/${order._id}`)
  }
}