<script setup>

import Story from "../models/Story.js";
import {ref} from "vue";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../js/firebase.js";

const props = defineProps({
  story: {
    type: Story,
    required: true,
  }
});

const authorName = ref('');
getDoc(doc(db, 'users', props.story.authorId))
    .then((docSnap) => {
      if (docSnap.exists()) {
        authorName.value = docSnap.data().displayName;
      }
    })
    .catch(error => {
      console.error('Error: ', error.code, error.message);
    });

</script>

<template>
  <RouterLink :to="{name: 'storyeditor', params: {storyId: story.uid}}">
    <div class="card bg-neutral text-neutral-content border-4 border-neutral my-4">
      <div class="card-body p-[1.25rem]">
        <h3>{{ story.title }}</h3>
        <h4 class="text-wrap">{{ authorName }}</h4>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>