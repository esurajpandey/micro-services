import BlogException from "./BlogException.exception";

class BadRequest extends BlogException {
  constructor(message: string = "Bad request") {
    super(message, "E400", 400);
  }
}
export default BadRequest;
