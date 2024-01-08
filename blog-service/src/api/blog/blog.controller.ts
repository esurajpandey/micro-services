import { FastifyReply, FastifyRequest } from "fastify";
import { fmt } from "../../config";

class BlogController {
    public async health (request : FastifyRequest,reply : FastifyReply){
        reply.status(200).send(fmt.formatResponse({
            name : "Suraj Pandey",
            message : 'It done',
        }))
    }
}

export default BlogController;