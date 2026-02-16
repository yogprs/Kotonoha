<script setup lang="ts">
import type { CustomCarouselProps } from '../../types/carousel';

const props = withDefaults(defineProps<CustomCarouselProps>(), {
  useIndex: false,
});

const scrollContainer = ref<HTMLElement | null>(null);
const count = ref<number>(10);

const carouselData = computed((): Media[] => {
  if (props?.media && props?.media?.length > 0) {
    return props?.media;
  }
  return [];
});

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({
    left: -300,
    behavior: 'smooth',
  });
};

const scrollRight = () => {
  scrollContainer.value?.scrollBy({
    left: 300,
    behavior: 'smooth',
  });
};
</script>

<template>
  <!-- Carousel Skeleton -->
  <div
    v-if="carouselData?.length === 0"
    class="relative mx-auto py-4 sm:py-6 px-0 md:px-14"
  >
    <div
      ref="scrollContainer"
      class="-mx-4 flex gap-4 overflow-x-hidden px-8 md:px-12 pb-4 sm:gap-5"
    >
      <div
        :key="index"
        v-for="index in count"
        class="group flex-none pr-4 md:pr-7 last:pr-0"
      >
        <USkeleton class="h-56 w-36 md:h-56 md:w-36 lg:h-80 lg:w-56" />
      </div>
    </div>
  </div>
  <!-- Carousel -->
  <section
    v-else
    class="relative mx-auto py-8 sm:py-10 px-0 md:px-14 overflow-hidden"
  >
    <!-- Shadow Left -->
    <div
      aria-hidden="true"
      class="absolute left-0 md:left-10 top-0 bottom-0 w-12 md:w-20 bg-linear-to-r from-bg-dark to-transparent z-10 pointer-events-none"
    ></div>

    <!-- Shadow Right -->
    <div
      aria-hidden="true"
      class="absolute right-0 md:right-10 top-0 bottom-0 w-20 bg-linear-to-l from-bg-dark to-transparent z-10 pointer-events-none"
    ></div>
    <div
      ref="scrollContainer"
      class="-mx-4 flex gap-4 overflow-x-hidden px-8 md:px-12 pb-4 sm:gap-5"
    >
      <div
        v-for="(anime, index) in carouselData"
        :key="anime?.id"
        class="group flex-none pr-4 md:pr-7 last:pr-0"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div
          class="relative h-56 w-36 overflow-hidden rounded-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/20 md:h-56 md:w-36 lg:h-80 lg:w-56"
        >
          <!-- Card Image -->
          <!-- <div class="absolute inset-0" :style="{ background: anime?.coverImage?.large }" /> -->
          <div class="absolute inset-0">
            <NuxtImg
              :src="anime?.coverImage?.large"
              :alt="anime?.title"
              loading="lazy"
              class="w-full h-full"
            />
          </div>
          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-linear-to-t from-anime-darker via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <!-- Rank Badge -->
          <div
            v-if="useIndex"
            class="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-md font-display text-xs font-black text-white sm:h-7 sm:w-7 sm:text-sm glass"
          >
            {{ index + 1 }}
          </div>
          <!-- Rating -->
          <div
            class="absolute right-2 top-2 flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-anime-gold sm:text-xs md:text-sm glass"
          >
            <UIcon name="i-material-symbols:star" class="text-[14px]" />
            {{ anime.averageScore ? formatScore(anime?.averageScore) : '-' }}
          </div>
          <!-- Info on Hover -->
          <div
            class="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0"
          >
            <h3 class="text-xs font-bold text-white sm:text-sm md:text-lg">
              {{ anime.title?.romaji ? anime.title?.romaji : '-' }}
            </h3>
            <div class="flex gap-1">
              <p
                class="mt-0.5 text-[10px] text-anime-text-muted sm:text-xs md:text-sm"
              >
                {{
                  anime?.genres?.length > 0 ? anime?.genres?.join(', ') : '-'
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Arrow Left -->
    <button
      @click="scrollLeft"
      class="absolute left-0 md:left-10 top-1/2 z-10 -translate-y-1/2 rounded-full bg-transparent p-2 text-anime-text-muted hover:text-white hover:backdrop-blur hover:bg-black/70"
    >
      <div class="h-5 w-5">
        <UIcon
          name="i-material-symbols:arrow-back-ios-new"
          class="text-[20px]"
        />
      </div>
    </button>

    <!-- Arrow Right -->
    <button
      @click="scrollRight"
      class="absolute right-0 md:right-10 top-1/2 z-10 -translate-y-1/2 rounded-full bg-transparent p-2 text-anime-text-muted hover:backdrop-blur hover:bg-black/70"
    >
      <div class="h-5 w-5">
        <UIcon
          name="i-material-symbols:arrow-forward-ios"
          class="text-[20px]"
        />
      </div>
    </button>
  </section>
</template>
