import BlogException from "./BlogException.exception";

class AccessDenied extends BlogException {
  constructor(message: string = "Access denied") {
    super(message, "ACCESS_DENIED", 401);
  }
}

export default AccessDenied;
