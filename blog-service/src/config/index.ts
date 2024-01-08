import Formatter from "../utils/fromatter";
import Config from "./config";


if (!process.env.NODE_ENV) {
	const dotenv = require('dotenv');
	dotenv.config();
}

if (process.env.NODE_ENV === 'TEST') {
	const dotenv = require('dotenv');
	dotenv.config('../.env.test');
}

const config = new Config(process.env);
const fmt = new Formatter();
export {config,fmt};