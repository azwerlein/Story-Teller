<script setup>
import Modal from "./Modal.vue";
import {UserSession} from "../models/User.js";
import {ref} from "vue";
import Story from "../models/Story.js";

const props = defineProps({
  userSession: UserSession,
});

const modal = ref(null);
const titleInput = ref(null);

const emit = defineEmits(['createStory']);

const story = ref(new Story());

function createStory() {
  if (!validateFields()) {
    return;
  }
  emit('createStory', story.value);
  modal.value.closeModal();
}

const invalidClass = 'invalid';

function validateFields() {
  let valid = true;
  if (!story.value.title) {
    valid = false;
    titleInput.value.classList.add(invalidClass);
  } else {
    titleInput.value.classList.remove(invalidClass);
  }

  return valid;
}

</script>

<template>
  <Modal ref="modal" button-text="New Story">
    <template #default>
      <h3 class="font-bold text-lg">New Story</h3>
      <label for="titleInput" class="label">Title: </label>
      <input id="titleInput" class="input input-bordered" type="text" ref="titleInput" v-model="story.title">
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