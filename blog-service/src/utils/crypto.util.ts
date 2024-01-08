import crypto from 'crypto';

export const generateRandomHash = () => {
	return crypto.randomBytes(16).toString('hex');
};

