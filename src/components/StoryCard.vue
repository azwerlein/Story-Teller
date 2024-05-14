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
      <div class="card-body p-[1.25rem]">
        <h3>{{ story.title }}</h3>
        <h4 class="text-wrap">a b c d e f g h j k l m n o p  q qrqweqw re</h4>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>