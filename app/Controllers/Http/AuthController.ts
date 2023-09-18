import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import UserValidator from '../../Validators/UserValidator'

export default class AuthController {
    
    public async register({request}:HttpContextContract){
        const data = await request.validate(UserValidator)
        const userDb = await User.create(data)
        return userDb
    }

    public async login({request, auth, response}:HttpContextContract){
        try{
            const{cpf, password} = request.all()
            const token = await auth.use('api').attempt(cpf, password, {
                expiresIn:'1day'
            })
            const user = await User.findByOrFail("cpf", cpf)
            return {token, user}
        }catch(error){
             response.status(401).send("Login ou senha incorretos!!!")
        }
    }
}
