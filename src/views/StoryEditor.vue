<script setup>

const props = defineProps({
  storyId: {
    type: String,
    required: true,
  },
});

// const story = ref(new Story(
//     'Xenoblade Chronicles',
//     'Monolith Soft',
//     // [
//     //     new Character('Noah'), new Character('Mio')
//     // ]
// ));
</script>

<template>
  {{ storyId }}
<!--  <CharacterList-->
<!--      :characters="story.characters"-->
<!--  ></CharacterList>-->
</template>

<style scoped>

</style>