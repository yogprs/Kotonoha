<script setup lang="ts">
import type { TopAnimeBadgeProps } from '../../types/topAnimeBadge';

const props = defineProps<TopAnimeBadgeProps>();

const topAnimeContainer = ref<HTMLElement | null>(null);
const visibleCount = ref<number>(0);
const showTooltip = ref<boolean>(false);
const observer = ref<ResizeObserver | null>(null);
const measurementContainer = ref<HTMLElement | null>(null);

const calculateVisible = () => {
  if (!topAnimeContainer.value || !measurementContainer.value) return;

  const containerWidth = topAnimeContainer.value.clientWidth;

  const badgeNodes = Array.from(
    measurementContainer.value.children,
  ) as HTMLElement[];

  const moreTextWidth = 50;
  const gap = 8; // gap-2
  let currentWidth = 0;
  let count = 0;

  for (let i = 0; i < badgeNodes.length; i++) {
    const badgeWidth = badgeNodes[i]!.offsetWidth;
    const isLast = i === badgeNodes.length - 1;

    const projectedWidth = currentWidth + (count > 0 ? gap : 0) + badgeWidth;

    if (isLast) {
      if (projectedWidth <= containerWidth) count++;
    } else {
      if (projectedWidth + gap + moreTextWidth <= containerWidth) {
        currentWidth = projectedWidth;
        count++;
      } else {
        break;
      }
    }
  }

  requestAnimationFrame(() => {
    visibleCount.value = count;
  });
};

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
  } else {
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

onMounted(async () => {
  await nextTick();
  calculateVisible();

  observer.value = new ResizeObserver(() => {
    calculateVisible();
  });

  if (topAnimeContainer.value) {
    observer.value?.observe(topAnimeContainer.value);
  }
});

onUnmounted(() => {
  observer.value?.disconnect();
});

const hiddenData = computed(() => props.data?.slice(visibleCount.value) || []);
</script>

<template>
  <div class="w-full relative min-w-0">
    <div
      ref="measurementContainer"
      class="invisible absolute flex gap-2 pointer-events-none whitespace-nowrap"
      aria-hidden="true"
    >
      <UBadge
        v-for="(genre, i) in data"
        :key="`measure-${i}`"
        :label="genre"
        variant="outline"
        class="shrink-0"
      />
    </div>

    <div
      ref="topAnimeContainer"
      class="flex flex-nowrap items-center gap-2 w-full overflow-hidden"
    >
      <UBadge
        v-for="(genre, i) in data.slice(0, visibleCount)"
        :key="`display-${i}`"
        :label="genre"
        variant="outline"
        :class="[
          getColor(index + 1, 'badge'),
          'text-white shrink-0 whitespace-nowrap',
        ]"
      />

      <UTooltip
        v-if="hiddenData.length"
        v-model:open="showTooltip"
        :text="hiddenData.join(', ')"
      >
        <span
          @mouseenter="showTooltip = true"
          @mouseleave="showTooltip = false"
          class="shrink-0 text-sm md:text-xs text-text-secondary cursor-help"
        >
          +{{ hiddenData.length }} more
        </span>
      </UTooltip>
    </div>
  </div>
</template>
