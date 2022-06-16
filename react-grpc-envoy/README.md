# How to use gRPC-web with React

<br />

## gRPC at a glance

- gRPC is an inter-process communication technology that is used to execute remote sub-routines in a different address space. It uses the concept of message passing to signal a sub-routine residing in another system to execute.
- gRPC has three components: Protocol Buffer, server, and client. Protocol Buffer is an open-source serialization tool built by Google. gRPC uses this to serialize the request and response message format between the server and the client.

## gRPC - Setup the chat service

- `chat.proto`:

  ```text
  syntax = "proto3";

  message ChatMessage {
      string from = 1;
      string msg = 2;
      string time = 3;
  }

  message User {
      string id = 1;
      string name = 2;
  }

  message Empty {}

  message UserList {
      repeated User users = 1;
  }

  message JoinResponse {
      int32 error = 1;
      string msg = 2;
  }

  message ReceiveMsgRequest {
      string user = 1;
  }

  service ChatService {
      rpc join(User) returns (JoinResponse) {}
      rpc sendMsg(ChatMessage) returns (Empty) {}
      rpc receiveMsg(Empty) returns (stream ChatMessage) {}
      rpc getAllUsers(Empty) returns (UserList) {}
  }
  ```

- `server.js`:

  ```javascript
  const grpc = require("grpc");
  const protoLoader = require("@grpc/proto-loader");

  const PROTO_PATH = "chat.proto";
  const SERVER_URI = "0.0.0.0:9090";

  const usersInChat = [];
  const observers = [];

  const packageDefinition = protoLoader.loadSync(PROTO_PATH);
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

  // we'll implement the handlers here
  const join = (call, callback) => {
    const user = call.request;

    // check username already exists.
    const userExiist = usersInChat.find((_user) => _user.name == user.name);
    if (!userExiist) {
      usersInChat.push(user);
      callback(null, {
        error: 0,
        msg: "Success",
      });
    } else {
      callback(null, { error: 1, msg: "user already exist." });
    }
  };

  const sendMsg = (call, callback) => {
    const chatObj = call.request;
    observers.forEach((observer) => {
      observer.call.write(chatObj);
    });
    callback(null, {});
  };

  const getAllUsers = (call, callback) => {
    callback(null, { users: usersInChat });
  };

  const receiveMsg = (call, callback) => {
    observers.push({
      call,
    });
  };

  const server = new grpc.Server();

  server.addService(protoDescriptor.ChatService.service, {
    join,
    sendMsg,
    getAllUsers,
    receiveMsg,
  });

  server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure());

  server.start();
  console.log("Server is running!");
  ```

## Set Up React Project

- Create React project:
  ```shell
  npx create-react-app grpc-chat-react
  ```
- Install dependencies:
  ```shell
  npm install grpc-web google-protobuf
  ```
- `envoy.yaml`:

  ```yaml
  admin:
    access_log_path: /tmp/admin_access.log
    address:
      socket_address: { address: 0.0.0.0, port_value: 9901 }

  static_resources:
    listeners:
      - name: listener_0
        address:
          socket_address: { address: 0.0.0.0, port_value: 8080 }
        filter_chains:
          - filters:
              - name: envoy.filters.network.http_connection_manager
                typed_config:
                  "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
                  codec_type: auto
                  stat_prefix: ingress_http
                  stream_idle_timeout: 0s
                  route_config:
                    name: local_route
                    virtual_hosts:
                      - name: local_service
                        domains: ["*"]
                        routes:
                          - match: { prefix: "/" }
                            route:
                              cluster: chat_service
                              max_grpc_timeout: 0s
                              max_stream_duration:
                                grpc_timeout_header_max: 0s
                        cors:
                          allow_origin_string_match:
                            - prefix: "*"
                          allow_methods: GET, PUT, DELETE, POST, OPTIONS
                          allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                          max_age: "1728000"
                          expose_headers: custom-header-1,grpc-status,grpc-message
                  http_filters:
                    - name: envoy.filters.http.grpc_web
                    - name: envoy.filters.http.cors
                    - name: envoy.filters.http.router
    clusters:
      - name: chat_service
        connect_timeout: 0.25s
        type: logical_dns
        http2_protocol_options: {}
        lb_policy: round_robin
        # win/mac hosts: Use address: host.docker.internal instead of address: localhost in the line below
        load_assignment:
          cluster_name: cluster_0
          endpoints:
            - lb_endpoints:
                - endpoint:
                    address:
                      socket_address:
                        address: host.docker.internal
                        port_value: 9090
  ```

- Sets the URL adress and port of the Docker image:
  ```yaml
  admin:
    access_log_path: /tmp/admin_access.log
    address:
      socket_address: { address: 0.0.0.0, port_value: 9901 }
  ```
- This sets the URL address where the gRPC browser client will direct its HTTP/1.1 calls:
  ```yaml
  static_resources:
    listeners:
      - name: listener_0
        address:
          socket_address: { address: 0.0.0.0, port_value: 8080 }
  ```
- So 0.0.0.0:8080 is the address of the Envoy process running in the Docker image.
- This sets the URL address of the gRPC server where the Envoy proxy will direct its HTTP/2 calls. See that the address port is the same as the port our gRPC server is running on 9090. The address is set to host.docker.internal because Docker will set its address to the gRPC server so we use the Docker's address.
  ```yaml
  clusters:
    - name: chat_service
      connect_timeout: 0.25s
      type: logical_dns
      http2_protocol_options: {}
      lb_policy: round_robin
      # win/mac hosts: Use address: host.docker.internal instead of address: localhost in the line below
      load_assignment:
        cluster_name: cluster_0
        endpoints:
          - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      address: host.docker.internal
                      port_value: 9090
  ```
- This sets the URL address of the gRPC server where the Envoy proxy will direct its HTTP/2 calls. See that the address port is the same as the port our gRPC server is running on 9090. The address is set to host.docker.internal because Docker will set its address to the gRPC server so we use the Docker's address.
- So the mental image of the HTTP calls will be this:
  - browser call ChatService methods on port 8080 via HTTP 1.1.
  - Docker running on 9091 receives the call and makes HTTP/2 call to gRPC running on 9090 passing the URL address and request params.
  - gRPC server sends a response to the Envoy via HTTP/2 on 9091, Envoy sends the response to the browser client via HTTP 1.1 on port 3000.
- `Dockerfile`:
  ```Dockerfile
  FROM envoyproxy/envoy-dev:latest
  COPY envoy.yaml /etc/envoy/envoy.yaml
  RUN chmod go+r /etc/envoy/envoy.yaml
  ```

## Setting the gRPC web protoc

- Now we will have to compile the chat.proto file using proto compiler. This is to generate the JavaScript code equivalent of the Protobuf code we have in the chat.proto, this is done so we can access the message types, services and call the methods using JavaScript.
- Install protoc linux:
  ```shell
  apt install -y protobuf-compiler
  ```
- Download protoc-gen-grpc-web plugin here: https://github.com/grpc/grpc-web/releases
- Set the plugin:
  ```shell
  $ sudo mv ~/Downloads/protoc-gen-grpc-web-1.3.1-darwin-x86_64 \
      /usr/local/bin/protoc-gen-grpc-web
  $ chmod +x /usr/local/bin/protoc-gen-grpc-web
  ```
- Compile:
  ```shell
  protoc -I=. src/chat.proto --js_out=import_style=commonjs,binary:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
  ```

## Resource:

- https://daily.dev/blog/build-a-chat-app-using-grpc-and-reactjs
- https://github.com/grpc/grpc-web
