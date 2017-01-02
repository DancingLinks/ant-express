var OAuth = require('wechat-oauth');
var config = require('../config/wechat')
var client = new OAuth(config.appid, config.appsecret);

module.exports = {
  client: client,
  getAccessToken: function (code) {
    return new Promise((resolve, reject)=> {
      client.getAccessToken(code, function (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
};
