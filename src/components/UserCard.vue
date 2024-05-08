<script>
import {Profile} from "../models/User.js";

export default {
  name: "UserCard",
  props: {
    id: {
      type: String,
      required: true,
    },
    profile: {
      type: Profile,
      required: true,
    }
  }
}
</script>

<template>
  <RouterLink :to="{name: 'profile', params: {id: this.id}}">
    <div class="card bg-neutral-600 text-black border-4 border-amber-300">
      <div class="card-body">
        <div class="grid grid-cols-3">
          <img :src="profile.photoURL" alt="Profile">
          <div class="col-span-2">
            <h2 class="">{{ profile.displayName }}</h2>
          </div>
        </div>

      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>