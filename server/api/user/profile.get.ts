import jwt from 'jsonwebtoken';
import { prisma } from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, 'access_token');
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  try {
    const decoded: any = jwt.verify(
      token,
      config.jwt_secret || 'fallback-secret',
    );
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      throw createError({ statusCode: 401, message: 'User not found' });
    }

    return { success: true, user };
  } catch (err) {
    throw createError({ statusCode: 401, message: 'Invalid token' });
  }
});
