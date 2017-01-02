var auth = require('../service/auth')

module.exports = {
  auth: function*() {
    var url = yield* auth.generateUrl.call(this, '/user')
    this.body = `请点击下面的链接\n<a href="${url}">验证</a>`
  }
}