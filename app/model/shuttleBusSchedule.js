var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var shuttleBusScheduleSchema = new Schema({
  name: String,
  direction: String,
  time: String,
  operating: [String]
}, {timestamps: true})
shuttleBusScheduleSchema.plugin(paginate)

module.exports = mongoose.model('ShuttleBusSchedule', shuttleBusScheduleSchema)
