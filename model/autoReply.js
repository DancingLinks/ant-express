var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var autoReplySchema = new Schema({
  MsgType: String,
  Content: [String],
  Event: String,
  EventKey: String,
  Reply: Schema.Types.Mixed
}, {timestamps: true})
autoReplySchema.plugin(paginate)

module.exports = mongoose.model('AutoReply', autoReplySchema)
