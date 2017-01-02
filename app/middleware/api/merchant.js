var redisCo = require('../../service/redisCo')
var Merchant = require('../../model/merchant')

module.exports = function*(next) {
  var access_token = this.request.body.access_token || this.request.query.access_token
  this.assert(access_token, 400, 'require access_token')
  var merchant_id = yield redisCo.get(`mat:${access_token}`)
  this.assert(merchant_id, 400, 'invalid token')
  var merchant = yield Merchant.findOne({_id: merchant_id})
  this.assert(merchant, 401, 'unauthorized')
  this.session.merchant = merchant
  yield next
}