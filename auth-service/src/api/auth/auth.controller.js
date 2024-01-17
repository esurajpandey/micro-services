import AuthDao from './auth.dao.js'
import fmt from '../../config/formatter.js'
import BadRequest from '../../exceptions/BadRequest.exception.js'
import CustomException from '../../exceptions/Customize.exception.js'
import bcrypt from 'bcryptjs'
import UnAuthorized from '../../exceptions/UnAutherized.exception.js'
import jwtService from '../../services/jwt.service.js'

const authDao = new AuthDao()

class AuthController {
  async health(request, response) {
    response.status(200).send({
      message: 'Auth health checkup done',
    })
  }

  async register(request, response, next) {
    try {
      const isUser = await authDao.getUserByEmail(request?.body?.email)
      if (isUser) {
        throw new BadRequest('Email is already registered')
      }

      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(request.body.password, salt)
      const user = await authDao.createUser({
        ...request.body,
        password: password,
      })

      if (!user) {
        throw new CustomException({ message: 'Unable to create user' })
      }
      return response
        .status(200)
        .send(fmt.successResponse(user, 'User has been registered'))
    } catch (error) {
      next(error)
    }
  }

  async login(request, response, next) {
    try {
      const user = await authDao.getUserByEmail(request.body.email)

      if (!user) {
        throw new BadRequest('User not exist', 400)
      }

      const isMatched = await bcrypt.compare(
        request.body.password,
        user.password,
      )

      if (!isMatched) {
        throw new UnAuthorized({
          message: 'Incorrect password',
        })
      }

      const tokenData = {
        role: user.role,
        email: user.email,
        userId: user.id,
        name: user.name,
      }

      const token = jwtService.generateToken(tokenData)

      response.status(200).send(
        fmt.successResponse(
          {
            user: user,
            token: token,
          },
          'Login successful',
        ),
      )
    } catch (error) {
      // console.log(error)
      next(error)
    }
  }

  async forgetPassword(request, response) {}
}

export default new AuthController()
