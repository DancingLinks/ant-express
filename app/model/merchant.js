var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var merchantSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false},
  appid: {type: String, required: true, unique: true},
  appkey: {type: String, required: true},
  company: {type: String, required: true},
  web: {type: String, required: true}
}, {timestamps: true})
merchantSchema.plugin(paginate)

module.exports = mongoose.model('Merchant', merchantSchema)
