import { AnimeDetail, AnimeDetailResponse } from '~~/server/types/anilist';

export default defineEventHandler(async (event) => {
  const nitro = useNitroApp();
  const config = useRuntimeConfig();
  const id = getRouterParam(event, 'id');
  const key = `anime:detail:${id}`;

  const redis = nitro.redis;

  if (redis) {
    await redis?.del(key);
    const cached = await redis.get(key);
    if (cached) {
      const dataCache = JSON.parse(cached) as AnimeDetail;
      return {
        ...dataCache,
        type: 'cache',
      };
    }
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
        query: queryDetailAnime,
        variables: {
          mediaId: id,
        },
      },
    },
  );

  if (redis) {
    await redis.set(key, JSON.stringify(data?.data), 'EX', 1800); // TTL 30 minutes
  }

  return data?.data;
});
