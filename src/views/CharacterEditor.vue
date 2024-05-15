<script setup>

import {ref} from "vue";
import CommentSection from "../components/comments/CommentSection.vue";
import CharacterSection from "../components/CharacterSection.vue";
import {characterConverter, CharacterDescription, characterDescriptionListConverter} from "../models/Character.js";
import {collection, doc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {useDocumentSnapshotListener} from "../composables/SnapshotListener.js";
import ImagePreviewInput from "../components/imageEditor/ImagePreviewInput.vue";

const props = defineProps({
  storyId: {
    type: String,
    required: true,
  },
  characterId: {
    type: String,
    required: true,
  }
});

const character = ref(null);
const characterDocRef = doc(collection(db, 'stories', props.storyId, 'characters'), props.characterId).withConverter(characterConverter);
useDocumentSnapshotListener(characterDocRef, char => character.value = char);

const sections = ref([]);
const descriptionDocRef = doc(db, 'characterDescriptions', props.characterId).withConverter(characterDescriptionListConverter);
useDocumentSnapshotListener(descriptionDocRef, desc => sections.value = desc);

// if (sections.value.length === 0) {
//   sections.value.push(new CharacterDescription(
//       'Overview',
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate ut pharetra. Diam maecenas sed enim ut sem viverra aliquet eget. Proin libero nunc consequat interdum varius sit. Ultricies integer quis auctor elit sed vulputate mi sit. Facilisi etiam dignissim diam quis. In dictum non consectetur a erat nam at. Suspendisse potenti nullam ac tortor vitae purus. Ultrices dui sapien eget mi proin sed libero enim sed. Mauris rhoncus aenean vel elit scelerisque. Pharetra magna ac placerat vestibulum. Auctor urna nunc id cursus metus aliquam eleifend. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Nam aliquam sem et tortor consequat. Cras pulvinar mattis nunc sed blandit libero. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Varius quam quisque id diam vel quam. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.'
//   ));
//   sections.value.push(new CharacterDescription(
//       'Appearance',
//       "Morag has long black hair and wears an officer's uniform."
//   ));
//   sections.value.push(new CharacterDescription(
//       'Personality',
//       'Morag is very loyal to her home country.'
//   ));
//   setDoc(descriptionDocRef, sections.value);
// }

function addNewSection() {
  sections.value.push(new CharacterDescription());
}

function updateDescription(description) {
  updateDoc(descriptionDocRef, {
    [description.name]: description.description,
  }).catch(error => {
    console.error('Error: ', error.code, error.message);
  });
}

const imageEditMode = ref(false);
// const backupSections = ref([]);

// function enterEditMode() {
//   editMode.value = true;
//   backupSections.value = [];
//   sections.value.forEach(desc => backupSections.value.push(desc));
// }

</script>

<template>
  <div class="w-11/12 m-auto p-8">
    <div v-if="character">
      <div class="flex justify-end w-full">
        <!--      <div v-if="editMode">-->
        <!--        &lt;!&ndash;        <button class="btn btn-neutral me-2" @click="cancelChanges">Cancel</button>&ndash;&gt;-->
        <!--        &lt;!&ndash;        <button class="btn btn-primary ms-2" @click="saveChanges">Save</button>&ndash;&gt;-->
        <!--      </div>-->
        <!--      <div v-else>-->
        <!--        &lt;!&ndash;        <button class="btn btn-neutral" @click="enterEditMode">Edit page</button>&ndash;&gt;-->
        <!--      </div>-->
      </div>
      <h1>{{ character.name }}</h1>
      <div id="content" class="md:grid grid-cols-3 grid-flow-row-dense overflow-y-auto">
        <div class="col-start-3 text-gray-900 bg-neutral rounded-md p-8">
          <div class="max-w-64">
            <ImagePreviewInput v-if="imageEditMode"
                               label="Character Image"></ImagePreviewInput>
            <img v-else
                 :src="character.photoURL"
                 alt="Character Portrait">
          </div>
        </div>
        <CharacterSection v-for="section in sections"
                          :key="section.name"
                          :section="section"
                          @update-description="updateDescription"
                          class="col-span-2 col-start-1"
        ></CharacterSection>
        <button class="btn btn-primary" @click="addNewSection">Add Section</button>
      </div>

      <CommentSection :original-post-id="characterId"
                      type="character"
      ></CommentSection>
    </div>
  </div>

</template>

<style scoped>
</style>