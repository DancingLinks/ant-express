var Order = require('../../model/order')

var getReqQRCode = function*() {
  var qrcode = this.request.body
  this.assert(qrcode, 400, 'require qrcode')
  this.assert(qrcode.id, 400, 'require id')
  this.assert(qrcode.token, 400, 'require token')
  return qrcode
}


module.exports = {
  pass: function*() {
    var qrcode = yield* getReqQRCode.call(this)
    var result = yield Order.update({_id: qrcode.id, token: qrcode.token, status: 'confirm'}, {status: 'passing'})
    this.body = {result: result}
  },
  finish: function*() {
    var qrcode = yield* getReqQRCode.call(this)
    var result = yield Order.update({_id: qrcode.id, token: qrcode.token, status: 'passing'}, {status: 'finish'})
    this.body = {result: result}
  }
}