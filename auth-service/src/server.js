import App from "./app.js";
import {config} from '../src/config/index.js';
import logger from '../src/utils/logger.js';
import gRPC from '../src/gRPC.js';

const server = new App();

server
    .connectPrisma()
    .then(()=>{
        logger.info(`[AuthService]-[Prisma] database connected`);
        server.listenServer({port : config.appPort,host : '0.0.0.0'},
            (err)=>{
                if (err){
                    logger.error(`[AuthService]--[listen] error starting the server @ ${address} with error ${err}`)
                    process.exit(1);
                }
                logger.info(`Server listening on [http://0.0.0.0:${config.appPort}]`);
            }
        )
    })
    .catch((error) => {
        logger.error(`[AuthService]-[prisma] Error connecting to database with error -> ${error}`);
    })


