<script setup>

const props = defineProps({
  size: {
    type: Number,
    required: true,
  },
  skeleton: {
    type: Object,
    required: true,
  }
});

</script>

<template>
  <div>
    <component
        v-for="index in size"
        :key="index"
        :is="skeleton"
        class="my-2"
    ></component>
  </div>
</template>

<style scoped>

</style>