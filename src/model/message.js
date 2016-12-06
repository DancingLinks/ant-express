var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var messageSchema = new Schema({
  ToUserName: String,
  FromUserName: String,
  CreateTime: String,
  MsgType: String,
  // MsgID
  MsgId: String,
  // text
  Content: String,
  // location
  Location_X: String,
  Location_Y: String,
  Scale: String,
  Label: String,
  // event
  Event: String, // subscribe, unsubscribe
  EventKey: String,
  MenuId: String,
  ScanCodeInfo: Schema.Types.Mixed
}, {timestamps: true})
messageSchema.plugin(paginate)

module.exports = mongoose.model('Message', messageSchema)
