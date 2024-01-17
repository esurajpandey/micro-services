import cors from 'cors'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs/promises'
import logger, { tracer } from '../src/utils/logger.js'
import ErrorHandler from './utils/ErrorHandler.js'
class App {
  constructor() {
    this.app = new express()
    this.enbaleCors()
    this.initializePreHandlers()
    this.initializeRoutes()
      .then(() => {
        logger.info(`[Auth-Service]-[Routers] has been initialied`)
        this.initializeErrorHandler()
      })
      .catch((error) => {
        console.log(error)
        logger.error({
          message: '[Auth-Service]-[Routers] initialization error',
          error,
        })
      })
  }

  async initializeRoutes() {
    const router = express.Router()

    const __dirname = new URL('.', import.meta.url).pathname
    const apiDirectory = path.join(__dirname, '/api')

    const apisPaths = await fs.readdir(apiDirectory)
    for (const api of apisPaths) {
      const routePath = path.join(apiDirectory, api, 'index.js')
      const routerModule = await import(routePath)
      const routes = routerModule.default
      await routes(router)
      this.app.use(`/auth-service/${api}`, router)
    }
  }

  initializeErrorHandler() {
    this.app.use(ErrorHandler)
  }
  initializePreHandlers() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(tracer)
  }

  connectPrisma() {
    const client = new PrismaClient()
    return client.$connect()
  }

  listenServer(options, callback) {
    try {
      this.app.listen(options, callback)
    } catch (error) {
      callback(error)
    }
  }

  enbaleCors() {
    this.app.use(
      cors({
        origin: '*', //allow all
      }),
    )
  }
}

export default App
