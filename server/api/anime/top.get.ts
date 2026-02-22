import { TopAnimeResponse } from '~~/server/types/anilist';

export default defineEventHandler(async () => {
  const nitro = useNitroApp();
  const config = useRuntimeConfig();
  const key = `anime:top`;

  const redis = nitro.redis;

  if (redis) {
    // await redis?.del(key)
    const cached = await redis.get(key);
    if (cached) {
      const dataCache = JSON.parse(cached) as TopAnime;
      return {
        ...dataCache,
        type: 'cache',
      };
    }
  }

  const data = await $fetch<TopAnimeResponse>(
    config.public.anilistAPI as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: {
        query: queryTopAnime,
        variables: {
          page: 1,
          perPage: 10,
        },
      },
    },
  );

  if (redis) {
    await redis.set(key, JSON.stringify(data?.data), 'EX', 3600); // TTL 1 hour
  }

  return data?.data;
});
