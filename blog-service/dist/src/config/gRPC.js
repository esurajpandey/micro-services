"use strict";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const PROTO_PATH = path.join(__dirname, '../../../protos/');
const fs = require('fs');
const { config } = require('.');
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
const clients = {};
fs.readdirSync(PROTO_PATH).forEach(protoFile => {
    if (!protoFile.includes('.proto'))
        return;
    const client = protoFile.split('.')[0];
    var packageDefinition = protoLoader.loadSync(PROTO_PATH + protoFile, options);
    const proto = grpc.loadPackageDefinition(packageDefinition)[client];
    const serviceName = Object.keys(proto).find(definition => proto[definition].service);
    const grpcAddress = config[client + 'Grpc'] + '';
    const service = new proto[serviceName](grpcAddress, grpc.credentials.createInsecure());
    clients[client + 'Client'] = service;
});
module.exports = clients;
