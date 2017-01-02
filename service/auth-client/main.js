var thrift = require('thrift');
var Auth = require('./gen-nodejs/Auth');
var ttypes = require('./gen-nodejs/Auth_types');

var connection = thrift.createConnection("ant-auth-service", 9090, {
  transport : thrift.TBufferedTransport,
  protocol : thrift.TBinaryProtocol
});

connection.on('error', function(err) {
  assert(false, err);
});

var client = thrift.createClient(Auth, connection);

client.generateUrl('hello+world', '23333333', function(err, response) {
  if (err) {
    return console.log(err.msg)
  }
  console.log('res:', response)
});

