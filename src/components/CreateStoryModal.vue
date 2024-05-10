<script setup>
import Modal from "./Modal.vue";
import {UserSession} from "../models/User.js";
import {ref} from "vue";
import Story from "../models/Story.js";

const props = defineProps({
  userSession: UserSession,
});

const modal = ref(null);

const emit = defineEmits(['createStory']);

function createStory() {
  let title = document.getElementById('titleInput').value;
  let authorId = props.userSession?.user.uid;
  if (!title) {
    console.log('Error! Title is required.');
    return;
  }
  if (!authorId) {
    console.log('Error! Must be logged in.');
  }

  emit('createStory', new Story(null, title, authorId));
  modal.value.closeModal();

}

</script>

<template>
  <Modal ref="modal">
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