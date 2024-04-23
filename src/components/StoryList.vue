<script>
import StoryCard from "./StoryCard.vue";

export default {
  name: "StoryList",
  components: {StoryCard},
  data() {
    return {
      stories: [
        {title: 'Xenoblade Chronicles', author: 'Monolith Soft'},
        {title: 'Final Fantasy IV', author: 'Square Enix'}
      ]
    }
  },
}
</script>

<template>
  <StoryCard v-for="story in stories"
             :title=story.title
             :author=story.author></StoryCard>
</template>

<style scoped>

</style>