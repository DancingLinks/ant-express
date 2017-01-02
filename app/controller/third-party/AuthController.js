var uuid = require('uuid')
var redisCo = require('../../service/redisCo')
var Merchant = require('../../model/merchant')

module.exports = {
  getAccessToken: function*() {
    var data = this.request.body
    this.assert(data.appid, 400, 'require appid')
    this.assert(data.appkey, 400, 'require appkey')
    var merchant = yield Merchant.findOne({appid: data.appid, appkey: data.appkey})
    console.log('merchant:', merchant)
    this.assert(merchant, 401, 'unauthorized')
    var token = uuid.v4()
    yield redisCo.set(`mat:${token}`, merchant._id) // merchant access token
    this.body = {access_token: token}
  }
}