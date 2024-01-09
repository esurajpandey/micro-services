import Config from './config.js'
import dotenv from 'dotenv'

if (!process.env.NODE_ENV) {
  dotenv.config()
}

const config = new Config(process.env)

export { config }
