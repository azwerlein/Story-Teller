<script setup>
import CharacterCard from "./CharacterCard.vue";

defineProps({
  characters: {
    type: Array,
    required: true,
  }
});

</script>

<template>
  <CharacterCard v-for="character in characters"
             :character="character"></CharacterCard>
</template>

<style scoped>

</style>