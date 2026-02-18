<script setup lang="ts">
interface Props {
  data: MediaDetail;
}

const props = defineProps<Props>();

const detail = computed(() => props?.data);
</script>

<template>
  <div v-if="!detail">Loading</div>
  <div v-else>
    {{ detail }}
  </div>
</template>
