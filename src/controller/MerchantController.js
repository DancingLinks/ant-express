const Merchant = require('../model/merchant')
const uuid = require('uuid')
const md5 = require('md5')

module.exports = {
  index: function*() {
    if (!this.merchant) {
      this.redirect('/merchant/login')
    } else {
      this.redirect('/merchant/info')
    }
  },
  login: function*() {
    yield this.render('merchant/login')
  },
  loginPost: function*() {
    var data = this.request.body
    var merchant = yield Merchant.findOne({
      username: data.username,
      password: md5(data.password)
    })
    this.assert(merchant, 401, 'auth fail')
    this.session.merchant_id = merchant.id
    this.redirect('/merchant/info')
  },
  signup: function*() {
    yield this.render('merchant/signup')
  },
  signupPost: function*() {
    var data = this.request.body
    try {
      var merchant = yield Merchant.create({
        username: data.username,
        password: md5(data.password),
        appid: uuid.v1(),
        appkey: uuid.v4(),
        company: data.company,
        web: data.web
      })
      yield this.render('merchant/signup-post', {success: true})
    } catch (err) {
      yield this.render('merchant/signup-post', {success: false})
    }
  },
  info: function*() {
    this.assert(this.merchant, 401, 'Unauthorized')
    yield this.render('merchant/info', {merchant: this.merchant})
  }

}