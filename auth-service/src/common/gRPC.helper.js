import BadRequest from '../exceptions/BadRequest.exception.js';
import jwtService from '../services/jwt.service.js';

export  async function verifyToken(token){
    if (!token)  throw new BadRequest('Token not found');

    const response = jwtService.verifyToken(token);
    if (!response) throw new BadRequest('Invalid token');
    return {
        userId : response.userId,
        name : response.name,
        email : response.email,
        role : response.role,
    }
}