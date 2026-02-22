import { TrendingAnimeResponse } from '~~/server/types/anilist';
import { filterMediaHero } from '~~/server/utils/data';

export default defineEventHandler(async () => {
  const nitro = useNitroApp();
  const config = useRuntimeConfig();
  const key = `anime:trending`;

  const redis = nitro.redis;
  if (redis) {
    // await redis?.del(key)
    const cached = await redis.get(key);
    if (cached) {
      const dataCache = JSON.parse(cached) as TrendingAnime;
      const hero = filterMediaHero(dataCache?.trending?.media as Media[]);

      return {
        ...dataCache,
        heroSection: hero,
        type: 'cache',
      };
    }
  }

  const data = await $fetch<TrendingAnimeResponse>(
    config.public.anilistAPI as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: {
        query: queryTrendingAnime,
        variables: {
          page: 1,
          perPage: 15,
        },
      },
    },
  );

  if (redis) {
    await redis.set(key, JSON.stringify(data?.data), 'EX', 3600); // TTL 1 hour
  }

  const media = data?.data?.trending?.media;

  const hero = filterMediaHero(media);

  return {
    ...data.data,
    heroSection: hero,
  };
});
