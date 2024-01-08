import client from "../../utils/prisma.js";

class AuthDao {
    async getUserByEmail (email ) {
        return await client.users.findUnique({
            where : { email}
        });
    }

    async createUser (params) {
        return await client.users.create({
            data : {
                email : params.email,
                name : params.name,
                phoneNumber : params.phoneNumber,
                role : params?.role || 'USER',
                password : params.password,
            }
        });
    }

}

export default AuthDao;