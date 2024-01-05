import healthController from "./health.controller.js";

const healthRoutes = [
    {
        url : '/',
        handler : healthController.check,
        method : 'GET',
    }
]

export default healthRoutes;