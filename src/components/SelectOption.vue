<template>
  <div class="container-options">
    <div
      class="card"
      v-for="option in options"
      :key="option.id"
      @click="$emit('option-clicked', option.id)"
    >
      <img :src="option.thumbnailURL" class="card-image" />
      <div class="card-text">{{ option.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Option } from "../types/Option";

export default defineComponent({
  name: "SelectOption",
  props: { options: Array as PropType<Array<Option>> },
  emits: ["option-clicked"],
});
</script>

<style lang="scss" scoped>
@import "../styles/globals.scss";

.container-options {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  gap: 2.5rem;
  margin-inline: 3rem;
}

.card {
  height: 10rem;
  width: 10rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: bisque;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  position: relative;
  color: white;
  overflow: hidden;
  border-radius: 3px;
}

.card:active {
  color: $active-color;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.6);
}

.card-image {
  height: 100%;
  width: 100%;
  filter: brightness(75%);
  object-fit: cover;
}

.card-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-weight: 500;
}
</style>
