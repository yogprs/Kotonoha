import { AnimeResponse } from "~~/server/types/anilist";
import { cacheTTL } from "~~/server/utils/cache";
import { queryGetAnime } from "~~/server/utils/query";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const storage = useStorage('cache'); // Access the 'redis' storage defined above
  const key = `anime:detail`;
  const cached = await storage.getItem<AnimeResponse>(key);
  if (cached) return cached;

  const data = await $fetch<AnimeResponse>(config.public.anilistAPI as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: {
      query: queryGetAnime,
      variables: {
        "page": 1,
        "perPage": 10,
        "genre": "slice of life"
      }
    }
  });

  await storage.setItem(key, data, {
    ttl: cacheTTL // 2 jam
    // ttl: 60 * 30 // 30 menit
  });
  return data;
  // const cachedData = await storage.getItem('my-key');

  // if (cachedData) {
  //   return { data: cachedData, source: 'redis' };
  // }

  // // Simulate fetching data
  // const data = { message: "Hello from Redis-backed API!" };
  // await storage.setItem('my-key', data, { maxAge: 60 }); // Cache for 60 seconds

  // return { data: data, source: 'direct' };
});