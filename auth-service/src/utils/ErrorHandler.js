export default async function ErrorHandler(error, request, response, next) {
  const code = error.code || 'E500'
  const message = error.message || 'Something went wrong!'
  const status = error.status || 500
  const data = error.data || null
  return response.status(status).send({
    data,
    message,
    code,
  })
}
