const StationsData = require('../../data/stations.json')
var Station = require('../../model/station')

module.exports = function*(next) {
  for (var i = 0, l = StationsData.length; i < l; ++i) {
    try {
      var station = yield Station.create({name: StationsData[i]})
      console.log('index:', i, 'ok!')
    } catch (err) {
      console.error('index:', i, 'err!')
    }
  }
  this.body = 'init station'
}