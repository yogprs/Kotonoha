import jwt from 'jsonwebtoken';
import { prisma } from '~~/server/utils/prisma';
import { verifyAccessToken } from '~~/server/utils/verifyToken';

export default defineEventHandler(async (event) => {
  const user = verifyAccessToken(event);

  const existingUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Conflict',
      message: 'User is not found!.',
    });
  }

  // delete user
  await prisma.user.delete({ where: { id: user?.id } });

  // logout
  deleteCookie(event, 'access_token');
  deleteCookie(event, 'refresh_token');

  return { success: true, message: 'Account deleted successfully' };
});
