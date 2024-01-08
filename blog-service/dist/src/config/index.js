"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fmt = exports.config = void 0;
const fromatter_1 = __importDefault(require("../utils/fromatter"));
const config_1 = __importDefault(require("./config"));
if (!process.env.NODE_ENV) {
    const dotenv = require('dotenv');
    dotenv.config();
}
if (process.env.NODE_ENV === 'TEST') {
    const dotenv = require('dotenv');
    dotenv.config('../.env.test');
}
const config = new config_1.default(process.env);
exports.config = config;
const fmt = new fromatter_1.default();
exports.fmt = fmt;
