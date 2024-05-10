<script setup>

import CharacterList from "../components/CharacterList.vue";

import {onMounted, ref} from "vue";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {db} from "../js/firebase.js";
import Character, {characterConverter} from "../models/Character.js";

const props = defineProps({
  storyId: {
    type: String,
    required: true,
  },
});


const characters = ref([]);
const collectionRef = collection(db, 'stories', props.storyId, 'characters').withConverter(characterConverter);

{
  getDocs(query(collectionRef))
      .then(snapshot => {
        snapshot.forEach(doc => {
          characters.value.push(doc.data());
        });
      })
      .catch(error => {
        console.log('ERROR: ', error.code, error.data);
      });
}

function addCharacter() {
  addDoc(collectionRef, new Character('Tom'))
      .catch(error => {
        console.log('ERROR: ', error.code, error.data);
      });
}

</script>

<template>
  {{ storyId }}
  <button class="btn"
          @click="addCharacter"
  >Add dummy character
  </button>
  <CharacterList
      :characters="characters"
  ></CharacterList>
</template>

<style scoped>

</style>