var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var orderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  parcel: {type: Schema.Types.ObjectId, ref: 'Parcel', required: true},
  parcelPath: {type: Schema.Types.ObjectId, ref: 'ParcelPath', required: true},
  status: {type: String, required: true, enum: ['confirm', 'passing', 'finish']},
  credit: Number
}, {timestamps: true})
orderSchema.plugin(paginate)

module.exports = mongoose.model('Order', orderSchema)
