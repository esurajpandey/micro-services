import BlogException from "./BlogException.exception";

class UnAuthorized extends BlogException {
  constructor(message: string = "UnAuthorized") {
    super(message, "UN_AUTHORIZED", 401);
  }
}

export default UnAuthorized;
