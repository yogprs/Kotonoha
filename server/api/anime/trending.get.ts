import { TrendingAnimeResponse } from "~~/server/types/anilist";
import { filterMediaHero } from "~~/server/utils/data";

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    const storage = useStorage('cache'); // Access the cache storage
    const key = `anime:trending`;

    const cached = await storage.getItem<TrendingAnime>(key);
    if (cached) {
        const hero = filterMediaHero(cached?.trending?.media as Media[])
        return {
            ...cached,
            type: 'cache',
            heroSection: {
                media: hero,
                index: hero?.index
            },
        };
    };

    const data = await $fetch<TrendingAnimeResponse>(config.public.anilistAPI as string, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: {
            query: queryTrendingAnime,
            variables: {
                page: 1,
                perPage: 15,
            }
        }
    });

    
    await storage.setItem(key, data?.data, {
        ttl: 60 * 30 * 2,
    });

    const media = data?.data?.trending?.media;

    const hero = filterMediaHero(media);

    return {
        ...data.data,
        heroSection: {
            media: hero,
            index: hero?.index
        },
    };
});