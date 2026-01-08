<script setup lang="ts">
const showScrollTop = ref(false);

const onScroll = () => {
  // show button if scroll > 200px
  showScrollTop.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  // set first condition
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div class="w-full bg-bg-light dark:bg-bg-dark font-lora">
    <UApp>
      <Navbar />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <Footer />
    </UApp>
  </div>
  <section class="flex justify-center items-center">
    <div
      v-show="showScrollTop"
      @click="scrollToTop"
      class="text-lg size-10 p-2 fixed bottom-[5%] right-[1.5%] z-50 cursor-pointer bg-surface-dark text-white shadow-lg shadow-violet-900/40 ring-1 ring-violet-400/30 hover:bg-primary transition-all duration-300 rounded-full"
    >
      <UIcon name="i-material-symbols:arrow-upward" class="w-full h-full" />
    </div>
  </section>
</template>
