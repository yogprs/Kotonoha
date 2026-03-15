import jwt from 'jsonwebtoken';
import type { H3Event } from 'h3';

interface RefreshTokenPayload {
  id: string;
}

export function verifyAccessToken(event: H3Event) {
  const config = useRuntimeConfig();
  const token = getCookie(event, 'access_token');

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  try {
    return jwt.verify(token, config.jwt_secret) as { id: string };
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
  }
}

export async function verifyRefreshToken(event: H3Event) {
  const config = useRuntimeConfig();
  const token = getCookie(event, 'refresh_token');

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No refresh token provided',
    });
  }

  // check token (db)
  const tokenRecord = await prisma.refreshToken.findUnique({
    where: { token },
  });

  if (!tokenRecord) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid refresh token',
    });
  }

  // Expired check
  if (tokenRecord.expiresAt < new Date()) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Refresh token expired',
    });
  }

  if (!config.jwt_secret) {
    throw new Error('JWT_SECRET not defined');
  }

  // verify JWT
  try {
    const payload = jwt.verify(token, config.jwt_secret) as RefreshTokenPayload;
    return {
      userId: payload.id,
      tokenRecord,
    };
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid refresh token',
    });
  }
}
