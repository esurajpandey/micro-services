class Formatter {
  successResponse(data, message = 'Success message') {
    return {
      data: data || null,
      message: message,
      code: 'S200',
      success: true,
    }
  }
  errorResponse(data, message) {
    return {
      data: data || null,
      message: message || 'Error message',
      code: 'ERROR',
      success: false,
    }
  }
}

export default new Formatter()
