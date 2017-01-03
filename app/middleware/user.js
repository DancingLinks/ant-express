var User = require('../model/user')
var debug = require('../service/debug')

module.exports = function*(next) {
  if (this.path === '/wechat') {
    yield next
    return
  }
  if (this.session.user_id) {
    this.user = yield User.findOne({_id: this.session.user_id})
  } else {
    this.user = null
  }
  yield next
}
