var auth = require('../../service/auth')

module.exports = {
  pass: function*() {
    var url = yield* auth.generateUrl.call(this, '/parcel/pass')
    this.body = [{
      title: '开始传递',
      description: '',
      picurl: 'http://qiniu.cdn.picfood.cn/ant-express/ant-express-banner.jpg',
      url: url
    }]
  }

}