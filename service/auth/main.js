var thrift = require('thrift')
var uuid = require('uuid')
var Auth = require('./gen-nodejs/Auth')
var ttypes = require('./gen-nodejs/Auth_types')
var config = require('./config/redis')
var client = require('redis').createClient(config)

var server = thrift.createServer(Auth, {
  generateUrl: function (redirectUrl, openid, result) {
    var token = uuid.v4()
    var key = 'auth:' + token
    client.set(key, openid, function (err, replies) {
      if (err) {
        return result(new ttypes.InternalError({msg: err.message}))
      }
      client.expire(key, 600, function (err, replies) {
        if (err) {
          return result(new ttypes.InternalError({msg: err.message}))
        }
        result(null, `https://ant-express.picfood.cn/user/auth?token=${token}&redirect=${redirectUrl}`)
      })
    })
  }
})

server.listen(9090)
