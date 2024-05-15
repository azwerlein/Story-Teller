<script setup>

import Modal from "./Modal.vue";
import {ref} from "vue";
import Character from "../models/Character.js";
import ImagePreviewInput from "./imageEditor/ImagePreviewInput.vue";
import {usePictureInput} from "../composables/PictureInput.js";

const modal = ref(null);
const nameInput = ref(null);

const character = ref(new Character());

const emit = defineEmits(['createCharacter']);

function createCharacter() {
  if (validateFields()) {
    emit('createCharacter', character.value);
    modal.value.closeModal();
  }
}

const invalidClass = 'invalid';

function validateFields() {
  let valid = true;
  if (!character.value.name) {
    valid = false;
    nameInput.value.classList.add(invalidClass);
  } else {
    nameInput.value.classList.remove(invalidClass);
  }

  return valid;
}

const {picture, updatePicture, uploadPicture} = usePictureInput();
</script>


<template>
  <Modal ref="modal" button-text="Create Character">
    <template #default>
      <h3 class="font-bold text-lg">New Character</h3>
      <label for="nameInput" class="label">Name: </label>
      <input id="nameInput" ref="nameInput" class="input input-bordered w-full" type="text" v-model.trim="character.name">
      <p class="invalid-message">The name must not be blank.</p>
      <ImagePreviewInput label="Portrait: "
                         id="portrait"
                         @save-image="updatePicture"
      ></ImagePreviewInput>
    </template>
    <template #action="{ closeModal }">
      <button class="btn btn-primary" v-on:click="createCharacter">Create</button>
      <button class="btn" v-on:click="closeModal">Cancel</button>
    </template>
  </Modal>
</template>

<style scoped>

</style>