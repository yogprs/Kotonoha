import { AnimeDetailResponse, QueryGetAnime } from '~~/server/types/anilist';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const accept = getHeader(event, 'accept');
  const query = getQuery(event) as QueryGetAnime;

  if (!accept?.includes('application/json')) {
    throw createError({ statusCode: 403 });
  }

  const data = await $fetch<AnimeDetailResponse>(
    config.public.anilistAPI as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: {
        query: querySearchAnime,
        variables: variablesSearch(
          query?.page ?? 1,
          query?.search,
          query?.seasonYear,
          query?.season,
          query?.format,
          query?.genres,
          query?.sort,
        ),
      },
    },
  );

  return data?.data;
});
