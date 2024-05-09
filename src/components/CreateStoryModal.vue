<script>
export default {
  name: "CreateStoryModal",
  methods: {
    showModal() {
      this.$refs.modal.showModal();
    },
    closeModal() {
      this.$refs.modal.close();
    },
    createStory() {

    }
  },
}
</script>

<template>
  <button class="btn" v-on:click="showModal">New story</button>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" v-on:click="closeModal">✕</button>
      <h3 class="font-bold text-lg">New Story</h3>
      <label for="titleInput" class="label">Title: </label>
      <input id="titleInput" class="input input-bordered" type="text">
      <label for="genreInput" class="label">Genre: </label>
      <input id="genreInput" class="input input-bordered" type="text">
      <div class="modal-action">
        <button class="btn" v-on:click="createStory">Create</button>
        <button class="btn" v-on:click="closeModal">Cancel</button>
      </div>
    </div>
    <div class="modal-backdrop" v-on:click="closeModal"></div>
  </dialog>
</template>

<style scoped>

</style>