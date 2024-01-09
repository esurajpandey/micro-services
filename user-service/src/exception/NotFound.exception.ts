import UserException from "./UserException.exception";

class NotFound extends UserException {
  constructor(message: string = "Not found") {
    super(message, "E404", 404);
  }
}

export default NotFound;
