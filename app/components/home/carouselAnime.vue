<script setup lang="ts">
import type { CustomCarouselProps } from '../../types/carousel';

defineProps<CustomCarouselProps>();

const scrollContainer = ref<HTMLElement | null>(null);

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
  <section class="relative mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
    <div
      ref="scrollContainer"
      class="-mx-4 flex gap-4 overflow-x-hidden px-4 pb-4 sm:gap-5"
    >
      <!-- Shadow Left -->
      <div
        aria-hidden="true"
        class="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-linear-to-r from-bg-dark to-transparent z-10 pointer-events-none"
      ></div>

      <!-- Arrow Right -->
      <div
        aria-hidden="true"
        class="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-bg-dark to-transparent z-10 pointer-events-none"
      ></div>
      <div
        v-for="(anime, index) in media"
        :key="anime?.id"
        class="group flex-none pr-7 last:pr-0"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div
          class="relative h-56 w-36 overflow-hidden rounded-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/20 sm:h-92 sm:w-62.5"
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
            class="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-md font-display text-xs font-black text-white sm:h-7 sm:w-7 sm:text-sm glass"
          >
            {{ index + 1 }}
          </div>
          <!-- Rating -->
          <div
            class="absolute right-2 top-2 flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-anime-gold sm:text-xs glass"
          >
            <svg
              class="h-2.5 w-2.5 sm:h-3 sm:w-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            {{ anime.averageScore }}
          </div>
          <!-- Info on Hover -->
          <div
            class="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0"
          >
            <h3 class="text-xs font-bold text-white sm:text-sm">
              {{ anime.title?.romaji }}
            </h3>
            <div class="flex gap-1">
              <p class="mt-0.5 text-[10px] text-anime-text-muted sm:text-xs">
                {{ anime?.genres?.join(', ') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Arrow Left -->
    <button
      @click="scrollLeft"
      class="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-transparent p-2 text-anime-text-muted hover:text-white hover:backdrop-blur hover:bg-black/70"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <!-- Arrow Right -->
    <button
      @click="scrollRight"
      class="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-transparent p-2 text-anime-text-muted hover:backdrop-blur hover:bg-black/70"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </section>
</template>
