var ParcelPath = require('../../model/parcelPath')
var ParcelService = require('../../service/parcel')

module.exports = {
  add: function*() {
    var data = this.request.body
    this.assert(data, 400, 'require body')
    var res = yield* ParcelService.add.call(this, data)
    this.assert(res.parcel && res.paths, 500, 'add parcel fail')
    this.body = res
  }
}