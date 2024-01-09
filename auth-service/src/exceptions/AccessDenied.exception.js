import AuthException from './Auth.exception.js'

class AccessDenied extends AuthException {
  constructor(params) {
    super({
      ...params,
      status: 401,
      code: 'ACCESS_DENIED',
    })
  }
}
export default AccessDenied
