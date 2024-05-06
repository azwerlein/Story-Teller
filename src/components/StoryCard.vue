<script>
export default {
  name: "StoryCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    }
  }
}
</script>

<template>
  <div class="card bg-neutral-600 text-black border-4 border-amber-300">
    <div class="card-body">
      <h2>{{ title }}</h2>
      <h3>{{ author }}</h3>
    </div>
  </div>
</template>

<style scoped>

</style>