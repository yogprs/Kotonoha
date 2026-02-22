import { RecommendationsAnimeResponse } from '~~/server/types/anilist';
import { queryRecommendationsAnime } from '~~/server/utils/query';

export default defineEventHandler(async () => {
  const nitro = useNitroApp();
  const config = useRuntimeConfig();
  const key = `anime:recommendations`;

  const redis = nitro.redis;

  if (redis) {
    // await redis?.del(key);
    const cached = await redis.get(key);
    if (cached) {
      const dataCache = JSON.parse(cached) as RecommendationsAnime;
      return {
        ...dataCache,
        type: 'cache',
      };
    }
  }

  // Random number (1 - 10)
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const data = await $fetch<RecommendationsAnimeResponse>(
    config.public.anilistAPI as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: {
        query: queryRecommendationsAnime,
        variables: {
          page: randomNumber,
          perPage: 15,
        },
      },
    },
  );

  if (redis) {
    await redis.set(key, JSON.stringify(data?.data), 'EX', 7200); // TTL 2 hour
    // await redis.set(key, JSON.stringify(data), 'EX', 20) // TTL 20 sec
  }
  return data?.data;
});
