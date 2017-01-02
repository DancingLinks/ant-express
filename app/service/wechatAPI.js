var WechatAPI = require('co-wechat-api')
var config = require('../config/wechat')

//TODO save token in redis
module.exports = new WechatAPI(config.appid, config.appsecret)