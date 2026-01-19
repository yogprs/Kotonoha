<script setup lang="ts">
import type { CustomCarouselProps } from "~/types/carousel";

withDefaults(defineProps<CustomCarouselProps>(), {
  useBadgeEp: false,
});

// const isMobile = useMediaQuery("(max-width: 768px)");

const carouselUIStyle = {
  root: "relative px-4 md:px-14",
  item: "basis-auto w-full md:w-auto flex justify-center md:block group cursor-pointer",
  // Gunakan koordinat yang berbeda untuk mobile vs desktop lewat tailwind
  arrows:
    "absolute inset-x-0 top-[40%] z-20 md:inset-auto md:-top-[12%] md:right-[4%] flex justify-between md:justify-end md:gap-2 pointer-events-none",
  prev: "cursor-pointer bg-surface-dark pointer-events-auto relative !transform-none md:!static",
  next: "cursor-pointer bg-surface-dark pointer-events-auto relative !transform-none md:!static",
};
</script>

<template>
  <UCarousel
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
    <Card :hoverable="true" :use-badge-ep="useBadgeEp" :item="item" />
  </UCarousel>
</template>
