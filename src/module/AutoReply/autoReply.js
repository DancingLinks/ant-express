var AutoReply = require('../../model/autoReply')

module.exports = {
  exec: function*() {
    var wx = this.weixin

    var query = {MsgType: wx.MsgType}
    if (wx.Content) query.Content = wx.Content
    if (wx.Event) query.Event = wx.Event
    if (wx.EventKey) query.EventKey = wx.EventKey

    var autoReply = yield AutoReply.findOne(query)
    if (autoReply) {
      this.body = autoReply.Reply
      return true
    } else {
      return false
    }
  }
}