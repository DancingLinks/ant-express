var wechatAPI = require('../../service/wechatAPI')
var oauth = require('../../service/oauth')

module.exports = function*() {
  var url = oauth.client.getAuthorizeURL('https://ant-express.picfood.cn/user/oauth?redirect=/parcel/pass', '', 'snsapi_base')
  this.body = yield* wechatAPI.createMenu({
    "button": [
      {
        "name": "传递包裹",
        "sub_button": [
          {
            "type": "view",
            "name": "包裹查询",
            "url": url
          }
        ]
      },
      {
        "name": "个人中心",
        "sub_button": [
          {
            "type": "click",
            "name": "已接单的包裹",
            "key": "ORDER_CONFIRM"
          },
          {
            "type": "click",
            "name": "运送中的包裹",
            "key": "ORDER_PASSING"
          },
          {
            "type": "click",
            "name": "历史包裹",
            "key": "ORDER_FINISH"
          }
        ]
      }
    ]
  });
}