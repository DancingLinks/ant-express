var Message = require('../model/message')

module.exports = {
  requestMessage: function*() {
    var message = new Message(this.weixin)
    message.save((err)=> {
      if (err) console.error(new Date(), err)
    })
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
    
    var message = new Message(info)
    message.save((err)=> {
      if (err) console.error(new Date(), err)
    })
  }
}
