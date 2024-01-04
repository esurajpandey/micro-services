import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import grpcFuntions from '../src/common/gRPC.helper.js';
import { config } from './config/index.js';
const PROTO_PATH = path.join(__dirname,'../../protos/auth.proto');

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

const server = new grpc.Server();
const services = {};

Object.entries(grpcFuntions).forEach(([functionName, func]) => {
    services[functionName] = async (call,callback) => {
        try {
            const response = await func(call.request);
            callback([functionName, func])(null, response);
        } catch (error){
            callback(error,null);
        }
    }
})

server.addService(authProto.Authentication.service, services);

server.bindAsync(
    '0.0.0.0:'+ config.grpcPort,
    grpc.ServerCredentials.createInsecure(),
    (error,port) => {
        if (error){
            console.error('Auth Protos did not start', error);
        }else {
            console.log('gRPC running at http://0.0.0.0:' + port);
			server.start();
        }
    }
)





