/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./todo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.TodoServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.TodoServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.TodoList>}
 */
const methodDescriptor_TodoService_GetAll = new grpc.web.MethodDescriptor(
  '/TodoService/GetAll',
  grpc.web.MethodType.UNARY,
  proto.Empty,
  proto.TodoList,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TodoList.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.TodoList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TodoList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TodoServiceClient.prototype.getAll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TodoService/GetAll',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetAll,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TodoList>}
 *     Promise that resolves to the response
 */
proto.TodoServicePromiseClient.prototype.getAll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TodoService/GetAll',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetAll);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TodoId,
 *   !proto.Todo>}
 */
const methodDescriptor_TodoService_GetById = new grpc.web.MethodDescriptor(
  '/TodoService/GetById',
  grpc.web.MethodType.UNARY,
  proto.TodoId,
  proto.Todo,
  /**
   * @param {!proto.TodoId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Todo.deserializeBinary
);


/**
 * @param {!proto.TodoId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Todo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Todo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TodoServiceClient.prototype.getById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TodoService/GetById',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetById,
      callback);
};


/**
 * @param {!proto.TodoId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Todo>}
 *     Promise that resolves to the response
 */
proto.TodoServicePromiseClient.prototype.getById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TodoService/GetById',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Todo,
 *   !proto.Todo>}
 */
const methodDescriptor_TodoService_Create = new grpc.web.MethodDescriptor(
  '/TodoService/Create',
  grpc.web.MethodType.UNARY,
  proto.Todo,
  proto.Todo,
  /**
   * @param {!proto.Todo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Todo.deserializeBinary
);


/**
 * @param {!proto.Todo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Todo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Todo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TodoServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TodoService/Create',
      request,
      metadata || {},
      methodDescriptor_TodoService_Create,
      callback);
};


/**
 * @param {!proto.Todo} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Todo>}
 *     Promise that resolves to the response
 */
proto.TodoServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TodoService/Create',
      request,
      metadata || {},
      methodDescriptor_TodoService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Todo,
 *   !proto.Todo>}
 */
const methodDescriptor_TodoService_Update = new grpc.web.MethodDescriptor(
  '/TodoService/Update',
  grpc.web.MethodType.UNARY,
  proto.Todo,
  proto.Todo,
  /**
   * @param {!proto.Todo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Todo.deserializeBinary
);


/**
 * @param {!proto.Todo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Todo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Todo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TodoServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TodoService/Update',
      request,
      metadata || {},
      methodDescriptor_TodoService_Update,
      callback);
};


/**
 * @param {!proto.Todo} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Todo>}
 *     Promise that resolves to the response
 */
proto.TodoServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TodoService/Update',
      request,
      metadata || {},
      methodDescriptor_TodoService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TodoId,
 *   !proto.Empty>}
 */
const methodDescriptor_TodoService_Delete = new grpc.web.MethodDescriptor(
  '/TodoService/Delete',
  grpc.web.MethodType.UNARY,
  proto.TodoId,
  proto.Empty,
  /**
   * @param {!proto.TodoId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Empty.deserializeBinary
);


/**
 * @param {!proto.TodoId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TodoServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TodoService/Delete',
      request,
      metadata || {},
      methodDescriptor_TodoService_Delete,
      callback);
};


/**
 * @param {!proto.TodoId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.TodoServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TodoService/Delete',
      request,
      metadata || {},
      methodDescriptor_TodoService_Delete);
};


module.exports = proto;

