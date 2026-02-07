import { TopAnimeResponse } from "~~/server/types/anilist";
import { TopAnime } from "~~/shared/types/anilist";

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    const storage = useStorage('cache'); // Access the cache storage
    const key = `anime:top`;
    
    const cached = await storage.getItem<TopAnime>(key);
    if (cached) {
        return {
            ...cached,
            type: 'cache'
        }
    };

    const data = await $fetch<TopAnimeResponse>(config.public.anilistAPI as string, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: {
            query: queryTopAnime,
            variables: {
                page: 1,
                perPage: 10,
            }
        }
    })

    await storage.setItem(key, data?.data, {
        ttl: 60 * 30 * 2,
    });

    return data?.data;
})