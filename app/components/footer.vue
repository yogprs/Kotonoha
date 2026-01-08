<script setup lang="ts"></script>

<template>
  <div class="w-full h-full bg-surface-dark ring ring-[#362348]">
    <div class="flex flex-row mx-12 py-12">
      <div class="w-[40%] flex flex-col gap-4 px-10">
        <h3 class="font-bold text-2xl font-surfer">Kotonoha</h3>
        <span class="text-sm text-justify">
          This site stores user account data only for anime draft purposes using
          the anilist api as the anime data source.
        </span>
      </div>
      <div class="w-[60%] flex justify-end px-18 gap-18">
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
          <span class="hover:text-text-secondary hover:cursor-pointer"
            >Instagram</span
          >
          <span class="hover:text-text-secondary hover:cursor-pointer"
            >Github</span
          >
          <span class="hover:text-text-secondary hover:cursor-pointer"
            >Discord</span
          >
          <span class="hover:text-text-secondary hover:cursor-pointer"
            >Donate</span
          >
        </div>
      </div>
    </div>
    <div class="px-22 py-4 ring ring-white/5">
      <span class="text-sm">© 2026 Kotonoha. Made by yogprs</span>
    </div>
  </div>
</template>
