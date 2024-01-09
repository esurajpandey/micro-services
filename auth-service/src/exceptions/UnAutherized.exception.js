import AuthException from './Auth.exception.js'

class UnAuthorized extends AuthException {
  constructor(params) {
    super({
      ...params,
      code: 'UN_AUTHORIZED',
      status: 401,
    })
  }
}

export default UnAuthorized
