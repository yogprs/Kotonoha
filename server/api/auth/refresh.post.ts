import jwt from 'jsonwebtoken';
import { verifyRefreshToken } from '~~/server/utils/verifyToken';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { userId } = await verifyRefreshToken(event);

  // generate access token baru
  const accessToken = jwt.sign({ id: userId }, config.jwt_secret, {
    expiresIn: '15m',
  });

  setCookie(event, 'access_token', accessToken, {
    httpOnly: true,
    secure: config.app_mode === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15,
    path: '/',
  });

  return { success: true };
});
