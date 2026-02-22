export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as BodyCreateDraft;

  if (
    !body.anilistId ||
    !body.episodeRatings ||
    !body.id_user ||
    !body.myTotalRating ||
    !body.progress ||
    !body.status
  ) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Failed',
      message: 'All field (Email, Name, Password, Username) is required!',
      data: {
        fields: {
          anilistId: !body.anilistId,
          episodeRatings: !body.episodeRatings,
          id_user: !body.id_user,
          myTotalRating: !body.myTotalRating,
          progress: !body.progress,
          status: !body.status,
        },
      },
    });
  }

  const existingDraft = await prisma.animeEntry.findUnique({
    where: {
      userId_anilistId: {
        userId: body.id_user,
        anilistId: body.anilistId,
      },
    },
  });

  if (existingDraft) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Conflict',
      message: 'This data is already created!.',
    });
  }

  const date = new Date();

  await prisma.animeEntry.create({
    data: {
      anilistId: body.anilistId,
      episodeRatings: body.episodeRatings,
      userId: body.id_user,
      myTotalRating: body.myTotalRating,
      progress: body.progress,
      status: body.status,
      updatedAt: date,
    },
  });
});
