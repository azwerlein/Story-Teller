<script setup>

import {ref} from "vue";
import CommentSection from "../components/CommentSection.vue";
import CharacterSection from "../components/CharacterSection.vue";
import {CharacterDescription} from "../models/Character.js";

const props = defineProps({
  characterId: {
    type: String,
    required: false,
  }
});

const editMode = ref(false);

const character = ref({
  name: 'Morag',
});
const overview = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate ut pharetra. Diam maecenas sed enim ut sem viverra aliquet eget. Proin libero nunc consequat interdum varius sit. Ultricies integer quis auctor elit sed vulputate mi sit. Facilisi etiam dignissim diam quis. In dictum non consectetur a erat nam at. Suspendisse potenti nullam ac tortor vitae purus. Ultrices dui sapien eget mi proin sed libero enim sed. Mauris rhoncus aenean vel elit scelerisque. Pharetra magna ac placerat vestibulum. Auctor urna nunc id cursus metus aliquam eleifend. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Nam aliquam sem et tortor consequat. Cras pulvinar mattis nunc sed blandit libero. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Varius quam quisque id diam vel quam. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.');
const appearance = ref("Morag has long black hair and wears an officer's uniform.");
const personality = ref('Morag is very loyal to her home country.');

const sections = ref([]);

sections.value.push(new CharacterDescription(
    'Overview',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate ut pharetra. Diam maecenas sed enim ut sem viverra aliquet eget. Proin libero nunc consequat interdum varius sit. Ultricies integer quis auctor elit sed vulputate mi sit. Facilisi etiam dignissim diam quis. In dictum non consectetur a erat nam at. Suspendisse potenti nullam ac tortor vitae purus. Ultrices dui sapien eget mi proin sed libero enim sed. Mauris rhoncus aenean vel elit scelerisque. Pharetra magna ac placerat vestibulum. Auctor urna nunc id cursus metus aliquam eleifend. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Nam aliquam sem et tortor consequat. Cras pulvinar mattis nunc sed blandit libero. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Varius quam quisque id diam vel quam. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.'
));
sections.value.push(new CharacterDescription(
    'Appearance',
    "Morag has long black hair and wears an officer's uniform."
));
sections.value.push(new CharacterDescription(
    'Personality',
    'Morag is very loyal to her home country.'
));


function toggleEditMode() {
  editMode.value = !editMode.value;
}

</script>

<template>
  <div class="w-10/12 m-auto">
    <button class="btn btn-neutral" @click="toggleEditMode">Edit page</button>
    <div id="content" class="overflow-y-auto">
      <div class="float-right text-gray-900 bg-amber-300 border-4 rounded-md border-amber-950 p-8">
        <div class="max-w-64">
          <img
              src="../assets/XC2-Morag-Artwork.png"
              alt="Character Portrait">
        </div>
      </div>
      <CharacterSection v-for="section in sections"
                        :key="section.name"
                        :section="section"
      ></CharacterSection>
    </div>

    <CommentSection></CommentSection>
  </div>

</template>

<style scoped>

</style>