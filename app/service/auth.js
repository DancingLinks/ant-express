var thrift = require('thrift')
var AuthService = require('./gen-nodejs/Auth')
var connection = thrift.createConnection('auth-service', 9090, {
  transport: thrift.TBufferedTransport,
  protocol: thrift.TBinaryProtocol
})
var client = thrift.createClient(AuthService, connection)

module.exports = {
  generateUrl: function*(redirectUrl) {
    console.log('weixin:', this.weixin)
    var openid = this.weixin ? this.weixin.FromUserName : 'ERROR'
    return yield client.generateUrl(redirectUrl, openid)
  }
}