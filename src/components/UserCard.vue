<script setup>
import {Profile} from "../models/User.js";

defineProps({
  id: {
    type: String,
    required: true,
  },
  profile: {
    type: Profile,
    required: true,
  }
});

</script>

<template>
  <RouterLink :to="{name: 'profile', params: {id: this.id}}">
    <div class="card bg-neutral-600 text-black border-4 border-amber-300">
      <div class="card-body">
        <div class="grid grid-cols-3">
          <img :src="profile.photoURL" alt="Profile">
          <div class="col-span-2">
            <h2>{{ profile.displayName }}</h2>
          </div>
        </div>

      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>