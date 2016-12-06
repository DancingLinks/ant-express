var router = require('koa-router')()
var wechat = require('co-wechat')
var config = require('../config/wechat')
var logger = require('../service/logger')
var wechatUser = require('../middleware/wechat/user')
// Handlers
var TextHandler = require('../handler/text')
var DefaultHandler = require('../handler/default')
var EventHandler = require('../handler/event')
// debug
var debug = require('debug')('jdqy')

var AutoReply = require('../module/AutoReply/autoReply')

function* HandlerDelegate() {
  switch (this.weixin.MsgType) {
    case 'text':
      yield* TextHandler.call(this)
      break
    case 'event':
      yield* EventHandler.call(this)
      break
  }
  if (this.body == null) {
    yield* DefaultHandler.call(this)
  }
}

var wechatHandler = wechat({
  token: config.token,
  appid: config.appid,
  encodingAESKey: config.encodingAESKey
}).middleware(function*() {
  yield* logger.requestMessage.call(this)
  yield* wechatUser.call(this)
  debug('wx: %s', JSON.stringify(this.weixin))
  debug('wxuser: %s', JSON.stringify(this.wxuser))
  var result = yield* AutoReply.exec.call(this)
  if (!result) {
    yield* HandlerDelegate.call(this)
  }
  debug('body: %s', JSON.stringify(this.body))
  yield* logger.replyMessage.call(this)
})

router.get('/', wechatHandler)
router.post('/', wechatHandler)

module.exports = router
