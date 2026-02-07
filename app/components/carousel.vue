<script setup lang="ts">
import type {
  CustomCarouselItem,
  CustomCarouselProps,
} from '../types/carousel.ts';

const props = withDefaults(defineProps<CustomCarouselProps>(), {
  useBadgeEp: false,
});

// const isMobile = useMediaQuery("(max-width: 768px)");

const count = ref<number>(6);

const carouselUIStyle = {
  root: 'relative px-12 md:px-14',
  item: 'basis-auto md:basis-60 w-full md:w-auto flex justify-center md:block group cursor-pointer',
  arrows:
    'absolute inset-x-2 top-[40%] z-20 md:inset-auto md:-top-[12%] md:right-[4%] flex justify-between md:justify-end md:gap-2 pointer-events-none',
  prev: 'cursor-pointer bg-surface-dark pointer-events-auto relative !transform-none md:!static',
  next: 'cursor-pointer bg-surface-dark pointer-events-auto relative !transform-none md:!static',
};

const items = computed((): CustomCarouselItem[] => {
  if (props?.media && props?.media?.length > 0) {
    return props?.media?.map((val) => ({
      id: val?.id,
      title: val?.title?.romaji,
      img: val?.coverImage?.large,
      status: val?.status,
      format: val?.format,
      episode: val?.episodes as number,
      currentEpisode: val?.nextAiringEpisode?.episode ?? val?.episodes,
    })) as CustomCarouselItem[];
  }
  return [];
});
</script>

<template>
  <div
    v-if="items?.length === 0"
    class="flex gap-6 overflow-hidden justify-center px-4 md:px-14"
  >
    <div
      v-for="i in count"
      :key="i"
      class="
    w-60 md:w-50 shrink-0 space-y-3
    hidden
    nth-[-n+1]:block
    md:nth-[-n+3]:block
    lg:nth-[-n+6]:block
  "
      <!-- Poster -->
      <USkeleton class="h-80 md:h-75 w-full rounded-xl" />

      <!-- Title -->
      <USkeleton class="h-5 w-3/4" />
    </div>
  </div>
  <UCarousel
    v-else
    v-slot="{ item }"
    :loop="false"
    :autoplay="false"
    :items="items"
    :ui="carouselUIStyle"
    orientation="horizontal"
    arrows
    prev-icon="i-material-symbols:arrow-back-ios-new"
    next-icon="i-material-symbols:arrow-forward-ios"
  >
    <Card
      :hoverable="true"
      :use-badge-ep="useBadgeEp"
      :item="item"
      width="w-[250px] md:w-auto"
      height="aspect-[2/3] md:h-auto"
    />
  </UCarousel>
</template>
