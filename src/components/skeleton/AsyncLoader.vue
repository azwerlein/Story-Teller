<script setup>
/*
 * This is a wrapper class to handle asynchronous data fetching from Firebase. This is how I'm approaching skeleton loaders.
 */
import {getDocs, Query} from "firebase/firestore";
import {ref} from "vue";

const props = defineProps({
  query: {
    type: Query,
    required: true,
  }
});

// To demonstrate the skeleton loader, make the loading time take longer.
await new Promise(resolve => setTimeout(resolve, 2000));

const list = ref([]);
const snapshot = await getDocs(props.query);
snapshot.forEach(doc => {
  list.value.push(doc.data());
});


</script>

<template>
  <slot :list="list"></slot>
</template>

<style scoped>

</style>