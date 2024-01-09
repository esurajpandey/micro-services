class CustomException extends Error {
  public success: boolean;
  public code: string;
  public message: string;
  public status: number;
  constructor(
    message: string,
    code: string = "CUSTOM_EXCEPTION",
    status: number,
  ) {
    super(message);
    (this.success = false), (this.code = code);
    this.message = message;
    this.status = status || 500;
  }
}
export default CustomException;
