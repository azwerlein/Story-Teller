<script setup>

import Modal from "./Modal.vue";
import {ref} from "vue";
import Character from "../models/Character.js";

const modal = ref(null);
const nameInput = ref(null);

const invalidClass = ref('invalid');

const character = ref(new Character());

const emit = defineEmits(['createCharacter']);

function createCharacter() {
  if (validateFields()) {
    emit('createCharacter', character.value);
    modal.value.closeModal();
  }
}

function validateFields() {
  let valid = true;
  if (!character.value.name) {
    valid = false;
    nameInput.value.classList.add(invalidClass.value);
  } else {
    nameInput.value.classList.remove(invalidClass.value);
  }

  return valid;
}

</script>

<template>
  <Modal ref="modal" button-text="Create Character">
    <template #default>
      <h3 class="font-bold text-lg">New Character</h3>
      <label for="nameInput" class="label">Name: </label>
      <input id="nameInput" ref="nameInput" class="input input-bordered" type="text" v-model.trim="character.name">
      <p class="invalid-message">The name must not be blank.</p>
    </template>
    <template #action="{ closeModal }">
      <button class="btn" v-on:click="createCharacter">Create</button>
      <button class="btn" v-on:click="closeModal">Cancel</button>
    </template>
  </Modal>
</template>

<style scoped>

</style>