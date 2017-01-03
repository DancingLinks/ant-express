var Message = require('../model/message')

var thrift = require('thrift')
var LoggerService = require('./gen-nodejs/Logger')
var connection = thrift.createConnection('logger-service', 9090, {
  transport: thrift.TBufferedTransport,
  protocol: thrift.TBinaryProtocol
})
var client = thrift.createClient(LoggerService, connection)

module.exports = {
  requestMessage: function*() {
    var msg = JSON.stringify(this.weixin)
    yield client.message(msg)
  },
  
  replyMessage: function*() {
    var content = this.body
    var fromUsername = this.weixin.ToUserName
    var toUsername = this.weixin.FromUserName

    var info = {}
    var type = 'text'
    info.Content = content || ''
    if (Array.isArray(content)) {
      type = 'news'
    } else if (typeof content === 'object') {
      if (content.hasOwnProperty('type')) {
        type = content.type
        info.Content = content.content
      } else {
        type = 'music'
      }
    }
    info.MsgType = type
    info.CreateTime = new Date().getTime()
    info.ToUserName = toUsername
    info.FromUserName = fromUsername

    var msg = JSON.stringify(info)
    yield client.message(msg)
  }
}
