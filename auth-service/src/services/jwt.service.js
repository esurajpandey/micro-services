import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

class JWT {
  generateToken(payload) {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: '1d',
    })
  }

  verifyToken(token) {
    try {
      const data = jwt.decode(token.token, config.jwtSecret)
      return data
    } catch (error) {
      return null
    }
  }
}

export default new JWT()
