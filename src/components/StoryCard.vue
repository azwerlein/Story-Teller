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
        <h3>{{ story.title }}</h3>
        <h4>{{ story.author }}</h4>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>