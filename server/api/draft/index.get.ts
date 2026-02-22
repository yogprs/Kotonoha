import { prisma } from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as QueryGetDraft;

  if (!query.id_draft) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Failed',
      message: 'id draft is required!.',
    });
  }

  const draft = await prisma.animeEntry.findUnique({
    where: {
      id: query?.id_draft,
    },
  });
  // const user = await prisma.user.create()
  return {
    data: draft,
  };
});
