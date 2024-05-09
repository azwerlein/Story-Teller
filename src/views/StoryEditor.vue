<script setup>
import CharacterList from "../components/CharacterList.vue";
import Story from "../models/Story.ts";
import Character from "../models/Character.js";
import {ref} from "vue";

const story = ref(new Story(
    'Xenoblade Chronicles',
    'Monolith Soft',
    [
        new Character('Noah'), new Character('Mio')
    ]
));
</script>

<template>
  <CharacterList
      :characters="story.characters"
  ></CharacterList>
</template>

<style scoped>

</style>