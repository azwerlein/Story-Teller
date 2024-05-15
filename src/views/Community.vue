<script setup>
import {collection, limit, query} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {profileConverter} from "../models/User.js";
import {defineAsyncComponent} from "vue";
import AsyncLoader from "../components/skeleton/AsyncLoader.vue";
import SkeletonList from "../components/skeleton/SkeletonList.vue";
import SkeletonUserCard from "../components/skeleton/SkeletonUserCard.vue";
const UserList = defineAsyncComponent(() => import("../components/UserList.vue"));

const userQuery = query(collection(db, 'users'), limit(10)).withConverter(profileConverter);

</script>

<template>
  <div>
    <h2 class="text-6xl text-center my-8">Users</h2>
    <Suspense>
      <template #default>
        <AsyncLoader :query="userQuery">
          <template #default="{list}">
            <UserList
                :users="list"
                class="md:grid grid-cols-3 gap-4"></UserList>
          </template>
        </AsyncLoader>
      </template>
      <template #fallback>
        <SkeletonList
            :size="10"
            :skeleton="SkeletonUserCard"
            class="md:grid grid-cols-3 gap-4"
        ></SkeletonList>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>

</style>