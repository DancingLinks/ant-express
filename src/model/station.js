var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var stationSchema = new Schema({
  name: {type: String, required: true, index: {unique: true}}
}, {timestamps: true})
stationSchema.plugin(paginate)

module.exports = mongoose.model('Station', stationSchema)
