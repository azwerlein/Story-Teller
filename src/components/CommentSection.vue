<script setup>

import {ref} from "vue";
import Comment from "./Comment.vue";

const comments = ref([
  {
    author: 'Alexander',
    content: 'This is a comment.',
  },
  {
    author: 'Mio',
    content: 'This is a comment.',
  },
  {
    author: 'Tommy',
    content: 'This is a comment.',
  },
]);
</script>

<template>
  <div class="bg-slate-700 p-8">
    <Comment v-for="comment in comments"
             :comment="comment"
    ></Comment>
  </div>
</template>

<style scoped>

</style>