<script setup>

import {ref} from "vue";
import {CharacterDescription} from "../models/Character.js";

const props = defineProps({
  section: {
    type: CharacterDescription,
    required: true,
  },
});

const editMode = ref(false);

function toggleEdit() {
  editMode.value = !editMode.value;
}

</script>

<template>
  <section class="">
    <h1 class="text-xl border-b-2 border-neutral">{{ section.name }}</h1>
    <div ref="text">
      {{section.description}}
    </div>
  </section>
</template>

<style scoped>

</style>