<script>
import Character from "../models/Character.ts";

export default {
  name: "CharacterCard",
  props: {
    character: {
      type: Character,
      required: true,
    }
  },
}
</script>

<template>
  <RouterLink :to="{name: 'charactereditor'}">
    <div class="card bg-slate-600 text-black">
      <div class="card-body">
        <h2>{{ character.name }}</h2>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>