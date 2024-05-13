<script setup>

import CharacterList from "../components/CharacterList.vue";

import {ref} from "vue";
import {addDoc, collection, doc, deleteDoc, query} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {characterConverter} from "../models/Character.js";
import {useSessionStore} from "../js/store.js";
import {useCollectionSnapshotListener} from "../composables/SnapshotListener.js";
import CreateCharacterModal from "../components/CreateCharacterModal.vue";

const store = useSessionStore();

const props = defineProps({
  storyId: {
    type: String,
    required: true,
  },
});

const characters = ref([]);

const collectionRef = collection(db, 'stories', props.storyId, 'characters').withConverter(characterConverter);
useCollectionSnapshotListener(query(collectionRef), characters);


function addCharacter(character) {
  addDoc(collectionRef, character)
      .catch(error => {
        console.error('ERROR: ', error.code, error.data);
      });
}

function deleteCharacter(uid) {
  deleteDoc(doc(collectionRef, uid))
      .catch(error => {
        console.error('Error: ', error.code, error.message);
      });
}

</script>

<template>
  <div class="m-auto w-10/12">
    {{ storyId }}
    <CreateCharacterModal @create-character="addCharacter"></CreateCharacterModal>
    <CharacterList
        :characters="characters"
        @delete-character="deleteCharacter"
    ></CharacterList>
  </div>
</template>

<style scoped>

</style>