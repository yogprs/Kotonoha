<script setup lang="ts">
import type { HeroProps } from '../../types/hero';

const props = withDefaults(defineProps<HeroProps>(), {
  autoplay: true,
  interval: 5000,
  transitionDuration: 0.8,
  showDots: true,
  showArrows: true,
  height: '70vh',
});

const emit = defineEmits<{
  change: [index: number];
}>();

const { $gsap } = useNuxtApp();

const currentIndex = ref<number>(0);
const isPaused = ref<boolean>(false);
const progress = ref<number>(0);
const touchStartX = ref<number>(0);
const glowPosition = ref('50% 50%');
const slideElements = ref<HTMLElement[]>([]);
const progressInterval = ref<ReturnType<typeof setInterval>>();

const carouselHeight = computed(() => props.height);

function animateSlide(
  fromIndex: number,
  toIndex: number,
  direction: 'left' | 'right',
) {
  if (!$gsap || !slideElements.value.length) return;

  const gsap = $gsap as any;
  const fromEl = slideElements.value[fromIndex];
  const toEl = slideElements.value[toIndex];

  if (!fromEl || !toEl) return;

  const xOut = direction === 'left' ? -60 : 60;
  const xIn = direction === 'left' ? 60 : -60;

  // Exit animation
  gsap.to(fromEl, {
    opacity: 0,
    scale: 0.92,
    x: xOut,
    duration: props.transitionDuration,
    ease: 'power3.inOut',
  });

  // Enter animation
  gsap.fromTo(
    toEl,
    {
      opacity: 0,
      scale: 1.05,
      x: xIn,
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: props.transitionDuration,
      ease: 'power3.out',
      delay: 0.1,
    },
  );
}

function goTo(index: number) {
  if (index === currentIndex.value || index < 0 || index >= props.slides.length)
    return;

  const direction = index > currentIndex.value ? 'left' : 'right';
  const oldIndex = currentIndex.value;

  currentIndex.value = index;
  animateSlide(oldIndex, index, direction);
  emit('change', index);
  resetAutoplay();
}

function next() {
  const nextIndex = (currentIndex.value + 1) % props.slides.length;
  goTo(nextIndex);
}

function prev() {
  const prevIndex =
    (currentIndex.value - 1 + props.slides.length) % props.slides.length;
  goTo(prevIndex);
}

function handleMouseEnter() {
  isPaused.value = true;
  // Dynamic glow follows cursor concept
  glowPosition.value = '30% 40%';
}

function handleMouseLeave() {
  isPaused.value = false;
  glowPosition.value = '50% 50%';
}

function handleTouchStart(e: TouchEvent) {
  touchStartX.value = e.changedTouches[0]?.clientX ?? 0;
}

function handleTouchEnd(e: TouchEvent) {
  const touch = e?.changedTouches[0]?.clientX ?? 0;
  const diff = touchStartX.value - touch;
  const threshold = 50;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) next();
    else prev();
  }
}

function resetAutoplay() {
  progress.value = 0;
  clearInterval(progressInterval.value);

  if (!props.autoplay) return;

  const step = 100 / (props.interval / 100);

  progressInterval.value = setInterval(() => {
    if (isPaused.value) return;

    progress.value += step;

    if (progress.value >= 100) {
      progress.value = 0;
      next(); // trigger slide
    }
  }, 100);
}

function initSlides() {
  if (!$gsap || !slideElements.value.length) return;
  const gsap = $gsap as any;

  slideElements.value.forEach((el, i) => {
    if (i === currentIndex.value) {
      gsap.set(el, { opacity: 1, scale: 1, x: 0 });
    } else {
      gsap.set(el, { opacity: 0, scale: 0.92, x: 60 });
    }
  });
}

// Keyboard navigation
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
}

onMounted(async () => {
  await nextTick();
  initSlides();
  if (props.autoplay) resetAutoplay();
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  clearInterval(progressInterval.value);
  window.removeEventListener('keydown', handleKeydown);
});

watch(
  () => props.slides,
  () => {
    nextTick(() => initSlides());
  },
  { deep: true },
);

defineExpose({ next, prev, goTo, currentIndex });
</script>

