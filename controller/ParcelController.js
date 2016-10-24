var Parcel = require('../model/parcel')
var ParcelPath = require('../model/parcelPath')
var debug = require('../service/debug')
var ParcelService = require('../service/parcel')

module.exports = {
  pass: function*() {
    yield this.render('parcel/pass')
  },
  search: function*() {
    var data = this.request.query
    this.assert(data.start, 400, 'require start')
    this.assert(data.end, 400, 'require end')
    var parcelPaths = yield ParcelPath.find({
      start: data.start,
      end: data.end,
      status: 'wait'
    }).populate('parcel')
    yield this.render('parcel/search', {
      parcelPaths: parcelPaths
    })
  },
  add: function*() {
    var data = this.request.body
    this.assert(data, 400, 'require body')
    var res = yield* ParcelService.add.call(this, data)
    this.assert(res.parcel && res.paths, 500, 'add parcel fail')
    this.body = res
  }
}