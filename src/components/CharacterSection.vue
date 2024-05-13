<script setup>

import {CharacterDescription} from "../models/Character.js";
import {computed, ref, watch} from "vue";

const props = defineProps({
  section: {
    type: CharacterDescription,
    required: true,
  },
  // editMode: {
  //   type: Boolean,
  //   default: false,
  // },
});

const editMode = ref(false);


const editorClass = computed(() => {
  return {
    'border-4 border-primary': editMode.value,
  }
});

function enterEditMode() {
  editMode.value = true;
}

</script>

<template>
  <section class="">
    <div class="flex justify-between">
      <h1 v-bind:class="editorClass" class="text-xl border-b-2 border-neutral">{{ section.name }}</h1>
      <div class="me-5" @click="enterEditMode">
        <i class="fa-solid fa-pencil fa-lg"></i>
      </div>
    </div>
    <div v-bind:class="editorClass" ref="text">
      {{ section.description }}
    </div>
  </section>
</template>

<style scoped>

</style>