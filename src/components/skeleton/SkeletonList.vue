<script setup>
import SkeletonUserCard from './SkeletonUserCard.vue';

const props = defineProps({
  size: {
    type: Number,
    required: true,
  }
});
</script>

<template>
  <div>
    <component
        v-for="index in size"
        :key="index"
        :is="SkeletonUserCard"
        class="my-2"
    ></component>
  </div>
</template>

<style scoped>

</style>