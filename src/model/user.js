var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
var Schema = mongoose.Schema
var md5 = require('md5')
var uuid = require('uuid')

var userSchema = new Schema({
  openid: {type: String},
  credit: {type: Number, default: 0},

  mobile: String,
  name: String,
  isMobileVerified: {type: Boolean, default: false},

  password: {type: String, default: md5(uuid.v4()), select: false}
}, {timestamps: true})
userSchema.plugin(paginate)

module.exports = mongoose.model('User', userSchema)
