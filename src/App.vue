<script setup>
import {useSessionStore} from "./js/store.js";
import Navigation from "./components/Navigation.vue";

const store = useSessionStore();
store.init();

</script>

<template>
  <Navigation></Navigation>
  <main class="bg-base-100">
    <RouterView></RouterView>
  </main>

  <footer class="flex justify-center w-full p-20 bg-neutral/50 border-t-2 border-neutral">
    <p>&copy; 2024 Cactus corp.</p>
  </footer>

</template>

<style scoped>

</style>
