import Config from "./config";
if (!process.env.NODE_ENV) {
	const dotenv = require('dotenv');
	dotenv.config();
}

const config = new Config(process.env);

export {
    config
}