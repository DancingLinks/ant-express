module.exports = function*(next) {
  this.assert(this.user, 401, 'unauthorized')
  yield next
}