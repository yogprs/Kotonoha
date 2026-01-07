<script setup lang="ts"></script>

<template>
  <!-- <nav class="w-full fixed z-50 bg-bg-dark/50 border-b border-b-black/5"> -->
  <nav class="w-full fixed z-50 bg-transparent">
    <div class="flex justify-between py-4 px-18">
      <div class="flex gap-8">
        <h1 class="font-surfer text-[28px] hover:cursor-pointer">Kotonoha</h1>
        <ul class="h-full flex gap-4 items-center">
          <li class="text-text-secondary hover:cursor-pointer hover:text-white">
            Anime List
          </li>
          <li class="text-text-secondary hover:cursor-pointer hover:text-white">
            Trending
          </li>
        </ul>
      </div>
      <div class="flex gap-8 items-center">
        <UIcon
          name="i-material-symbols:search"
          class="size-7 hover:text-text-secondary hover:cursor-pointer"
        />
        <UIcon
          name="i-material-symbols:account-circle"
          class="size-8 hover:text-text-secondary hover:cursor-pointer"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
