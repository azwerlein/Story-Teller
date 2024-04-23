<script>
import StoryCard from "../App.vue";

export default {
  name: "StoryList",
  components: {StoryCard},
  data() {
    return {
      stories: [
        {title: 'Xenoblade Chronicles', author: 'Monolith Soft'},
        {title: 'Final Fantasy IV',}
      ]
    }
  },
}
</script>

<template>
  <story-card v-for="story in stories"
  :title=story.title
  :author=story.author></story-card>
</template>

<style scoped>

</style>