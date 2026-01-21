<script setup lang="ts">
import type { CustomCardEmits, CustomCardProps } from '@/types/card';

const props = withDefaults(defineProps<CustomCardProps>(), {
  hoverable: true,
  useBadgeEp: false,
});

const emits = defineEmits<CustomCardEmits>();

const cardToggle = (id: string) => {
  if (!props?.hoverable) return;
  emits('toggle', id);
};
</script>

<template>
  <div @click="cardToggle(item?.id)">
    <!-- IMAGE WRAPPER -->
    <div
      :class="[
        `${width ?? 'w-50'}`,
        `${height ?? 'h-75'}`,
        'relative overflow-hidden rounded-lg',
      ]"
    >
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
      <NuxtImg
        :src="item?.img"
        class="w-full h-full object-cover"
        loading="lazy"
      />

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
    <div v-if="hoverable" :class="`${width ?? 'w-50'} text-center py-2`">
      <span
        class="font-bold transition-colors duration-200 group-hover:text-text-secondary"
      >
        {{ item?.title }}
      </span>
    </div>
  </div>
</template>
