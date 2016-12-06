var AutoReply = require('../../model/autoReply')

module.exports = function*() {
  this.body = yield AutoReply.create([])
}