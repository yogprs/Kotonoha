<script setup lang="ts">
import type { AnimeStatus } from '../types/data';
import type { TopAnimeProps } from '../types/topAnime';

const props = defineProps<TopAnimeProps>();
const count = ref<number>(10);

const topAnimeData = computed(() => {
  if (props?.data && props?.data?.length > 0) {
    return props?.data;
  }
  return [];
});

const getColor = (num: number, type: 'index' | 'title' | 'badge') => {
  if (type === 'index') {
    if (num === 1) {
      return 'text-[#FFD700]';
    } else if (num === 2) {
      return 'text-[#C0C0C0]';
    } else if (num === 3) {
      return 'text-[#CD7F32]';
    } else {
      return 'text-[#388E3C]';
    }
  } else if (type === 'title') {
    if (num === 1) {
      return 'hover:text-[#FFD700]';
    } else if (num === 2) {
      return 'hover:text-[#C0C0C0]';
    } else if (num === 3) {
      return 'hover:text-[#CD7F32]';
    } else {
      return 'hover:text-[#388E3C]';
    }
  } else if (type === 'badge') {
    if (num === 1) {
      return 'ring-[#FFD700]';
    } else if (num === 2) {
      return 'ring-[#C0C0C0]';
    } else if (num === 3) {
      return 'ring-[#CD7F32]';
    } else {
      return 'ring-[#388E3C]';
    }
  }
};
</script>

<template>
  <div v-if="topAnimeData?.length === 0" class="space-y-4">
    <div v-for="i in count" :key="i" class="flex items-center gap-2">
      <!-- Rank -->
      <div class="w-10 hidden md:block text-center">
        <USkeleton class="h-6 w-8 mx-auto" />
      </div>

      <!-- Poster -->
      <div class="w-full bg-gray-800/30 flex items-center gap-2 rounded-xl p-2">
        <USkeleton class="h-22.5 w-16.25 rounded-md shrink-0" />

        <!-- Content -->
        <div class="flex-1 space-y-3">
          <!-- Title -->
          <USkeleton class="h-5 w-1/2" />

          <!-- Genres -->
          <div class="flex gap-2">
            <USkeleton class="h-6 w-12 rounded-full" />
            <USkeleton class="h-6 w-12 rounded-full" />
            <USkeleton class="h-6 w-12 rounded-full" />
          </div>
        </div>

        <!-- Rating -->
        <div class="w-28 text-right space-y-2">
          <USkeleton class="h-4 w-12 ml-auto" />
          <USkeleton class="h-4 w-18 ml-auto" />
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    :key="index"
    v-for="(item, index) in topAnimeData"
    class="w-full flex gap-2 items-center pb-4 overflow-hidden"
  >
    <span
      :class="[getColor(index + 1, 'index'), 'hidden md:flex font-bold w-8']"
    >
      #{{ index + 1 }}
    </span>
    <div
      :id="item?.id?.toString()"
      class="w-full bg-surface-dark flex flex-row gap-2 rounded-lg"
    >
      <div
        class="absolute z-40 left-3 flex md:hidden rounded-full bg-primary shadow ring ring-primary/80 p-2 w-10 text-center justify-center my-2"
      >
        <span class="font-bold text-sm"> #{{ index + 1 }} </span>
      </div>
      <div class="md:w-auto p-2">
        <Card
          :hoverable="false"
          :use-badge-ep="false"
          :item="{
            id: item?.id,
            title: item?.title?.romaji,
            img: item?.coverImage?.large,
            status: item?.status as AnimeStatus,
            format: item?.format,
            episode: item?.episodes as number,
            currentEpisode: item?.nextAiringEpisode?.episode ?? item?.episodes,
          }"
          width="w-[60px] md:w-[80px]"
          height="aspect-[2/3]"
          image-class="w-full h-full object-cover"
          sizes="80px md:100px"
        />
      </div>
      <div
        class="w-full py-3 flex flex-row md:flex-row md:justify-between gap-2"
      >
        <div
          class="flex flex-col justify-start md:justify-center gap-2 min-w-0 flex-1"
        >
          <div class="flex items-center gap-2 md:gap-3">
            <span
              :class="[
                `${getColor(index + 1, 'title')}`,
                'text-lg font-bold hover:cursor-pointer w-60 md:w-auto line-clamp-2 md:line-clamp-none truncate',
              ]"
            >
              {{ item?.title?.romaji ?? '-' }}
            </span>
            <span class="text-text-secondary hidden md:flex">•</span>
            <div
              class="w-20.5 md:w-auto hidden md:flex flex-col md:flex-row items-center gap-2"
            >
              <span>{{
                item?.format ? formatMediaFormat(item?.format) : '-'
              }}</span>
              <span class="hidden md:block text-text-secondary">
                {{ `${item?.episodes ? `(${item?.episodes} episodes)` : '-'}` }}
              </span>
            </div>
          </div>
          <HomeTopAnimeBadge
            class="w-full"
            :data="item?.genres as string[]"
            :index="index"
          />
        </div>
        <div class="md:flex hidden items-center pl-4 pr-12 gap-2 shrink-0">
          <div class="flex flex-row gap-1">
            <UIcon name="i-material-symbols:star-outline" class="size-6" />
            <span>{{
              item?.averageScore ? formatScore(item?.averageScore) : '-'
            }}</span>
          </div>
          <span>•</span>
          <span>{{
            item?.season ? capitalizeFirstLetter(item?.season) : '-'
          }}</span>
          <span>•</span>
          <span>{{ item?.status ? formatStatusText(item?.status) : '-' }}</span>
        </div>
        <div
          class="w-20.5 md:w-auto flex md:hidden flex-col md:flex-row items-start gap-2"
        >
          <div class="flex flex-row gap-1">
            <UIcon name="i-material-symbols:star-outline" class="size-6" />
            <span>{{
              item?.averageScore ? formatScore(item?.averageScore) : '-'
            }}</span>
          </div>
          <span>{{
            item?.format ? formatMediaFormat(item?.format) : '-'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
