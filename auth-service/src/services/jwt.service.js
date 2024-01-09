import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

class JWT {
  generateToken(payload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' })
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret)
    } catch (error) {
      return null
    }
  }
}

export default new JWT()
