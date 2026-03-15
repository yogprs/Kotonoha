import { prisma } from '~~/server/utils/prisma';
import { verifyAccessToken } from '~~/server/utils/verifyToken';

export default defineEventHandler(async (event) => {
  // access token
  const config = useRuntimeConfig();
  const user = verifyAccessToken(event);

  const anilistId = Number(event.context.params?.id);
  if (!anilistId || isNaN(anilistId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid anilist ID' });
  }

  const entry = await prisma.animeEntry.findUnique({
    where: {
      userId_anilistId: {
        userId: user.id,
        anilistId,
      },
    },
  });

  return { success: true, entry };
});
