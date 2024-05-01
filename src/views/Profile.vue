<script>
export default {
  name: "Profile",
  props: {},
}
</script>

<template>
  <div class="w-32 m-auto content-ce">
    <div class="profile">
      <img class="rounded-full border-4 border-slate-400" src="../assets/profilepic.jpg" alt="Profile Picture"/>
      <div class="level">
        <p class="rounded-full border-2 border-slate-400 p-auto">3</p>
      </div>
    </div>
    <div class="progress">

    </div>
    <p>xxUserxx</p>
  </div>
</template>

<style scoped>
.profile {
  position: relative;
}

.profile > .level {
  position: absolute;
  right: 0;
  bottom: 10%;
  width: auto;
}

</style>