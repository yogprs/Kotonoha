<script setup lang="ts">
import type { CustomCarouselProps } from "~/types/carousel";

withDefaults(defineProps<CustomCarouselProps>(), {
  useBadgeEp: false,
});
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :loop="false"
    :autoplay="false"
    :items="items"
    :ui="{
      root: 'px-14',
      item: 'basis-auto group cursor-pointer',
      arrows: 'absolute -top-[12%] right-[8.5%]',
      prev: 'cursor-pointer bg-surface-dark',
      next: 'cursor-pointer bg-surface-dark',
    }"
    arrows
    prev-icon="i-material-symbols:arrow-back-ios-new"
    next-icon="i-material-symbols:arrow-forward-ios"
  >
    <Card :hoverable="true" :use-badge-ep="useBadgeEp" :item="item" />
  </UCarousel>
</template>
