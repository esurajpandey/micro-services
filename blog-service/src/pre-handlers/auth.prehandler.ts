import { authClient } from "../config/gRPC";
import { FastifyError, FastifyReply, FastifyRequest, preHandlerHookHandler } from 'fastify';
import { config } from "../config";

export const authPrehandler : preHandlerHookHandler = (
    request: FastifyRequest,
	_: FastifyReply,
	// eslint-disable-next-line no-unused-vars
	next: (_error?: FastifyError) => void
) => {
    const ignorePaths = [/\/health/];
    if (ignorePaths.find(path => path.test(request.url))) return next();

    // const token = request.headers.cookie?.match(/token=(.*?)(;|$)/)?.[1] || '';
    const token = 'Suraj is my name';
    authClient.verifyToken({ token }, (error: Error, tokenData: any) => {
		if (error) {
            console.log({Error :   `Error  : ${error}`})
        };

		// request.requestContext.set('userId', tokenData.userId);
		// request.requestContext.set('tokenData', tokenData);
        console.log({tokenData});
		next();
	});
}

