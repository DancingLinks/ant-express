const StationsData = require('../data/stations.json')
const StationsDataLength = StationsData.length
var PeopleData = require('../data/people.json')

var Parcel = require('../model/parcel')
var ParcelPath = require('../model/parcelPath')
var Station = require('../model/station')

var debug = require('./debug')

var ParcelService = {
  add: function*(data) {
    var parcel = yield Parcel.create(data)
    var startStationIndex = yield* ParcelService.getStationIndex.call(this, data.senderAddress)
    var endStationIndex = yield* ParcelService.getStationIndex.call(this, data.receiverAddress)
    this.assert(startStationIndex >= 0, 400, 'invalid senderAddress')
    this.assert(endStationIndex >= 0, 400, 'invalid receiverAddress')

    var paths = []

    // 直达
    if (PeopleData[startStationIndex][endStationIndex] > 0) {
      var path = yield ParcelPath.create({
        parcel: parcel._id,
        start: StationsData[startStationIndex],
        end: StationsData[endStationIndex]
      })
      paths.push(path)
      PeopleData[startStationIndex][endStationIndex] -= 1;
      debug('path:', StationsData[startStationIndex], StationsData[endStationIndex], PeopleData[startStationIndex][endStationIndex])
      return {parcel: parcel, paths: paths}
    }

    var max_people = 0
    var sum_people = 0
    var max_i = -1

    // 一次中转
    for (var i = 0; i < StationsDataLength; ++i) {
      var people = Math.min(PeopleData[startStationIndex][i], PeopleData[i][endStationIndex])
      var total = PeopleData[startStationIndex][i] + PeopleData[i][endStationIndex]
      if (people > max_people || (people == max_people && total > sum_people)) {
        max_people = people
        sum_people = total
        max_i = i
      }
    }
    if (max_people > 0 && max_i >= 0) {
      var path1 = yield ParcelPath.create({
        parcel: parcel._id,
        start: StationsData[startStationIndex],
        end: StationsData[max_i]
      })
      var path2 = yield ParcelPath.create({
        parcel: parcel._id,
        start: StationsData[max_i],
        end: StationsData[endStationIndex]
      })
      paths.push(path1)
      paths.push(path2)
      PeopleData[startStationIndex][max_i] -= 1;
      PeopleData[max_i][endStationIndex] -= 1;
      debug('path:', StationsData[startStationIndex], StationsData[max_i], PeopleData[startStationIndex][max_i])
      debug('path:', StationsData[max_i], StationsData[endStationIndex], PeopleData[max_i][endStationIndex])
      return {parcel: parcel, paths: paths}
    }

    // TODO 两次中转


    parcel.status = 'failed'
    yield parcel.save()

    return {parcel: null, paths: null}
  },
  getStationIndex: function*(stationName) {
    for (var i = 0; i < StationsDataLength; ++i) {
      if (StationsData[i] == stationName) return i
    }
    return -1;
  }
}

module.exports = ParcelService