var Merchant = require('../model/merchant')
var debug = require('../service/debug')

module.exports = function*(next) {
  if (this.session.merchant_id) {
    this.merchant = yield Merchant.findOne({_id: this.session.merchant_id})
  } else {
    this.merchant = null
  }
  debug('merchant:', this.merchant)
  yield next
}
