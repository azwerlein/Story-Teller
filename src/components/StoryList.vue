<script>
import StoryCard from "./StoryCard.vue";
import Story from "../models/Story.ts";

export default {
  name: "StoryList",
  components: {StoryCard},
  data() {
    return {
      stories: [
        new Story('Xenoblade Chronicles', 'Monolith Soft'),
        new Story('Final Fantasy IV', 'Square Enix'),
      ]
    }
  },
}
</script>

<template>
  <StoryCard v-for="story in stories"
             :title=story.title
             :author=story.author
             class="my-2"></StoryCard>
</template>

<style scoped>

</style>