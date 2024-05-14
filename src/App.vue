<script setup>
import {useSessionStore} from "./js/store.js";
import Navigation from "./components/Navigation.vue";

const store = useSessionStore();
store.init();

</script>

<template>
  <Navigation></Navigation>
  <main class="bg-base-100">
    <RouterView class="min-h-[60vh]"></RouterView>
  </main>

  <footer class="flex justify-center w-4/5 p-5 border-t-2 border-neutral m-auto">
    <p>&copy; 2024 Cactus corp.</p>
  </footer>

</template>

<style scoped>

</style>
