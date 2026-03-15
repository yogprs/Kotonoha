import jwt from 'jsonwebtoken';
import { prisma } from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const anilistId = Number(event.context.params?.id);
  if (!anilistId || isNaN(anilistId)) {
    throw createError({ statusCode: 400, message: 'Invalid anilist ID' });
  }

  const body = await readBody(event);
  const { status, progress, myTotalRating, episodeRatings } = body;

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret',
    );

    const entry = await prisma.animeEntry.upsert({
      where: {
        userId_anilistId: {
          userId: decoded.id,
          anilistId: anilistId,
        },
      },
      update: {
        status: status,
        progress: progress,
        myTotalRating: myTotalRating,
      },
      create: {
        userId: decoded.id,
        anilistId: anilistId,
        status: status || 'PLAN_TO_WATCH',
        progress: progress || 0,
        myTotalRating: myTotalRating || 0,
      },
    });

    return { success: true, entry, message: 'Anime entry saved successfully' };
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      message: err?.message || 'Failed to save anime entry',
    });
  }
});
