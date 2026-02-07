import { PopularAnimeResponse } from "~~/server/types/anilist";
import { PopularAnime } from "~~/shared/types/anilist";

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    const storage = useStorage('cache'); // Access the cache storage
    const key = `anime:popular`;
    const cached = await storage.getItem<PopularAnime>(key);

    if (cached) {
        return {
            ...cached,
            type: 'cache'
        }
    };

    const data = await $fetch<PopularAnimeResponse>(config.public.anilistAPI as string, {
         method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: {
            query: queryPopularAnime,
            variables: {
                page: 1,
                perPage: 15,
            }
        }
    });

    await storage.setItem(key, data?.data, {
        ttl: 60 * 30 * 2,
    });

    return  data?.data;
})