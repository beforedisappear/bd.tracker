export type AuthDtoReq = {
  email: string;
};

export type LoginDtoReq = {
  code: string;
} & AuthDtoReq;

export type LoginDtoRes = {
  refreshToken: string;
  exp: Date;
  accessToken: string;
};
