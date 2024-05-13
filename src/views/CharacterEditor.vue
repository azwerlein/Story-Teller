<script setup>

import {ref} from "vue";
import CommentSection from "../components/CommentSection.vue";
import CharacterSection from "../components/CharacterSection.vue";
import {characterConverter, CharacterDescription, characterDescriptionConverter} from "../models/Character.js";
import {collection, doc, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {useDocumentSnapshotListener} from "../composables/SnapshotListener.js";

const props = defineProps({
  characterId: {
    type: String,
    required: false,
  }
});

const character = ref(null);
const characterDocRef = doc(collection(db, 'characters'), props.characterId).withConverter(characterConverter);
useDocumentSnapshotListener(characterDocRef, character);

const sections = ref([]);
const descriptionDocRef = doc(db, 'characterDescriptions', props.characterId).withConverter(characterDescriptionConverter);
useDocumentSnapshotListener(descriptionDocRef);

if (sections.value.length === 0) {
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
  // setDoc(descriptionDocRef, sections.value);
}

function addNewSection() {
  sections.value.push(new CharacterDescription());
}

const editMode = ref(false);
const backupSections = ref([]);

function enterEditMode() {
  editMode.value = true;
  backupSections.value = [];
  sections.value.forEach(desc => backupSections.value.push(desc));
}

function cancelChanges() {
  editMode.value = false;
  sections.value = backupSections.value;
}

function saveChanges() {
  editMode.value = false;
}

</script>

<template>
  <div class="w-11/12 m-auto p-8">
    <div class="flex justify-end w-full">
      <div v-if="editMode">
        <button class="btn btn-neutral me-2" @click="cancelChanges">Cancel</button>
        <button class="btn btn-primary ms-2" @click="saveChanges">Save</button>
      </div>
      <div v-else>
        <button class="btn btn-neutral" @click="enterEditMode">Edit page</button>
      </div>
    </div>
    <h1 v-if="character">{{ character.name }}</h1>
    <div id="content" class="overflow-y-auto">
      <div class="float-right text-gray-900 bg-neutral rounded-md p-8">
        <div class="max-w-64">
          <img
              src="../assets/XC2-Morag-Artwork.png"
              alt="Character Portrait">
        </div>
      </div>
      <div>
        <CharacterSection v-for="section in sections"
                          :key="section.name"
                          :section="section"
                          :edit-mode="editMode"
        ></CharacterSection>
        <button v-if="editMode" class="btn" @click="addNewSection">Add Section</button>
      </div>
    </div>

    <CommentSection></CommentSection>
  </div>

</template>

<style scoped>

</style>