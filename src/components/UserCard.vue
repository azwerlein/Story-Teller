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
    <div class="card bg-neutral border-4 border-primary text-neutral-content my-4">
      <div class="card-body">
        <div class="grid grid-cols-3">
          <div>
            <div class="w-24 h-24 md:w-32 md:h-32 mb-4">
              <img class="rounded-full border-primary border-2" :src="profile.photoURL" alt="Profile">
            </div>
            <div class="flex justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border-primary border-2">
              <h2 class="m-auto">{{ profile.level }}</h2>
            </div>
          </div>
          <div class="col-span-2 flex flex-col gap-y-4">
            <h2 class="text-3xl">{{ profile.displayName }}</h2>
            <progress class="progress progress-primary h-4 md:my-4 md:h-8 w-full" :value="profile.xp" max="100"></progress>
            <h3 class="content-center text-center">{{ profile.xp }}/100 XP</h3>
            <div class="flex flex-row justify-evenly gap-x-4">
              <div class="bg-blue-400 w-16 h-16 md:w-28 md:h-28 rounded-md"></div>
              <div class="bg-green-400 w-16 h-16 md:w-28 md:h-28 rounded-md"></div>
              <div class="bg-red-400 w-16 h-16 md:w-28 md:h-28 rounded-md"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>