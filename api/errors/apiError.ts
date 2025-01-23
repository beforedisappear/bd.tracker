export class ApiError extends Error {
  public status: number;
  public statusText: string | undefined;

  constructor(message: string, status: number, statusText?: string) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  static badRequest(message: string) {
    return new ApiError(message, 400, 'Bad request');
  }

  static unauthorized(message: string) {
    return new ApiError(message, 401, 'Unauthorized');
  }

  static forbidden(message: string) {
    return new ApiError(message, 403, 'Forbidden');
  }

  static notFound(message: string) {
    return new ApiError(message, 404, 'Not found');
  }

  static internal(message: string) {
    return new ApiError(message, 500, 'Internal Server Error');
  }

  static conflict(message: string) {
    return new ApiError(message, 409, 'Conflict');
  }
}
