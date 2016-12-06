var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var parcelSchema = new Schema({
  // sender
  senderName: {type: String, required: true, select: false},
  senderPhone: {type: String, required: true, select: false},
  senderAddress: {type: String, required: true, select: false},
  senderDistrict: String,
  senderCity: String,
  senderProvince: String,

  // receiver
  receiverName: {type: String, required: true, select: false},
  receiverPhone: {type: String, required: true, select: false},
  receiverAddress: {type: String, required: true, select: false},
  receiverDistrict: String,
  receiverCity: String,
  receiverProvince: String,

  content: {type: String, required: true},
  weight: {type: Number, required: true},
  unit: {type: String, required: true},

  status: {type: String, required: true, default: 'added', enum: ['failed', 'added', 'confirmed']}
}, {timestamps: true})
parcelSchema.plugin(paginate)

module.exports = mongoose.model('Parcel', parcelSchema)
