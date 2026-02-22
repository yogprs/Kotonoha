<script setup lang="ts">
import type { HeroSlideProps } from '../../types/heroSlide';

const props = defineProps<HeroSlideProps>();

const { $gsap } = useNuxtApp();

const titleRef = ref<HTMLElement>();
const badgesRef = ref<HTMLElement>();
const metaRef = ref<HTMLElement>();
const synopsisRef = ref<HTMLElement>();
const buttonsRef = ref<HTMLElement>();

const parallax = ref({ x: 0, y: 0 });

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * -8;
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
  parallax.value = { x, y };
}

function handleMouseLeave() {
  parallax.value = { x: 0, y: 0 };
}

function animateContent() {
  if (!$gsap) return;
  const gsap = $gsap as any;

  const elements = [
    badgesRef.value,
    titleRef.value,
    metaRef.value,
    synopsisRef.value,
    buttonsRef.value,
  ].filter(Boolean);

  gsap.fromTo(
    elements,
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.3,
    },
  );
}

function resetContent() {
  if (!$gsap) return;
  const gsap = $gsap as any;

  const elements = [
    badgesRef.value,
    titleRef.value,
    metaRef.value,
    synopsisRef.value,
    buttonsRef.value,
  ].filter(Boolean);

  gsap.set(elements, { y: 40, opacity: 0 });
}

watch(
  () => props.isActive,
  (active) => {
    nextTick(() => {
      if (active) {
        animateContent();
      } else {
        resetContent();
      }
    });
  },
  { immediate: true },
);
</script>

<template>
  <div
    class="anime-slide relative h-full w-full overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Cover Image with Parallax -->
    <div
      ref="imageContainer"
      class="absolute inset-0 h-full w-full transition-transform duration-300 ease-out"
      :style="{
        transform: `scale(1.08) translate(${parallax.x}px, ${parallax.y}px)`,
      }"
    >
      <NuxtImg
        :src="slide?.image"
        :alt="slide?.title"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>

    <!-- Cinematic Gradient Overlays -->
    <div
      class="absolute inset-0 bg-linear-to-t from-anime-darker via-anime-darker/60 to-transparent"
    />
    <div
      class="absolute inset-0 bg-linear-to-r from-anime-darker/80 via-transparent to-transparent"
    />
    <div
      class="absolute inset-0 bg-linear-to-b from-anime-darker/30 via-transparent to-transparent"
    />

    <!-- Noise texture overlay -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="
        background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');
        background-size: 128px 128px;
      "
    />

    <!-- Content Overlay -->
    <div
      class="absolute inset-0 z-20 flex items-end p-5 sm:p-8 md:p-12 lg:p-16"
    >
      <div
        ref="contentRef"
        class="max-w-2xl space-y-3 sm:space-y-4 py-15 lg:py-10"
      >
        <!-- Genre Badges -->
        <div
          v-if="slide?.genres?.length"
          ref="badgesRef"
          class="flex flex-wrap gap-2"
        >
          <span
            v-for="genre in slide?.genres"
            :key="genre"
            class="genre-badge rounded-full border border-anime-primary/20 bg-anime-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-anime-primary backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs"
          >
            {{ genre }}
          </span>
        </div>

        <!-- Title -->
        <h2
          ref="titleRef"
          class="font-display text-xl font-black leading-tight tracking-tight text-white md:text-2xl lg:text-3xl"
          style="text-shadow: 0 2px 20px oklch(0 0 0 / 0.5)"
        >
          {{ slide?.title }}
        </h2>

        <!-- Meta Info -->
        <div
          ref="metaRef"
          class="flex flex-wrap items-center gap-3 text-xs text-anime-text-muted sm:gap-4 sm:text-sm"
        >
          <!-- Rating -->
          <div v-if="slide?.rating" class="flex items-center gap-1.5">
            <div class="flex items-center gap-0.5">
              <div class="h-3.5 w-3.5 sm:h-4 sm:w-4">
                <UIcon
                  name="i-material-symbols:star"
                  class="text-[16px] text-anime-gold"
                />
              </div>
            </div>
            <span class="font-semibold text-anime-gold">{{
              slide?.rating.toFixed(1)
            }}</span>
          </div>

          <!-- Year -->
          <span v-if="slide?.year" class="flex items-center gap-1">
            <div class="h-3.5 w-3.5 sm:h-4 sm:w-4">
              <UIcon
                name="i-material-symbols:calendar-today-outline"
                class="text-[16px]"
              />
            </div>
            {{ slide?.year }}
          </span>

          <!-- Episodes -->
          <span v-if="slide?.episodes" class="flex items-center gap-1">
            <div class="h-3.5 w-3.5 sm:h-4 sm:w-4">
              <UIcon
                name="i-material-symbols:movie-outline"
                class="text-[16px]"
              />
            </div>
            {{ slide?.episodes }} Episodes
          </span>
        </div>

        <!-- Synopsis -->
        <p
          v-if="slide?.synopsis"
          ref="synopsisRef"
          class="line-clamp-2 max-w-xl text-xs leading-relaxed text-anime-text-muted/80 sm:line-clamp-3 sm:text-sm md:text-base"
        >
          {{ slide?.synopsis }}
        </p>

        <!-- Action Buttons -->
        <div
          ref="buttonsRef"
          class="flex flex-wrap items-center gap-3 pt-1 sm:pt-2"
        >
          <UButton
            :key="slide?.id"
            :to="`/anime/${slide?.id}`"
            class="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-anime-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-anime-primary/30 sm:px-7 sm:py-3 sm:text-sm"
          >
            <div
              class="h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
            >
              <UIcon name="i-material-symbols:info" class="text-[20px]" />
            </div>
            Detail
            <div
              class="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </UButton>
          <button
            class="flex cursor-pointer items-center gap-2 rounded-xl border border-anime-text-muted/20 px-5 py-2.5 text-xs font-semibold text-anime-text-muted transition-all duration-300 hover:border-anime-primary/50 hover:text-anime-primary sm:px-7 sm:py-3 sm:text-sm glass"
          >
            <div class="h-4 w-4 sm:h-5 sm:w-5">
              <UIcon name="i-material-symbols:add" class="text-[20px]" />
            </div>
            My List
          </button>
        </div>
      </div>
    </div>

    <!-- Decorative Corner Elements -->
    <div
      class="absolute left-5 top-5 z-20 h-12 w-12 border-l-2 border-t-2 border-anime-primary/20 opacity-0 transition-opacity duration-500 sm:left-8 sm:top-8 sm:h-16 sm:w-16"
      :class="isActive ? 'opacity-100' : 'opacity-0'"
    />
    <div
      class="absolute bottom-20 right-5 z-20 h-12 w-12 border-b-2 border-r-2 border-anime-accent/20 opacity-0 transition-opacity duration-500 sm:bottom-24 sm:right-8 sm:h-16 sm:w-16"
      :class="isActive ? 'opacity-100' : 'opacity-0'"
    />
  </div>
</template>
