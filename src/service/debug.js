module.exports = function () {
  if (process.env.NODE_ENV == "production") return
  // var now = new Date()
  // var args = [now.toLocaleString() + ' -']
  // for (var i = 0, l = arguments.length; i < l; ++i) {
  //   args.push(arguments[i])
  // }
  console.log.apply(null, arguments)
}