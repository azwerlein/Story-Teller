<script setup>
import Modal from "../Modal.vue";
import {onMounted, ref} from "vue";

const props = defineProps({
  width: {
    type: Number,
    default: 256,
  },
  height: {
    type: Number,
    default: 256,
  },
});

defineExpose({
  showPreview,
});

const emit = defineEmits(['saveImage']);

const canvasElement = ref(null);
const modal = ref(null);

const image = ref({});
const scale = ref(1);
const zoom = ref(1);
const position = ref({
  x: 0,
  y: 0,
});
const isDragging = ref(false);

onMounted(() => {
  canvasElement.value.height = props.height;
  canvasElement.value.width = props.width * 2;
});

function showPreview(img) {
  image.value = img;
  adjustDimensions(img);
  draw();
  modal.value.showModal();
}

function adjustDimensions(img) {
  scale.value = props.height / img.height;
  if (img.width * scale.value < props.width) {
    scale.value = props.width / img.width;
  }
}

function adjustZoom(event) {
  zoom.value = event.target.value;
  draw();
}

function translate(event) {
  if (isDragging.value) {
    position.value.x += event.movementX;
    position.value.y += event.movementY;
    draw();
  }
}

function draw() {
  const canvas = canvasElement.value;
  const ctx = canvas.getContext('2d');
  let halfWidth = props.width / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(zoom.value, zoom.value);
  ctx.translate(position.value.x, position.value.y);
  ctx.drawImage(image.value, halfWidth, 0, image.value.width * scale.value, image.value.height * scale.value);
  ctx.restore();
  ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
  ctx.fillRect(0, 0, halfWidth, props.height);
  ctx.fillRect(canvas.width - halfWidth, 0, halfWidth, props.height);
}

function saveChanges() {
  const canvas = canvasElement.value;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = props.width;
  ctx.save();
  ctx.scale(zoom.value, zoom.value);
  ctx.translate(position.value.x, position.value.y);
  ctx.drawImage(image.value, 0, 0, image.value.width * scale.value, image.value.height * scale.value);
  ctx.restore();
  canvas.toBlob(blob => {
        emit('saveImage', blob);
      },
      'image/png',
  );
  canvas.width = props.width * 2;

  resetCanvas();
}

function resetCanvas() {
  scale.value = 1;
  zoom.value = 1;
  position.value = {
    x: 0,
    y: 0,
  }
  isDragging.value = false;
}

</script>

<template>
  <Modal ref="modal">
    <template #default>
      <h3>Image Editor</h3>
      <canvas ref="canvasElement"
              class="w-128 h-64"
              v-on:mousedown="isDragging = true"
              v-on:mouseup="isDragging = false"
              v-on:mouseout="isDragging = false"
              v-on:mousemove="translate($event)"
      ></canvas>
      <input v-on:input="adjustZoom" ref="zoom" class="w-full" type="range" min="1" max="2" value="1" step="0.01">
    </template>
    <template #action="{ closeModal }">
      <button class="btn" v-on:click="saveChanges(); closeModal();">Save</button>
      <button class="btn" v-on:click="closeModal">Cancel</button>
    </template>
  </Modal>
</template>

<style scoped>

</style>