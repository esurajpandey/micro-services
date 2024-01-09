import UserException from "./UserException.exception";

class AccessDenied extends UserException {
  constructor(message: string = "Access denied") {
    super(message, "ACCESS_DENIED", 401);
  }
}

export default AccessDenied;
