const SESSION_TIMEOUT = 60 * 60 * 24 * 30 * 1000; // 30 days

export const getCookieConfig = (expiresIn?: Date) => {
  const date = new Date(new Date().getTime() + SESSION_TIMEOUT);

  return {
    domain:
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_PROD_URL
        : undefined,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV !== 'development',
    expires: expiresIn ?? date,
  };
};
