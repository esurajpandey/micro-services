import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
const __dirname = new URL('.', import.meta.url).pathname;
const PROTO_PATH = path.join(__dirname,'./protos/auth.proto');
process.env.GRPC_TRACE = 'all';
process.env.GRPC_VERBOSITY = 'DEBUG';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

const serverAddress = 'localhost:50051';
const authClient = new authProto.Authentication(serverAddress, grpc.credentials.createInsecure());

authClient.check({},(error,msg)=>{
    if (error){
        console.log(error.metadata)
        console.error(error) 
    } else { 
        console.log(msg)
    }
})