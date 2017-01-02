var User = require('../../model/user')

module.exports = function*() {
  var openid = this.weixin.FromUserName
  var user = yield User.findOne({openid: openid})
  if (!user) {
    user = yield User.create({openid: openid})
  }
  this.wxuser = user
}