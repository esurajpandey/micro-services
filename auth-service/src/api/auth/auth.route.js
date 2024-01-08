import { API_METHOD } from "../../config/const.js";
import authController from "./auth.controller.js";

const authRoutes = [
    {
        url : '/health',
        handler : authController.health,
        method : 'GET',
    },
    {
        url : '/register',
        handler : authController.register,
        method : API_METHOD.POST,
    },
    {
        url : '/login',
        handler : authController.login,
        method : API_METHOD.POST,
    }
]

export default authRoutes;