<script>
import StoryList from "../components/StoryList.vue";
export default {
  name: "Home",
  components: {StoryList}
}
</script>

<template>
  <div class="grid grid-cols-5 gap-12">
    <div class="col-start-2 col-span-2">
      <StoryList></StoryList>
    </div>
    <div class="col-start-4">
      <!--      // Placeholder-->
      <h1>Inspiration list</h1>
      <div class="my-2 bg-neutral card-body">
        <h1>inspiration placeholder</h1>
      </div>
      <div class="my-2 bg-neutral card-body">
        <h1>inspiration placeholder</h1>
      </div>
      <div class="my-2 bg-neutral card-body">
        <h1>inspiration placeholder</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>