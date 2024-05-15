<script setup>

import {onMounted, ref} from "vue";
import CommentSection from "../components/comments/CommentSection.vue";
import CharacterSection from "../components/CharacterDescriptionSection.vue";
import {characterConverter, CharacterDescription, characterDescriptionListConverter} from "../models/Character.js";
import {collection, doc, getDoc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {useDocumentSnapshotListener} from "../composables/SnapshotListener.js";
import ImagePreviewInput from "../components/imageEditor/ImagePreviewInput.vue";
import {useSessionStore} from "../js/store.js";

const store = useSessionStore();

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
const descriptionDocRef = doc(collection(db, 'stories', props.storyId, 'characters', props.characterId, 'characterDescriptions'), props.characterId).withConverter(characterDescriptionListConverter);
getDoc(descriptionDocRef).then(docSnap => {
  if (docSnap.exists()) {
    sections.value = docSnap.data();
  }
}).catch(error => {
  console.error('Error: ', error.code, error.message);
});

onMounted(() => {
  // This adds a simple template for users to follow.
  if (sections.value.length === 0) {
    sections.value.push(new CharacterDescription(
        'Overview',
        '',
    ));
    sections.value.push(new CharacterDescription(
        'Appearance',
        "",
    ));
    sections.value.push(new CharacterDescription(
        'Personality',
        '',
    ));
  }
});

function addNewSection() {
  let desc = new CharacterDescription();
  desc.authorId = character.value.authorId;
  sections.value.push(desc);
}

function updateDescription() {
  sections.value.forEach(section => section.authorId = character.value.authorId);
  setDoc(descriptionDocRef, sections.value)
      .catch(error => {
    console.error('Error: ', error.code, error.message);
  });
}

const imageEditMode = ref(false);

</script>

<template>
  <div class="w-11/12 m-auto p-8">
    <RouterLink class="btn btn-neutral" :to="{name: 'storyeditor'}"><</RouterLink>
    <div v-if="character">
      <h1>{{ character.name }}</h1>
      <div id="content" class="md:grid grid-cols-3 grid-flow-row-dense overflow-y-auto">
        <div class="col-start-3 text-gray-900 bg-neutral rounded-md p-8">
          <div class="w-64 h-64 m-auto">
            <ImagePreviewInput v-if="imageEditMode"
                               label="Character Image"></ImagePreviewInput>
            <img v-else
                 class="h-full w-full"
                 :src="character.photoURL"
                 alt="Character portrait not found">
          </div>
        </div>
        <CharacterSection v-for="(section, i) in sections"
                          :key="section.name"
                          :section="section"
                          :index="i"
                          @update-description="updateDescription"
                          class="col-span-2 col-start-1"
        ></CharacterSection>
        <button class="btn btn-primary col-start-1" @click="addNewSection">Add Section</button>
      </div>

      <CommentSection :original-post-id="characterId"
                      type="character"
      ></CommentSection>
    </div>
  </div>

</template>

<style scoped>
</style>