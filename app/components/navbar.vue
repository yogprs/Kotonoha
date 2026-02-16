<script setup lang="ts">
const router = useRouter();
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const goHome = () => {
  router.push("/");
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    class="w-full fixed z-50 transition-colors duration-300"
    :class="isScrolled ? 'bg-surface-dark/60 backdrop-blur' : 'bg-transparent'"
  >
    <div class="flex justify-between py-4 px-7 md:px-12 lg:px-18">
      <div class="flex gap-8">
        <h1
          @click="goHome"
          class="font-surfer text-[28px] hover:cursor-pointer"
        >
          Kotonoha
        </h1>

        <ul class="h-full hidden md:flex gap-4 items-center">
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
          class="size-8 hover:text-text-secondary hover:cursor-pointer hidden md:block"
        />
        <UIcon
          name="i-material-symbols:menu-rounded"
          class="size-8 hover:text-text-secondary hover:cursor-pointer block md:hidden"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
