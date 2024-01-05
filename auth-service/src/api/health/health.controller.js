
class HealthController{
    async check(request,response){
        response.status(200).send({
            message : 'Health checkup done'
        })
    }
}

export default new HealthController();