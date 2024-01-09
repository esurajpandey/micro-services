import BlogException from "./BlogException.exception";

class NotFound extends BlogException {
  constructor(message: string = "Not found") {
    super(message, "E404", 404);
  }
}

export default NotFound;
