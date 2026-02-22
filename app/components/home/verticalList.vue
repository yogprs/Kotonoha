<script setup lang="ts">
import type { verticalListProps } from '../../types/verticalList';
const props = defineProps<verticalListProps>();

const count = ref<number>(10);

const animeData = computed(() => {
  if (props?.media && props?.media?.length > 0) {
    return props?.media;
  }

  return [];
});

const getColor = (num: number) => {
  if (num === 1) {
    return 'text-[#FFD700]';
  } else if (num === 2) {
    return 'text-[#C0C0C0]';
  } else if (num === 3) {
    return 'text-[#CD7F32]';
  } else {
    return 'text-[#388E3C]';
  }
};

const getDataEpsDuration = (
  format: MediaFormat,
  eps: number,
  duration: number,
) => {
  if (format === 'TV') {
    if (!eps) return '-';
    return `${eps} episodes`;
  }

  if (!duration) return '-';

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}m`;
};
</script>

<template>
  <div
    v-if="animeData?.length === 0"
    :key="i"
    v-for="i in count"
    class="w-90 md:w-170 flex items-center relative py-2"
  >
    <div class="w-10 hidden md:block text-center">
      <USkeleton class="h-6 w-6 mx-auto" />
    </div>
    <div class="w-full bg-gray-800/30 flex items-center gap-2 rounded-xl p-2">
      <!-- Image -->
      <USkeleton class="w-20 h-24 md:h-27.5" />

      <!-- Left Content -->
      <div class="flex-1 flex-col">
        <USkeleton class="h-5 w-1/2 md:w-1/6 rounded-lg" />

        <div class="flex gap-1 pt-2">
          <USkeleton class="h-6 w-12 md:w-14 rounded-full" />
          <USkeleton class="h-6 w-12 md:w-14 rounded-full" />
          <USkeleton class="h-6 w-12 md:w-14 rounded-full" />
        </div>
      </div>

      <!-- Right Content -->
      <div class="w-28 text-right space-y-2 pr-4">
        <USkeleton class="h-4 w-12 md:w-18 ml-auto" />
        <USkeleton class="h-4 w-12 md:w-18 ml-auto" />
      </div>
    </div>
  </div>
  <div
    v-else
    :key="index"
    v-for="(item, index) in animeData"
    class="flex items-center relative group"
  >
    <!-- Index out data element -->
    <div
      :class="[
        getColor(index + 1),
        'hidden md:block font-bold pr-2 group-last:pr-0',
      ]"
    >
      #{{ index + 1 }}
    </div>
    <NuxtLink
      :key="item?.id"
      :to="`/anime/${item?.id}`"
      class="flex w-full gap-px bg-surface-dark/40 p-2 my-1.75 mx-2.5 justify-between rounded-lg group transition-colors border border-white/5 hover:border-primary/50"
    >
      <!-- Absolute Index -->
      <div
        class="absolute z-40 left-0 -top-1 flex md:hidden rounded-full bg-primary shadow ring ring-primary/80 p-1 w-8 h-8 text-center justify-center items-center"
      >
        <span class="font-bold text-xs"> #{{ index + 1 }} </span>
      </div>
      <!-- Left -->
      <div class="flex items-center gap-[.7rem]">
        <!-- Image Card -->
        <div class="w-12 md:w-15 lg:w-18 aspect-2/3 shrink-0">
          <NuxtImg
            :src="item?.coverImage?.large"
            class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
            loading="lazy"
            :alt="item?.title?.romaji"
          />
        </div>
        <div class="flex flex-col">
          <div
            class="no-underline overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]"
          >
            <span
              href="/"
              class="group-hover:text-primary transition-colors text-lg font-bold"
              >{{ item?.title?.romaji ? item?.title?.romaji : '-' }}</span
            >
          </div>
          <div
            class="flex overflow-hidden items-center flex-wrap gap-x-2 gap-y-px md:gap-2 text-anime-text-muted"
          >
            <span class="flex items-center">
              <UIcon
                name="i-material-symbols:star-outline"
                class="text-[18px]"
              />
              {{ item?.averageScore ? formatScore(item?.averageScore) : '-' }}
            </span>
            <span>•</span>
            <span>{{
              item?.season ? capitalizeFirstLetter(item?.season) : '-'
            }}</span>
            <span>•</span>
            <span>{{
              item?.format ? formatMediaFormat(item?.format) : '-'
            }}</span>
          </div>
        </div>
      </div>
      <!-- Right -->
      <div class="flex items-center justify-between gap-12">
        <div class="w-25 flex flex-col">
          <span :class="[getStatusColor(item?.status), 'font-semibold']">{{
            item?.status ? formatStatusText(item?.status) : '-'
          }}</span>
          <span class="text-anime-text-muted">{{
            getDataEpsDuration(
              item?.format,
              item?.episodes ?? item?.nextAiringEpisode?.episode,
              item?.duration,
            )
          }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
