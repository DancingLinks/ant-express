var ParcelController = require('../controller/wechat/ParcelController')

var mapping = [
  {
    Event: 'CLICK',
    EventKey: 'PASS_PARCEL',
    action: ParcelController.pass
  }
]

module.exports = function*() {
  var wx = this.weixin
  var i, l
  for (i = 0, l = mapping.length; i < l; ++i) {
    var item = mapping[i]
    if (item.Event && item.Event !== wx.Event) continue
    if (item.EventKey && item.EventKey !== wx.EventKey) continue
    yield* mapping[i].action.call(this)
    break
  }
}