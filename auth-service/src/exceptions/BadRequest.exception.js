class BadRequest extends Error {
  constructor(message, status = 400) {
    super(message)
    this.message = message
    this.status = status
    this.success = false
    this.code = 'BAD_REQUEST'
  }
}

export default BadRequest
