import { PopularAnimeResponse } from "~~/server/types/anilist";

export default defineEventHandler(async () => {
    const nitro = useNitroApp()
    const config = useRuntimeConfig();

    const key = `anime:popular`;
    const redis = nitro.redis;
    if (redis) {
        // await redis?.del(key)
        const cached = await redis.get(key)
        if (cached) {
            const dataCache = JSON.parse(cached) as PopularAnime
            return {
                 ...dataCache,
                type: 'cache'
            }
        };
    }

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

    if (redis) {
        await redis.set(key, JSON.stringify(data?.data), 'EX', 3600) // TTL 1 hour
        // await redis.set(key, JSON.stringify(data), 'EX', 20) // TTL 20 sec
    }

    return  data?.data;
})