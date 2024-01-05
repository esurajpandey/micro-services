import authController from "./auth.controller.js";
const authRoutes = [
    {
        url : '/health',
        handler : authController.health,
        method : 'GET',
    }
]

export default authRoutes;