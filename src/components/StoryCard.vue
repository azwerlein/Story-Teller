<script setup>

import Story from "../models/Story.js";

defineProps({
  story: {
    type: Story,
    required: true,
  }
});
</script>

<template>
  <RouterLink :to="{name: 'storyeditor', params: {storyId: story.uid}}">
    <div class="card bg-neutral text-neutral-content border-4 border-neutral my-4">
      <div class="card-body">
        <h2>{{ story.title }}</h2>
        <h3>{{ story.author }}</h3>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>