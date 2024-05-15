<script setup>

import {CharacterDescription} from "../models/Character.js";
import {computed, ref, watch} from "vue";

const props = defineProps({
  section: {
    type: CharacterDescription,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['updateDescription']);

const heading = ref(null);
const content = ref(null);

const editMode = ref(false);

const headerEditorStyles = computed(() => ({
  'border-2': editMode.value,
  'border-neutral-content/50': editMode.value,
  'rounded-t-md': editMode.value,
}));

const contentEditorStyles = computed(() => ({
  'border-2': editMode.value,
  'border-neutral-content/50': editMode.value,
  'rounded-b-md': editMode.value,
}));

function enterEditMode() {
  editMode.value = true;
}

function cancelChanges() {
  editMode.value = false;
  heading.value.textContent = props.section.name;
  content.value.textContent = props.section.description;
}

function saveChanges() {
  editMode.value = false;
  props.section.name = heading.value.textContent;
  props.section.description = content.value.textContent;
  emit('updateDescription');
}

</script>

<template>
  <section class="p-4">
    <div class="flex justify-between">
      <div v-bind:class="headerEditorStyles"
           v-bind:contenteditable="editMode"
           class="text-2xl font-semibold border-b-2 border-primary min-h-8 w-full"
           ref="heading"
      >{{ section.name }}
      </div>
      <button class="btn btn-outline btn-primary me-5" @click="enterEditMode">
        <i class="fa-solid fa-pencil fa-lg"></i>
        <p> Edit</p>
      </button>
    </div>
    <div v-bind:class="contentEditorStyles"
         v-bind:contenteditable="editMode"
         class="min-h-32"
         ref="content"
    >{{ section.description }}
    </div>
    <div v-if="editMode" class="flex flex-col md:flex-row md:justify-end gap-y-2 md:gap-x-4 md:mx-2 mt-2">
      <button class="btn btn-primary" @click="saveChanges">Save</button>
      <button class="btn btn-neutral" @click="cancelChanges">Cancel</button>
    </div>
  </section>
</template>

<!--<style scoped>-->
<!--//.headingPlaceholder::before {-->
<!--//  content: 'Enter the section heading';-->
<!--//  @apply text-neutral-content/40;-->
<!--//}-->
<!--//-->
<!--//.contentPlaceholder::before {-->
<!--//  content: 'Enter the section content';-->
<!--//  @apply text-neutral-content/40;-->
<!--//}-->
<!--</style>-->