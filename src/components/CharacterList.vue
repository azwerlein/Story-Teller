<script setup>
import CharacterCard from "./CharacterCard.vue";

defineProps({
  characters: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(['deleteCharacter']);

</script>

<template>
  <div>
    <TransitionGroup name="list">
      <CharacterCard v-for="character in characters"
                     :character="character"
                     :key="character.uid"
                     @delete-character="id => emit('deleteCharacter', id)"
      ></CharacterCard>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.8s ease-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>