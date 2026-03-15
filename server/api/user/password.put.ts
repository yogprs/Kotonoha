import jwt from 'jsonwebtoken';
import { prisma } from '~~/server/utils/prisma';
import bcrypt from 'bcryptjs';
import { verifyAccessToken } from '~~/server/utils/verifyToken';

export default defineEventHandler(async (event) => {
  const userToken = verifyAccessToken(event);
  const body = await readBody(event);
  if (!body.currentPassword || !body.newPassword) {
    throw createError({
      statusCode: 400,
      message: 'Password fields are required',
    });
  }

  const user = await prisma.user.findUnique({ where: { id: userToken.id } });
  if (!user) throw createError({ statusCode: 401, message: 'User not found' });

  const isValid = await bcrypt.compare(body.currentPassword, user.password);
  if (!isValid)
    throw createError({
      statusCode: 401,
      message: 'Incorrect current password',
    });

  const hashed = await bcrypt.hash(body.newPassword, 10);
  await prisma.user.update({
    where: { id: userToken.id },
    data: { password: hashed },
  });

  return { success: true, message: 'Password updated successfully' };
});
