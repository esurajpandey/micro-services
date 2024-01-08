"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const crypto_1 = __importDefault(require("crypto"));
const logger_1 = __importDefault(require("./utils/logger"));
const app = new app_1.default({
    genReqId: function (req) {
        return (req.id = crypto_1.default.randomUUID());
    },
    logger: config_1.config.env === 'TEST' ? false : logger_1.default,
});
BigInt.prototype.toJSON = function () {
    return Number(this);
};
app
    .connectPrisma()
    .then(() => {
    app.log.info('[blog-service]-[prisma] Database connected');
    app.listen({ port: config_1.config.appPort, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            console.log(`[blog-service]-[listen] error starting the serve-r @ ${address} with error ${err}`);
            app.log.info(`[blog-service]-[listen] error starting the serve-r @ ${address} with error ${err}`);
            process.exit(1);
        }
        app.log.info(`Server listening on ${address}`);
        console.log(`Server listening on ${address}`);
    });
})
    .catch((error) => {
    app.log.error(`[blog-service]-[prisma] Error connecting to database with error -> ${error}`);
});
