import path from 'path';
import { generateRandomHash } from './crypto.util';
import { GetFileName } from 'fastify-multer/lib/interfaces';

class Formatter{
    public formatError = (error: any): any => {
		const status = error.status || 500;
		const message = error.message || 'Something went wrong';
		const code = error.code || 'E500';
		const data = error.data || null;
		const success = false;
		return {
			status,
			message,
			data,
			success,
			code,
		};
	};

    public formatResponse = (result: any, message?: string): any => {
		let data: any = null;
		let success: boolean = false;
		const code = 'S200';

		data = result;
		success = true;

		const response = {
			data,
			message: message ? message : '',
			success,
			code,
		};
		return response;
	};
    public getSwaggerResponse = (data: any) => {
		return {
			data,
			message: { type: 'string' },
			success: { type: 'boolean' },
			code: { type: 'string' },
		};
	};
    public formatFileUrl = (filePath: string, hostedPath: string) => {
		const path = filePath.split('/docs');
		return `${hostedPath}${path.pop()}`;
	};

    public formatMulterFileName: GetFileName = (_, file, callback) => {
		const hash = generateRandomHash();
		const fileExtension = path.extname(file.originalname);
		callback(null, `${hash}${fileExtension}`);
	};
    public getSwaggerErrorResponse = (errorCode: number, description: string) => {
		return {
			description,
			type: 'object',
			properties: {
				statusCode: {
					type: 'number',
					enum: [errorCode],
				},
				code: { type: 'string' },
				error: { type: 'string' },
				message: { type: 'string' },
			},
		};
	};
}

export default Formatter;