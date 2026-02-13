<script setup lang="ts">
import type {
  HeroSectionData,
  HeroSectionProps,
} from '../../types/heroSection';

const props = defineProps<HeroSectionProps>();

const dataTrend = computed((): HeroSectionData => {
  if (props?.data) {
    return props?.data;
  }
  return {} as HeroSectionData;
});
</script>

<template>
  <div v-if="!dataTrend?.media" class="relative w-full h-[80vh] bg-black/60">
    <USkeleton class="absolute inset-0 rounded-none" />
    <div class="absolute bottom-24 left-10 w-[50%] space-y-4">
      <USkeleton class="h-10 w-3/4" />
      <USkeleton class="h-4 w-1/2" />
      <USkeleton class="h-4 w-2/3" />
      <USkeleton class="h-10 w-40 rounded-full" />
    </div>
  </div>
  <div v-else class="w-full flex relative">
    <div class="w-full h-full absolute bg-black/65" />
    <span class="w-full h-[80vh]">
      <NuxtImg
        :src="
          dataTrend?.media?.bannerImage ??
          dataTrend?.media?.coverImage?.extraLarge
        "
        :alt="dataTrend?.media?.title?.romaji"
        class="w-full h-full object-cover select-none pointer-events-none"
      />
    </span>
    <div
      class="absolute flex flex-col w-[90%] lg:w-[50%] bottom-22 md:bottom-25 left-[5%]"
    >
      <span class="text-[#DE7979] flex items-center gap-1">
        <UIcon
          name="i-material-symbols:local-fire-department-rounded"
          class="size-6"
        />
        <span class="text-xl lg:text-lg">#{{ dataTrend?.index }} Trending</span>
      </span>
      <h1 class="text-3xl lg:text-4xl font-bold">
        {{ dataTrend?.media?.title?.romaji }}
      </h1>
      <div class="flex gap-3 py-2">
        <span class="flex flex-row gap-1">
          <UIcon name="i-material-symbols:play-circle" class="size-6" />
          {{
            dataTrend?.media?.format
              ? formatMediaFormat(dataTrend?.media?.format)
              : ''
          }}
        </span>
        <span class="hidden md:block">•</span>
        <span
          :class="[
            getStatusColor(dataTrend?.media?.status as MediaStatus),
            'font-medium',
          ]"
          >{{ formatStatusText(dataTrend?.media?.status as string) }}</span
        >
        <span class="hidden md:block">•</span>
        <span class="flex flex-row gap-1">
          <UIcon
            name="i-material-symbols:calendar-today-outline"
            class="size-6"
          />
          {{ formatDate(dataTrend?.media?.startDate as FuzzyDate) }}
        </span>
        <span class="hidden md:block">•</span>
        <span class="flex flex-row gap-1">
          <UIcon name="i-system-uicons:episodes" class="size-6" />
          {{
            (dataTrend?.media?.nextAiringEpisode?.episode as number) - 1 ||
            dataTrend?.media?.episodes
          }}
        </span>
      </div>
      <span
        class="text-base lg:text-sm text-justify line-clamp-2 md:line-clamp-3 2xl:line-clamp-none"
      >
        {{ dataTrend?.media?.description.replace(/<.*?>/g, '') }}
      </span>
      <div class="py-4">
        <UButton
          icon="i-material-symbols:info"
          label="Detail"
          size="lg"
          class="text-white rounded-2xl hover:cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
