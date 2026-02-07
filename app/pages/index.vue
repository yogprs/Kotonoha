<script setup lang="ts">
import type { TopAnime } from '~~/shared/types/anilist';
import type { HeroSectionData } from '../types/heroSection';

const { data: trending } = useLazyFetch<TrendingAnimeWithSection>(
  '/api/anime/trending',
  {
    server: false,
  },
);

const { data: popular } = useLazyFetch<PopularAnime>('/api/anime/popular', {
  server: false,
});

const { data: top } = useLazyFetch<TopAnime>('/api/anime/top', {
  server: false,
});
</script>
<template>
  <HomeHeroSection :data="(trending?.heroSection as HeroSectionData) ?? {}" />
  <div class="h-full flex flex-col gap-6 pt-16 pb-8">
    <div class="flex items-center gap-4 px-4 md:px-14">
      <UIcon
        name="i-material-symbols:trending-up"
        class="size-6 text-primary"
      />
      <h3 class="font-bold text-2xl">Currently Trending</h3>
    </div>
    <div class="h-full">
      <Carousel :media="(trending?.trending?.media as Media[]) ?? []" />
    </div>
  </div>
  <div class="h-full flex flex-col gap-6 pt-16 pb-8">
    <div class="flex items-center gap-4 px-4 md:px-14">
      <UIcon name="i-material-symbols:trophy" class="size-6 text-primary" />
      <h3 class="font-bold text-2xl">All Time Popular</h3>
    </div>
    <div class="h-full">
      <Carousel :media="(popular?.popular?.media as Media[]) ?? []" />
    </div>
  </div>
  <div class="w-full h-full">
    <div class="w-full h-full flex flex-col gap-6 pt-16 pb-8">
      <div class="flex items-center gap-4 px-4 md:px-14">
        <UIcon
          name="i-material-symbols:award-star"
          class="size-6 text-primary"
        />
        <h3 class="font-bold text-2xl">Top 10 Anime</h3>
      </div>
      <div class="h-full px-4 md:px-14 pb-8">
        <TopAnime :data="(top?.top?.media as Media[]) ?? []" />
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.herowrap {
  background:
    linear-gradient(180deg, hsla(0, 0%, 100%, 0) 40%, #000),
    linear-gradient(180deg, rgba(0, 0, 0, 0.624), hsla(0, 0%, 100%, 0) 30%),
    linear-gradient(270deg, hsla(0, 0%, 99%, 0) 40%, rgba(0, 0, 0, 0.541) 80%);
}
</style>
