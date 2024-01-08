import App from './app';
import { config } from './config';
import crypto from 'crypto';
import logger from './utils/logger';

const app = new App({
	genReqId: function (req: any) {
		return (req.id = crypto.randomUUID());
	},
	logger: config.env === 'TEST' ? false : logger,
});

(BigInt.prototype as any).toJSON = function () {
	return Number(this);
};

app
	.connectPrisma()
	.then(() => {
		app.log.info('[blog-service]-[prisma] Database connected');
		app.listen({ port: config.appPort, host: '0.0.0.0' }, (err, address) => {
			if (err) {
				console.log(`[blog-service]-[listen] error starting the serve-r @ ${address} with error ${err}`);
				app.log.info(
					`[blog-service]-[listen] error starting the serve-r @ ${address} with error ${err}`
				);
				process.exit(1);
			}
			app.log.info(`Server listening on ${address}`);
			console.log(`Server listening on ${address}`);
		});
	})
	.catch((error: any) => {
		app.log.error(
			`[blog-service]-[prisma] Error connecting to database with error -> ${error}`
		);
	});
