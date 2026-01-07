<script setup lang="ts">
import type { CustomCardProps } from "~/types/card";

withDefaults(defineProps<CustomCardProps>(), {
  hoverable: true,
  useBadgeEp: false,
});
</script>

<template>
  <div class="w-full h-full">
    <!-- IMAGE WRAPPER -->
    <div class="relative w-50 h-75 overflow-hidden rounded-lg">
      <!-- EP BADGE -->
      <div
        v-if="item?.currentEpisode && useBadgeEp"
        class="absolute z-20 top-[4%] left-2"
      >
        <div class="bg-primary px-2 rounded-md">
          <span class="text-sm">EP {{ item?.currentEpisode }}</span>
        </div>
      </div>

      <!-- IMAGE -->
      <NuxtImg :src="item?.img" class="w-full h-full object-cover" />

      <!-- BOTTOM SHADOW OVERLAY -->
      <div
        v-if="hoverable"
        class="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      ></div>

      <!-- INFO (ON SHADOW) -->
      <div
        v-if="hoverable"
        class="absolute z-10 bottom-4 left-0 right-0 hidden group-hover:flex gap-2 items-center justify-center text-white text-sm transition-all duration-300"
      >
        <span>{{ item?.format }}</span>
        <span>•</span>
        <span
          :class="[getStatusColor(item.status), 'py-1 rounded-md font-medium']"
          >{{ formatStatusText(item?.status) }}</span
        >
        <span>•</span>
        <span>Ep {{ item?.episode }}</span>
      </div>
    </div>

    <!-- TITLE -->
    <div v-if="hoverable" class="w-full text-center py-2">
      <span
        class="font-bold transition-colors duration-200 group-hover:text-text-secondary"
      >
        {{ item?.title }}
      </span>
    </div>
  </div>
</template>