<template>
  <div
    class="anime-carousel relative w-full overflow-hidden"
    :style="{ height: carouselHeight }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart.passive="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Background Glow Effect -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute -inset-20 opacity-30 blur-3xl transition-all duration-1000"
        :style="{
          background: `radial-gradient(ellipse at ${glowPosition}, var(--color-anime-primary), var(--color-anime-accent), transparent 70%)`,
        }"
      />
    </div>

    <!-- Slides Container -->
    <div ref="slidesContainer" class="relative z-10 h-full w-full">
      <div
        v-for="(slide, index) in slides"
        :key="slide?.id || index"
        ref="slideElements"
        class="absolute inset-0 h-full w-full"
        :class="{
          'pointer-events-auto': index === currentIndex,
          'pointer-events-none': index !== currentIndex,
        }"
        :style="{ zIndex: index === currentIndex ? 10 : 1 }"
      >
        <slot :slide="slide" :index="index" :is-active="index === currentIndex">
          <HomeHeroSlide :slide="slide" :is-active="index === currentIndex" />
        </slot>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <template v-if="showArrows && slides.length > 1">
      <button
        class="group absolute left-3 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full p-2 transition-all duration-300 sm:left-5 sm:p-3 glass hover:scale-110 hover:border-anime-primary/30"
        aria-label="Previous slide"
        @click="prev"
      >
        <div
          class="h-4 w-4 text-anime-text-muted transition-colors group-hover:text-anime-primary sm:h-5 sm:w-5"
        >
          <UIcon
            name="i-material-symbols:arrow-back-ios-new"
            class="text-[20px]"
          />
        </div>
      </button>
      <button
        class="group absolute right-3 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full p-2 transition-all duration-300 sm:right-5 sm:p-3 glass hover:scale-110 hover:border-anime-primary/30"
        aria-label="Next slide"
        @click="next"
      >
        <div
          class="h-4 w-4 text-anime-text-muted transition-colors group-hover:text-anime-primary sm:h-5 sm:w-5"
        >
          <UIcon
            name="i-material-symbols:arrow-forward-ios"
            class="text-[20px]"
          />
        </div>
      </button>
    </template>

    <!-- Dot Navigation -->
    <div
      v-if="showDots && slides.length > 1"
      class="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 sm:bottom-6 sm:gap-2.5 sm:px-4 sm:py-2.5 glass"
    >
      <button
        v-for="(_, index) in slides"
        :key="index"
        class="group relative cursor-pointer rounded-full transition-all duration-500"
        :class="
          index === currentIndex
            ? 'h-2.5 w-8 bg-anime-primary sm:h-3 sm:w-10'
            : 'h-2 w-2 bg-anime-text-muted/40 hover:bg-anime-text-muted/70 sm:h-2.5 sm:w-2.5'
        "
        :aria-label="`Go to slide ${index + 1}`"
        @click="goTo(index)"
      >
        <!-- Active dot glow -->
        <span
          v-if="index === currentIndex"
          class="absolute inset-0 animate-pulse-glow rounded-full bg-anime-primary/50 blur-sm"
        />
      </button>
    </div>

    <!-- Progress Bar -->
    <div
      v-if="autoplay && slides.length > 1"
      class="absolute bottom-0 left-0 z-30 h-0.5 w-full bg-anime-surface/50"
    >
      <div
        ref="progressBar"
        class="h-full rounded-r-full bg-linear-to-r from-anime-primary to-anime-accent"
        :style="{
          width: `${progress}%`,
          transition: isPaused ? 'none' : 'width 100ms linear',
        }"
      />
    </div>

    <!-- Slide Counter -->
    <!-- <div
      class="absolute right-3 top-3 z-30 rounded-full px-3 py-1 font-display text-xs font-semibold tracking-wider text-anime-text-muted sm:right-5 sm:top-5 sm:px-4 sm:py-1.5 sm:text-sm glass"
    >
      {{ String(currentIndex + 1).padStart(2, '0') }}
      <span class="mx-1 text-anime-primary">/</span>
      {{ String(slides.length).padStart(2, '0') }}
    </div> -->
  </div>
</template>
