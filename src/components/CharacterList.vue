<script>
import Character from "../models/Character.js";
import CharacterCard from "./CharacterCard.vue";

export default {
  name: "CharacterList",
  components: {CharacterCard},
  props: {
    characters: {
      type: Array,
      required: true,
    }
  },
}
</script>

<template>
  <CharacterCard v-for="character in characters"
             :name="character.name"></CharacterCard>
</template>

<style scoped>

</style>