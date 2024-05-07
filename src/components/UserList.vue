<script>
import UserCard from "./UserCard.vue";

export default {
  name: "UserList",
  components: {UserCard},
  props: {
    users: {
      type: Array,
      required: true,
    }
  }
}
</script>

<template>
  <UserCard v-for="user in users"
            :id="user.id"
            :profile="user.profile"
            class="my-2"></UserCard>
</template>

<style scoped>

</style>