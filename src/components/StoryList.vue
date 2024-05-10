<script setup>
import StoryCard from "./StoryCard.vue";

const props = defineProps({
  stories: {
    type: Array,
    required: true,
  }
});

</script>

<template>
  <div>
    <StoryCard v-for="story in stories"
               :story="story"
               class="my-2"></StoryCard>
  </div>
</template>

<style scoped>

</style>