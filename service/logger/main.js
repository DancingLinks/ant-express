// Database Config
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://mongodb/ant-express')
var Message = require('./model/message')

// Thrift
var thrift = require('thrift')
var Logger = require('./gen-nodejs/Logger')
var ttypes = require('./gen-nodejs/Logger_types')

var server = thrift.createServer(Logger, {
  message: function (msg, result) {
    var data = JSON.parse(msg)
    Message.create(data).then(()=>{
      result(null)
    }).catch((err)=>{
      result(new ttypes.InternalError({msg: err.message}))
    })
  }
})

server.listen(9090)
