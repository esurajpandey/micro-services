import UserException from "./UserException.exception";

class UnAuthorized extends UserException {
  constructor(message: string = "UnAuthorized") {
    super(message, "UN_AUTHORIZED", 401);
  }
}

export default UnAuthorized;
