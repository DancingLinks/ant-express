var uuid = require('uuid')
var redisCo = require('../service/redisCo')

module.exports = {
  generateUrl: function*(redirectUrl) {
    var token = uuid.v4()
    var key = 'auth:' + token
    var openid = this.weixin.FromUserName
    yield redisCo.set(key, openid)
    yield redisCo.expire(key, 600)
    return `https://ant-express.picfood.cn/user/auth?token=${token}&redirect=${redirectUrl}`
  }
}