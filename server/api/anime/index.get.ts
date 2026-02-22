import { AnimeDetailResponse, QueryGetAnime } from '~~/server/types/anilist';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event) as QueryGetAnime;

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
