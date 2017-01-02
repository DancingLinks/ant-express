var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var parcelPathSchema = new Schema({
  parcel: {type: Schema.Types.ObjectId, ref: 'Parcel'},
  start: {type: String, required: true},
  end: {type: String, required: true},
  status: {type: String, required: true, default: 'wait', enum: ['wait', 'confirm', 'finish']}
}, {timestamps: true})
parcelPathSchema.plugin(paginate)

module.exports = mongoose.model('ParcelPath', parcelPathSchema)
