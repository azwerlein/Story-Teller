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
  <div class="card bg-slate-600 text-black">
    <div class="card-body">
      <h2>{{ title }}</h2>
      <h3>{{ author }}</h3>
    </div>
  </div>
</template>

<style scoped>

</style>