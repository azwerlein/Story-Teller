<script setup>
import Character from "../models/Character.js";
import {router} from "../js/router.js";

const props = defineProps({
  character: {
    type: Character,
    required: true,
  }
});

const emit = defineEmits(['deleteCharacter']);

function deleteCharacter() {
  emit('deleteCharacter', props.character.uid);
}

</script>

<template>
  <div>
    <div class="card bg-neutral/50 text-neutral-content p-4 transition ease-linear hover:scale-100 hover:bg-neutral">
      <div class="flex justify-end w-full">
        <button @click="deleteCharacter"
        ><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="card-body"
           @click.self="router.push({name: 'charactereditor', params: {characterId: character.uid}})">
        <h2>{{ character.name }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>