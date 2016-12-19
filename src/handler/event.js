var OrderController = require('../controller/wechat/OrderController')

var mapping = [
  {
    Event: 'CLICK',
    EventKey: 'ORDER_CONFIRM',
    action: OrderController.confirmed
  },
  {
    Event: 'CLICK',
    EventKey: 'ORDER_PASSING',
    action: OrderController.passing
  },
  {
    Event: 'CLICK',
    EventKey: 'ORDER_FINISH',
    action: OrderController.finished
  },
  {
    Event: 'subscribe',
    EventKey: '',
    action: function*() {
      this.body = '「蚂蚁相传」汇聚一切微小的力量'
    }
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