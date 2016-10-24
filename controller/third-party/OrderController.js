var Order = require('../../model/order')

var getReqQRCode = function*() {
  var qrcode = this.request.body
  this.assert(qrcode, 400, 'require qrcode')
  this.assert(qrcode.id, 400, 'require id')
  this.assert(qrcode.token, 400, 'require token')
  return qrcode
}

var checkOrder = function*(order, token, status) {
  this.assert(order, 400, 'invalid order')
  this.assert(order.token == token, 400, 'invalid token')
  this.assert(order.status == status, 400, 'invalid status')
}

module.exports = {
  pass: function*() {
    var qrcode = yield* getReqQRCode.call(this)
    var order = yield Order.findOne({_id: qrcode.id})
    yield* checkOrder.call(this, order, qrcode.token, 'confirm')
    order.status = 'passing'
    yield order.save()
    this.body = {result: order}
  },
  finish: function*() {
    var qrcode = yield* getReqQRCode.call(this)
    var order = yield Order.findOne({_id: qrcode.id})
    yield* checkOrder.call(this, order, qrcode.token, 'passing')
    order.status = 'finish'
    yield order.save()
    this.body = {result: order}
  }
}