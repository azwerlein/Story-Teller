<script setup>

import {ref} from "vue";

defineProps({
  hideButton: {
    type: Boolean,
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
  <button v-if="!hideButton" class="btn" v-on:click="showModal">New story</button>
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
</template>

<style scoped>

</style>