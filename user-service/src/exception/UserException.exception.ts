class UserException extends Error {
  public success: boolean;
  public code: string;
  public message: string;
  public status: number;
  constructor(
    message: string = "Something went wrong!",
    code: string = "E500",
    status: number,
  ) {
    super(message);
    (this.success = false), (this.code = code);
    this.message = message;
    this.status = status || 500;
  }
}

export default UserException;
