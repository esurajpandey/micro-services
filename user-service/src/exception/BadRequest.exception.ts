import UserException from "./UserException.exception";

class BadRequest extends UserException {
  constructor(message: string = "Bad request") {
    super(message, "E400", 400);
  }
}
export default BadRequest;
