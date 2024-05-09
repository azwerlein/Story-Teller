<script>
import StoryList from "../components/StoryList.vue";
import CreateStoryModal from "../components/CreateStoryModal.vue";
export default {
  name: "Home",
  components: {CreateStoryModal, StoryList}
}
</script>

<template>
  <div class="grid grid-cols-6 gap-12">
    <div class="col-start-3 col-span-2">
      <CreateStoryModal></CreateStoryModal>
      <StoryList></StoryList>
    </div>
    <div class="col-start-5">
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