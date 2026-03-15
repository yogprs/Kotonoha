import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<{
    identifier: string;
    password: string;
  }>(event);

  if (!config.jwt_secret) {
    throw new Error('JWT secret not configured');
  }

  if (!body?.identifier || !body?.password) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Failed',
    });
  }

  const identifier = body.identifier.toLowerCase();

  // find user
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: identifier }, { email: identifier }],
    },
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  // check password
  const match = await bcrypt.compare(body.password, user.password);
  if (!match) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  // generate tokens
  const accessToken = jwt.sign({ id: user.id }, config.jwt_secret, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ id: user.id }, config.jwt_secret, {
    expiresIn: '7d',
  });

  // optional: limit max session
  await prisma.refreshToken.deleteMany({
    where: { userId: user.id },
  });

  // save refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const cookieOptions = {
    httpOnly: true,
    secure: config.app_mode === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };

  setCookie(event, 'access_token', accessToken, {
    ...cookieOptions,
    maxAge: 60 * 15,
  });

  setCookie(event, 'refresh_token', refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    success: true,
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
    },
  };
});
