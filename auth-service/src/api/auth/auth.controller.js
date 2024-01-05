
class AuthController{
    async health(request,response){
        response.status(200).send({
            message : 'Auth health checkup done'
        })
    }
}

export default new AuthController();