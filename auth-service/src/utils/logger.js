import { format, createLogger, transports } from 'winston'
const { combine, timestamp, label, printf } = format
const CATEGORY = 'auth-service'

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] - [${label}] | ${level} : ${message}`
})

const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    customFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: './logs/log.log',
    }),
    new transports.File({
      level: 'error',
      filename: './logs/error.log',
    }),
  ],
})

export const tracer = async (request, response, next) => {
  const log = {
    method: request.method,
    url: request.url,
    statusCode: response.statusCode,
  }

  logger.info(JSON.stringify(log))
  next()
}

export default logger
