var mapping = []

module.exports = function*() {
  var content = this.weixin.Content
  var i, l
  for (i = 0, l = mapping.length; i < l; ++i) {
    if (mapping[i].keyword === content) {
      yield* mapping[i].action.call(this)
      break
    }
  }
}

