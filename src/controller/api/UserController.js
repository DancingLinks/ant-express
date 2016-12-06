var MessageXSend = require('../../service/submail/messageXSend');
var submailConfig = require('../../config/submail')
var User = require('../../model/user')
var md5 = require('md5')

module.exports = {
  getSMSCode: function*() {
    var mobile = this.request.query.mobile
    this.assert(mobile, 400, 'require mobile')
    var regex = /^1((3|5|8){1}\d{1}|70)\d{8}$/
    this.assert(regex.test(mobile), 400, 'invalid mobile')

    var now = new Date()
    var verifySession = this.session.verify
    if (verifySession) {
      this.assert(now.getTime() - verifySession.time > 60000, 400, 'too frequent request')
    }

    var code = ''
    for (var i = 0; i < 6; ++i) {
      code += Math.floor(Math.random() * 10)
    }
    this.session.verify = {
      mobile: mobile,
      code: code,
      time: now.getTime()
    }

    var messageXSend = new MessageXSend()
    messageXSend.add_to(mobile)
    messageXSend.set_project(submailConfig.template.verify)
    messageXSend.add_var('code', code)
    var res = yield messageXSend.xsend()

    this.body = {result: 1}
  },
  signup: function*() {
    var body = this.request.body
    this.assert(body.mobile, 400, 'require mobile')
    var regex = /^1((3|5|8){1}\d{1}|70)\d{8}$/
    this.assert(regex.test(body.mobile), 400, 'invalid mobile')
    this.assert(body.smsCode, 400, 'require smsCode')
    this.assert(body.password, 400, 'require password')
    this.assert(body.name, 400, 'require name')

    var now = new Date()
    var verifySession = this.session.verify
    this.assert(verifySession, 400, 'please get code first')
    this.assert(now.getTime() - verifySession.time < 600000, 401, 'code is out of date')
    this.assert(body.mobile == verifySession.mobile, 401, 'mobile is incorrect')
    this.assert(body.smsCode == verifySession.code, 401, 'code is incorrect')
    this.session.verify = null

    var user = yield User.findOne({mobile: body.mobile})
    this.assert(!user, 400, 'user exist')

    yield User.create({
      mobile: body.mobile,
      password: md5(body.password),
      name: body.name
    })

    this.body = {result: 1}
  },
  login: function*() {
    var body = this.request.body
    this.assert(body.mobile, 400, 'require mobile')
    this.assert(body.password, 400, 'require password')

    var user = yield User.findOne({mobile: body.mobile, password: md5(body.password)})
    this.assert(user, 401, 'invalid mobile or password')

    this.session.user_id = user._id
    this.body = {result: user}
  },
  logout: function*() {
    this.session.user_id = null
    this.body = {result: 1}
  },
  info: function*() {
    this.assert(this.user, 401, 'unauthorized')
    this.body = {result: this.user}
  },
  test: function*() {
    this.body = {result: {session: this.session, user: this.user}}
  }
}
