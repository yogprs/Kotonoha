<script setup lang="ts">
import type { CustomCarouselItem } from "~/types/carousel";
import type { TopAnimeData } from "~/types/topAnime";

const currentTrend = ref<CustomCarouselItem[]>([]);
const lastUpdateEpisode = ref<CustomCarouselItem[]>([]);
const topAnime = ref<TopAnimeData[]>([]);

onMounted(() => {
  getCurrentTrend();
  getLastUpdateEpisode();
  getTopAnime();
});

const getCurrentTrend = () => {
  currentTrend.value = [
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      status: "FINISHED",
      format: "TV",
    },
  ];
};

const getLastUpdateEpisode = () => {
  lastUpdateEpisode.value = [
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
    {
      title: "Sousou no Frieren",
      img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episode: 24,
      currentEpisode: 24,
      status: "FINISHED",
      format: "TV",
    },
  ];
};

const getTopAnime = () => {
  topAnime.value = [
    {
      _id: "1",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
    {
      _id: "2",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
    {
      _id: "3",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
    {
      _id: "4",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
    {
      _id: "5",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
    {
      _id: "6",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
    {
      _id: "7",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
    {
      _id: "8",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
    {
      _id: "9",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
    {
      _id: "10",
      title: "Sousou no Frieren",
      genres: ["Adventure", "Drama", "Fantasy"],
      coverImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
      episodes: 24,
      meanScore: 91,
      season: "FALL",
      status: "FINISHED",
      format: "TV",
    },
  ];
};
</script>
<template>
  <div class="w-full flex relative">
    <div class="w-full h-full absolute bg-black/65" />
    <span class="w-full h-[80vh]">
      <NuxtImg
        src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg"
        alt="frieren"
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
        <span class="text-xl lg:text-lg">#11 Trending</span>
      </span>
      <h1 class="text-3xl lg:text-4xl font-bold">Sousou no Frieren</h1>
      <div class="flex gap-3 py-2">
        <span class="flex flex-row gap-1">
          <UIcon name="i-material-symbols:play-circle" class="size-6" />
          TV
        </span>
        <span class="hidden md:block">•</span>
        <span :class="[getStatusColor('FINISHED'), 'font-medium']">{{
          formatStatusText("FINISHED")
        }}</span>
        <span class="hidden md:block">•</span>
        <span class="flex flex-row gap-1">
          <UIcon
            name="i-material-symbols:calendar-today-outline"
            class="size-6"
          />
          Sept 29, 2023
        </span>
        <span class="hidden md:block">•</span>
        <span class="flex flex-row gap-1">
          <UIcon name="i-system-uicons:episodes" class="size-6" />
          28
        </span>
      </div>
      <span
        class="text-base lg:text-sm text-justify line-clamp-2 md:line-clamp-3 2xl:line-clamp-none"
      >
        The adventure is over but life goes on for an elf mage just beginning to
        learn what living is all about. Elf mage Frieren and her courageous
        fellow adventurers have defeated the Demon King and brought peace to the
        land. But Frieren will long outlive the rest of her former party. How
        will she come to understand what life means to the people around her?
        Decades after their victory, the funeral of one her friends confronts
        Frieren with her own near immortality. Frieren sets out to fulfill the
        last wishes of her comrades and finds herself beginning a new adventure…
        (Source: Crunchyroll)
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
  <div class="h-full flex flex-col gap-6 pt-16 pb-8">
    <div class="flex items-center gap-4 px-14">
      <UIcon
        name="i-material-symbols:trending-up"
        class="size-6 text-primary"
      />
      <h3 class="font-bold text-2xl">Currently Trending</h3>
    </div>
    <div class="h-full">
      <Carousel :items="currentTrend" />
    </div>
  </div>
  <div class="h-full flex flex-col gap-6 pt-16 pb-8">
    <div class="flex items-center gap-4 px-14">
      <UIcon
        name="i-material-symbols:verified-rounded"
        class="size-6 text-primary"
      />
      <h3 class="font-bold text-2xl">Last Updated Episode</h3>
    </div>
    <div class="h-full">
      <Carousel :use-badge-ep="true" :items="lastUpdateEpisode" />
    </div>
  </div>
  <div class="w-full h-full">
    <div class="w-full h-full flex flex-col gap-6 pt-16 pb-8">
      <div class="flex items-center gap-4 px-14">
        <UIcon
          name="i-material-symbols:award-star"
          class="size-6 text-primary"
        />
        <h3 class="font-bold text-2xl">Top 10 Anime</h3>
      </div>
      <div class="h-full px-14 pb-8">
        <TopAnime :data="topAnime" />
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.herowrap {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 40%, #000),
    linear-gradient(180deg, rgba(0, 0, 0, 0.624), hsla(0, 0%, 100%, 0) 30%),
    linear-gradient(270deg, hsla(0, 0%, 99%, 0) 40%, rgba(0, 0, 0, 0.541) 80%);
}
</style>
