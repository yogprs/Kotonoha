import { prisma } from '~~/server/utils/prisma';
import { getProfile } from '~~/server/utils/profile';
import { isValidEmail } from '~~/server/utils/data';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<RegisterBody>(event);

  if (!config.jwtSecret) {
    throw new Error('JWT secret not configured');
  }

  // validation
  if (!body.email || !body.name || !body.password || !body.username) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Failed',
    });
  }

  if (!isValidEmail(body.email)) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid email format',
    });
  }

  const username = body.username.toLowerCase();
  const email = body.email.toLowerCase();

  // check user
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage:
        existingUser.email === email
          ? 'Email already used'
          : 'Username already used',
    });
  }

  // hash password
  const hashed = await bcrypt.hash(body.password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      name: body.name,
      username,
      email,
      image: getProfile(config.dice_bear_image, 'initials', body.name),
      password: hashed,
    },
  });

  // ACCESS TOKEN
  const accessToken = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: '15m',
  });

  // REFRESH TOKEN
  const refreshToken = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: '7d',
  });

  // Save refresh token to DB
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  // cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
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
    message: 'Register success',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
    },
  };
});
