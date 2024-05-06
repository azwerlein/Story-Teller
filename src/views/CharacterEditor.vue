<script>
import Character from "../models/Character.ts";

export default {
  name: "CharacterEditor",
  props: {
    character: {
      type: Character,
      required: true,
    }
  },
}
</script>

<template>
  <h1>{{ character.name }}</h1>
</template>

<style scoped>

</style>