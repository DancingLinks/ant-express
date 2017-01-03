//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./Logger_types');
//HELPER FUNCTIONS AND STRUCTURES

Logger_message_args = function(args) {
  this.msg = null;
  if (args) {
    if (args.msg !== undefined && args.msg !== null) {
      this.msg = args.msg;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field msg is unset!');
    }
  }
};
Logger_message_args.prototype = {};
Logger_message_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.msg = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Logger_message_args.prototype.write = function(output) {
  output.writeStructBegin('Logger_message_args');
  if (this.msg !== null && this.msg !== undefined) {
    output.writeFieldBegin('msg', Thrift.Type.STRING, 1);
    output.writeString(this.msg);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Logger_message_result = function(args) {
  this.err = null;
  if (args instanceof ttypes.InternalError) {
    this.err = args;
    return;
  }
  if (args) {
    if (args.err !== undefined && args.err !== null) {
      this.err = args.err;
    }
  }
};
Logger_message_result.prototype = {};
Logger_message_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.err = new ttypes.InternalError();
        this.err.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Logger_message_result.prototype.write = function(output) {
  output.writeStructBegin('Logger_message_result');
  if (this.err !== null && this.err !== undefined) {
    output.writeFieldBegin('err', Thrift.Type.STRUCT, 1);
    this.err.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

LoggerClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
LoggerClient.prototype = {};
LoggerClient.prototype.seqid = function() { return this._seqid; }
LoggerClient.prototype.new_seqid = function() { return this._seqid += 1; }
LoggerClient.prototype.message = function(msg, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_message(msg);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_message(msg);
  }
};

LoggerClient.prototype.send_message = function(msg) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('message', Thrift.MessageType.CALL, this.seqid());
  var args = new Logger_message_args();
  args.msg = msg;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

LoggerClient.prototype.recv_message = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new Logger_message_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.err) {
    return callback(result.err);
  }
  callback(null)
};
LoggerProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
LoggerProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

LoggerProcessor.prototype.process_message = function(seqid, input, output) {
  var args = new Logger_message_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.message.length === 1) {
    Q.fcall(this._handler.message, args.msg)
      .then(function(result) {
        var result = new Logger_message_result({success: result});
        output.writeMessageBegin("message", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof ttypes.InternalError) {
          var result = new Logger_message_result(err);
          output.writeMessageBegin("message", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("message", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.message(args.msg, function (err, result) {
      if (err == null || err instanceof ttypes.InternalError) {
        var result = new Logger_message_result((err != null ? err : {success: result}));
        output.writeMessageBegin("message", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("message", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

