const pify = require('pify')
var redisCo = require('../service/redisCo')
var oauth = require('../service/oauth')
var User = require('../model/user')

module.exports = {
  index: function*(next) {
    var openid = this.session.openid
    this.body = 'this a users response! ' + openid
  },
  auth: function*(next) {
    var query = this.request.query
    this.assert(query.token, 400, 'require token')
    this.assert(query.redirect, 400, 'require redirect')
    var openid = yield redisCo.get('auth:' + query.token)
    this.assert(openid, 401, 'invalid token')
    var user = yield User.findOne({openid: openid})
    this.assert(user, 401, 'auth fail')
    this.session.user_id = user._id
    this.redirect(query.redirect)
  },
  oauth: function*(next) {
    var query = this.request.query
    this.assert(query.code, 400, 'require code')
    this.assert(query.redirect, 400, 'require redirect')
    var res = yield oauth.getAccessToken(query.code)
    this.assert(res.data.openid, 500, 'getAccessToken error')
    var user = yield User.findOne({openid: res.data.openid})
    this.assert(user, 401, 'auth fail')
    this.session.user_id = user._id
    this.redirect(query.redirect)
  }
}