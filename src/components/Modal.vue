<script setup>

import {ref} from "vue";

defineProps({
  // If this is undefined, the button is hidden.
  buttonText: {
    type: String,
  }
});

defineExpose({
  showModal,
  closeModal,
});

const modal = ref(null);

function showModal() {
  modal.value.showModal();
}

function closeModal() {
  modal.value.close();
}

</script>

<template>
  <div>
    <button v-if="buttonText" class="btn btn-primary my-4" v-on:click="showModal">{{ buttonText }}</button>
    <dialog ref="modal" class="modal">
      <div class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" v-on:click="closeModal">✕</button>
        <slot></slot>
        <div class="modal-action">
          <slot name="action" :closeModal="closeModal"></slot>
        </div>
      </div>
      <div class="modal-backdrop" v-on:click="closeModal"></div>
    </dialog>
  </div>
</template>

<style scoped>

</style>