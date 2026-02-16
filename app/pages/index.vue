<script setup lang="ts">
import type { RecommendationsAnime, TopAnime } from '~~/shared/types/anilist';

const { data: trending } = useLazyFetch<TrendingAnimeWithSection>(
  '/api/anime/trending',
  {
    server: false,
  },
);

const { data: recommendation } = useLazyFetch<RecommendationsAnime>(
  '/api/anime/recommendations',
  {
    server: false,
  },
);

const { data: top } = useLazyFetch<TopAnime>('/api/anime/top', {
  server: false,
});

const { data: popular } = useLazyFetch<PopularAnime>('/api/anime/popular', {
  server: false,
});

const showType = ref<'top' | 'popular'>('top');

const heroData = computed(() => {
  if (!trending?.value) return [];

  return trending?.value?.heroSection?.map((data) => ({
    id: data?.id,
    title: data?.title?.romaji,
    image: data?.bannerImage ?? data?.coverImage?.extraLarge,
    genres: data?.genres,
    rating: data?.averageScore ? formatScore(data?.averageScore) : 0,
    synopsis: data?.description
      ? data?.description?.replace(/<.*?>/g, '')
      : '-',
    year: data?.seasonYear ?? '-',
    episodes:
      (data?.nextAiringEpisode?.episode as number) - 1 || data?.episodes,
  }));
});

const showVerticalData = computed(() => {
  return [
    {
      type: 'top',
      icon: 'i-material-symbols:award-star',
      title: 'Top 10 Anime',
      data: top.value?.top?.media ?? [],
    },
    {
      type: 'popular',
      icon: 'i-material-symbols:trophy',
      title: 'All Time Popular',
      data: popular.value?.popular?.media ?? [],
    },
  ];
});

const recommendationData = computed(() => {
  return recommendation?.value?.recommendation?.recommendations?.map(
    (data) => data?.media,
  );
});

const setShowType = (type: 'top' | 'popular'): void => {
  if (type === showType.value) return;
  showType.value = type;
};
</script>
<template>
  <div
    v-if="heroData?.length === 0"
    class="relative w-full h-[80vh] bg-black/60"
  >
    <USkeleton class="absolute inset-0 rounded-none" />
    <div class="absolute bottom-24 left-10 w-[50%] space-y-4">
      <USkeleton class="h-10 w-3/4" />
      <USkeleton class="h-4 w-1/2" />
      <USkeleton class="h-4 w-2/3" />
      <USkeleton class="h-10 w-40 rounded-full" />
    </div>
  </div>
  <HomeHero
    v-else
    :slides="heroData"
    :autoplay="true"
    :interval="6000"
    :transition-duration="0.9"
    :show-dots="true"
    :show-arrows="false"
    height="80vh"
  />

  <div class="h-full flex flex-col gap-6 pt-16 pb-4">
    <div class="flex items-center gap-4 px-4 md:px-14">
      <UIcon
        name="i-material-symbols:trending-up"
        class="size-6 text-primary"
      />
      <h3 class="font-bold text-2xl">Currently Trending</h3>
    </div>
    <div class="h-full">
      <HomeCarouselAnime :media="trending?.trending?.media ?? []" />
    </div>
  </div>
  <div class="h-full flex flex-col gap-6 pt-8 pb-4">
    <div class="flex items-center gap-4 px-4 md:px-14">
      <UIcon
        name="i-material-symbols:personalized-recommendations"
        class="size-6 text-primary"
      />
      <h3 class="font-bold text-2xl">Recommendations</h3>
    </div>
    <div class="h-full">
      <HomeCarouselAnime :media="recommendationData ?? []" />
    </div>
  </div>
  <div class="w-full h-full">
    <!-- Vertical List Desktop -->
    <div class="hidden lg:flex lg:flex-row px-4 md:px-14">
      <div
        :key="data?.type"
        v-for="data in showVerticalData"
        class="w-full h-full flex flex-col gap-6 pt-8 pb-4"
      >
        <div class="flex items-center gap-4">
          <UIcon :name="data?.icon" class="size-6 text-primary" />
          <div class="flex lg:block justify-between">
            <h3 class="font-bold text-2xl">{{ data?.title }}</h3>
          </div>
        </div>
        <div class="w-full h-full px-4 pb-8">
          <HomeVerticalList :media="data?.data ?? []" />
        </div>
      </div>
    </div>

    <!-- Vertical List Mobile -->
    <div class="lg:hidden flex flex-col px-4 pt-8 pb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <UIcon
            :name="
              showType === 'top'
                ? 'i-material-symbols:award-star'
                : 'i-material-symbols:trophy'
            "
            class="size-6 text-primary"
          />
          <h3 class="font-bold text-2xl">
            {{ showType === 'top' ? 'Top 10 Anime' : 'All Time Popular' }}
          </h3>
        </div>

        <span
          class="text-sm text-primary cursor-pointer"
          @click="setShowType(showType === 'top' ? 'popular' : 'top')"
        >
          {{ showType === 'top' ? 'Show Popular' : 'Show Top Anime' }}
        </span>
      </div>

      <div class="w-full h-full py-8">
        <HomeVerticalList
          :media="
            showType === 'top'
              ? (showVerticalData[0]?.data as Media[])
              : (showVerticalData[1]?.data as Media[])
          "
        />
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
