import { prisma } from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token');

  if (refreshToken) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  deleteCookie(event, 'access_token');
  deleteCookie(event, 'refresh_token');

  return { success: true };
});
