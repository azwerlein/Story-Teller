<script setup>
import Modal from "./Modal.vue";

function createStory() {

}

</script>

<template>
  <Modal>
    <template #default>
      <h3 class="font-bold text-lg">New Story</h3>
      <label for="titleInput" class="label">Title: </label>
      <input id="titleInput" class="input input-bordered" type="text">
      <label for="genreInput" class="label">Genre: </label>
      <input id="genreInput" class="input input-bordered" type="text">
    </template>
    <template #action="{ closeModal }">
      <button class="btn" v-on:click="createStory">Create</button>
      <button class="btn" v-on:click="closeModal">Cancel</button>
    </template>
  </Modal>
</template>

<style scoped>

</style>