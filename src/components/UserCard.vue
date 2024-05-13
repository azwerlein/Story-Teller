<script setup>
import {Profile} from "../models/User.js";

const props = defineProps({
  profile: {
    type: Profile,
    required: true,
  }
});

</script>

<template>
  <RouterLink :to="{name: 'profile', params: {id: props.profile.uid}}">
    <div class="card bg-neutral-600 text-black border-4 border-amber-300">
      <div class="card-body">
        <div class="grid grid-cols-3">
          <div>
            <div class="w-32 h-32 mb-4">
              <img class="rounded-full border-neutral border-2" :src="profile.photoURL" alt="Profile">
            </div>
            <div class="flex justify-center w-32 h-32 rounded-full border-neutral border-2">
              <h1 class="m-auto">{{ profile.level }}</h1>
            </div>
          </div>
          <div class="col-span-2">
            <h1>{{ profile.displayName }}</h1>
          </div>
        </div>

      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>