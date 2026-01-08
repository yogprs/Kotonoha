<script setup lang="ts">
import type { TopAnimeProps } from "~/types/topAnime";

defineProps<TopAnimeProps>();

const getColor = (num: number, type: "index" | "title" | "badge") => {
  if (type === "index") {
    if (num === 1) {
      return "text-[#FFD700]";
    } else if (num === 2) {
      return "text-[#C0C0C0]";
    } else if (num === 3) {
      return "text-[#CD7F32]";
    } else {
      return "text-[#388E3C]";
    }
  } else if (type === "title") {
    if (num === 1) {
      return "hover:text-[#FFD700]";
    } else if (num === 2) {
      return "hover:text-[#C0C0C0]";
    } else if (num === 3) {
      return "hover:text-[#CD7F32]";
    } else {
      return "hover:text-[#388E3C]";
    }
  } else {
    if (num === 1) {
      return "ring-[#FFD700]";
    } else if (num === 2) {
      return "ring-[#C0C0C0]";
    } else if (num === 3) {
      return "ring-[#CD7F32]";
    } else {
      return "ring-[#388E3C]";
    }
  }
};
</script>

<template>
  <div
    :key="index"
    v-for="(item, index) in data"
    class="w-full flex gap-2 items-center pb-4"
  >
    <span :class="[getColor(index + 1, 'index'), 'font-bold w-8']">
      #{{ index + 1 }}
    </span>
    <div
      :id="item?._id"
      class="w-full bg-surface-dark flex flex-row gap-2 rounded-lg"
    >
      <div class="p-2">
        <Card
          :hoverable="false"
          :use-badge-ep="false"
          :item="{
            title: item?.title,
            img: item?.coverImage,
            status: item?.status,
            format: '',
          }"
          width="w-[60px]"
          height="h-[80px]"
        />
      </div>
      <div class="w-full py-3 flex justify-between">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3">
            <span
              :class="[
                `${getColor(index + 1, 'title')}`,
                'text-lg font-bold hover:cursor-pointer',
              ]"
            >
              {{ item?.title }}
            </span>
            <span class="text-text-secondary">•</span>
            <span class="text-text-secondary"
              >{{ item?.format }} ({{ item?.episodes }} episodes)</span
            >
          </div>
          <div class="flex flex-row gap-2">
            <UBadge
              :key="i"
              v-for="(genre, i) in item?.genres"
              :label="genre"
              variant="outline"
              :class="[getColor(index + 1, 'badge'), 'text-white']"
            />
          </div>
        </div>
        <div class="flex items-center pl-4 pr-12 gap-2">
          <div class="flex flex-row gap-1">
            <UIcon name="i-material-symbols:star-outline" class="size-6" />
            <span>{{ formatScore(item?.meanScore) }}</span>
          </div>
          <span>•</span>
          <span>{{ capitalizeFirstLetter(item?.season) }}</span>
          <span>•</span>
          <span>{{ formatStatusText(item?.status) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
