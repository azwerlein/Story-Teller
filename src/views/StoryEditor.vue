<script setup>

import CharacterList from "../components/CharacterList.vue";

import {ref} from "vue";
import {addDoc, collection, doc, deleteDoc, query, where} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {characterConverter} from "../models/Character.js";
import {useSessionStore} from "../js/store.js";
import {useCollectionSnapshotListener, useDocumentSnapshotListener} from "../composables/SnapshotListener.js";
import CreateCharacterModal from "../components/CreateCharacterModal.vue";

const store = useSessionStore();

const props = defineProps({
  storyId: {
    type: String,
    required: true,
  },
});

const story = ref(null);
useDocumentSnapshotListener(doc(db, 'stories', props.storyId), story);

const characters = ref([]);
const characterCollection = collection(db, 'characters').withConverter(characterConverter);
const characterQuery = query(characterCollection, where('storyId', '==', props.storyId));
useCollectionSnapshotListener(characterQuery, characters);


function addCharacter(character) {
  character.storyId = props.storyId;
  addDoc(characterCollection, character)
      .catch(error => {
        console.error('ERROR: ', error.code, error.data);
      });
}

function deleteCharacter(uid) {
  deleteDoc(doc(characterCollection, uid))
      .catch(error => {
        console.error('Error: ', error.code, error.message);
      });
}

</script>

<template>
  <div class="w-10/12 m-auto p-2">
    <RouterLink class="btn btn-neutral" :to="{name: 'home'}"><</RouterLink>
    <div v-if="story" class="p-8">
      <h1>{{story.title}}</h1>
      <CreateCharacterModal @create-character="addCharacter"></CreateCharacterModal>
      <CharacterList
          :characters="characters"
          @delete-character="deleteCharacter"
      ></CharacterList>
    </div>
  </div>
</template>

<style scoped>

</style>