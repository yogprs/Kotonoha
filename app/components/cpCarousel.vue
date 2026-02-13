<script setup lang="ts">
interface Props {
  items: any[]; // bisa array objek atau array string
  visible?: number; // jumlah card yang terlihat per view
  gap?: number; // jarak antar item
  loop?: boolean; // loop carousel
}

const props = defineProps<Props>();

const currentIndex = ref(0);
const carouselRef = ref<HTMLDivElement | null>(null);

const visible = computed(() => props.visible || 3);
const gap = computed(() => props.gap || 16);
const totalItems = computed(() => props.items?.length);

const canPrev = computed(() => props.loop || currentIndex.value > 0);
const canNext = computed(() => props.loop || currentIndex.value < totalItems.value - visible.value);

const prev = () => {
  if (!canPrev.value) return;
  if (currentIndex.value === 0 && props.loop) {
    currentIndex.value = totalItems.value - visible.value;
  } else {
    currentIndex.value--;
  }
};

const next = () => {
  if (!canNext.value) return;
  if (currentIndex.value >= totalItems.value - visible.value && props.loop) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
};

// Hitung translateX untuk geser carousel
const translateX = computed(() => `-${currentIndex.value * (100 / visible.value)}%`);
</script>

<template>
  <div class="relative w-full">
    <!-- Carousel wrapper -->
    <div class="overflow-hidden">
      <div
        ref="carouselRef"
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(${translateX})`, gap: `${gap}px` }"
      >
        <div
          v-for="(item, index) in props.items"
          :key="index"
          class="shrink-0 w-[calc(100%/var(--visible))]"
          :style="{ '--visible': visible }"
        >
          <slot :item="item" :index="index">
            <!-- Default card if slot not provided -->
            <div class="p-4 rounded-md h-48 flex items-center justify-center">
              {{ item?.title?.romaji }}
            </div>
          </slot>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <button
      @click="prev"
      class="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
      :disabled="!canPrev"
    >
      ◀
    </button>
    <button
      @click="next"
      class="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
      :disabled="!canNext"
    >
      ▶
    </button>
  </div>
</template>

<style scoped>
/* supaya dynamic width bisa bekerja */
.flex-shrink-0 {
  width: calc(100% / var(--visible));
}
</style>
