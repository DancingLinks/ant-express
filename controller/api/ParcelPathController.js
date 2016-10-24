var ParcelPath = require('../../model/parcelPath')
var ParcelPathService = require('../../service/parcelPath')

module.exports = {
  search: function*() {
    var data = this.request.query
    this.assert(data.start, 400, 'require start')
    this.assert(data.end, 400, 'require end')
    var parcelPaths = yield ParcelPath.find({
      start: data.start,
      end: data.end,
      status: 'wait'
    }).populate('parcel')
    this.body = {result: parcelPaths}
  },
  confirm: function*() {
    var order = yield* ParcelPathService.confirm.call(this, this.request.query)
    this.body = {result: order}
  }
}