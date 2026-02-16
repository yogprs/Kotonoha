<script setup lang="ts">
import social from '~/assets/json/social_media.json';

const year = ref<number>();

onMounted(() => setYear());

const setYear = () => {
  year.value = new Date().getFullYear();
};
</script>

<template>
  <div class="w-full h-full bg-surface-dark ring ring-[#362348]">
    <div
      class="flex flex-col md:flex-row justify-between md:mx-12 py-8 md:py-12"
    >
      <div class="max-w-125 flex flex-col gap-4 px-10">
        <h3 class="font-bold text-2xl font-surfer">Kotonoha</h3>
        <div class="flex flex-col gap-1">
          <span class="text-base md:text-sm text-justify">
            This site is an application for viewing anime data and can also save
            anime viewing drafts. The anime data used is provided by
            <a
              href="https://docs.anilist.co"
              class="underline hover:cursor-pointer"
            >
              AniList</a
            >.
          </span>
          <!-- <span class="text-sm text-justify">
            This site stores user account data only for anime draft and list
            purposes. Anime data provided by the
            <a
              href="https://docs.anilist.co"
              class="underline hover:cursor-pointer"
            >
              AniList API </a
            >. AniList content is licensed under the MIT License.
          </span> -->
        </div>
      </div>
      <div
        class="flex justify-between md:justify-end py-10 md:py-0 px-10 md:px-18 gap-12 md:gap-18 text-lg md:text-base"
      >
        <div class="flex flex-col gap-4">
          <span class="hover:text-text-secondary hover:cursor-pointer"
            >This Season</span
          >
          <span class="hover:text-text-secondary hover:cursor-pointer"
            >Upcoming Season</span
          >
          <span class="hover:text-text-secondary hover:cursor-pointer"
            >Movies</span
          >
          <span class="hover:text-text-secondary hover:cursor-pointer"
            >TV Shows</span
          >
        </div>
        <div class="flex flex-col gap-4">
          <a
            :href="social.instagram"
            class="hover:text-text-secondary hover:cursor-pointer"
          >
            Instagram
          </a>
          <a
            :href="social.github"
            class="hover:text-text-secondary hover:cursor-pointer"
            >Github</a
          >
          <a
            :href="social.discord"
            class="hover:text-text-secondary hover:cursor-pointer"
            >Discord</a
          >
          <a
            :href="social.tako"
            class="hover:text-text-secondary hover:cursor-pointer"
            >Tako</a
          >
        </div>
      </div>
    </div>
    <div class="px-10 md:px-22 py-4 ring ring-white/5">
      <span class="text-sm">© {{ year }} Kotonoha. Made by yogprs</span>
    </div>
  </div>
</template>
