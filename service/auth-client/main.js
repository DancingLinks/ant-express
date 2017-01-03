var thrift = require('thrift');
var Auth = require('./gen-nodejs/Auth');
var ttypes = require('./gen-nodejs/Auth_types');

var connection = thrift.createConnection("127.0.0.1", 9090, {
  transport: thrift.TBufferedTransport,
  protocol: thrift.TBinaryProtocol
});

// connection.on('error', function(err) {
//   assert(false, err);
// });

var client = thrift.createClient(Auth, connection);

client.generateUrl('hello+world', '23333333').then((response) => {
  console.log('res:', response)
}).catch((err)=>{
  console.error(err)
})

