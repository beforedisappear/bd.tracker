export enum CodeError {
  'INCORRECT_OR_INVALID_CODE' = '1004',
  'EMAIL_ALREADY_TAKEN' = '1010',
  'TEAM_NAME_ALREADY_TAKEN' = '1020',
  'TEAM_COUNT_EXCEEDED' = '1021',
  'TEAM_COUNT_MIN' = '1022',
  'TEAM_CANT_BE_DELETED_BY_NON_OWNER' = '1023',
  'TEAM_CANT_BE_RENAMED_BY_NON_OWNER_OR_NON_ADMIN' = '1024',
  'TEAM_INVITATION_ALREADY_ACCEPTED' = '1025',
  'TEAM_MEMBER_ALREADY_EXISTS' = '1026',
}

interface IParams {
  message: string;
  status: number;
  code?: CodeError;
  statusText?: string;
}

export class ApiError extends Error {
  public status: number;
  public statusText: string | undefined;
  public code: CodeError | undefined;

  constructor({ message, status, statusText, code }: IParams) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  static badRequest(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 400,
      statusText: 'Bad request',
      code,
    });
  }

  static unauthorized(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 401,
      statusText: 'Unauthorized',
      code,
    });
  }

  static forbidden(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 403,
      statusText: 'Forbidden',
      code,
    });
  }

  static notFound(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 404,
      statusText: 'Not found',
      code,
    });
  }

  static internal(message: string, code?: CodeError) {
    return new ApiError({
      message,
      status: 500,
      statusText: 'Internal Server Error',
      code,
    });
  }

  static conflict(message: string, code?: CodeError) {
    return new ApiError({ message, status: 409, statusText: 'Conflict', code });
  }
}
