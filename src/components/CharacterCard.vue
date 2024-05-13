<script setup>
import Character from "../models/Character.js";

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
  <RouterLink :to="{name: 'charactereditor', params: {characterId: character.uid}}">
    <div class="card bg-slate-600 text-black p-4">
      <div class="flex justify-end w-full">
        <button class="btn btn-secondary p-2"
                @click="deleteCharacter"
        >Delete</button>
      </div>
      <div class="card-body">
        <h2>{{ character.name }}</h2>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>