import jwt from 'jsonwebtoken';
import { prisma } from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' });

  const body = await readBody(event);
  if (!body.image) {
    throw createError({ statusCode: 400, message: 'Image URL is required' });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
  } catch (err) {
    throw createError({ statusCode: 401, message: 'Invalid token' });
  }

  const user = await prisma.user.update({
    where: { id: decoded.id },
    data: { image: body.image },
    select: { id: true, name: true, username: true, email: true, image: true },
  });

  return { success: true, message: 'Profile updated successfully', user };
});
