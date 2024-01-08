"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
class BlogController {
    async health(request, reply) {
        reply.status(200).send(config_1.fmt.formatResponse({
            name: "Suraj Pandey",
            message: 'It done',
        }));
    }
}
exports.default = BlogController;
