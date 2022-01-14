<template>
  <div class="container-options">
    <div class="card" v-for="option in options" :key="option.id">
      {{ option.value }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Option } from "../types/Option";

export default defineComponent({
  name: "SelectOption",
  props: { options: Array as PropType<Array<Option>> },
});
</script>

<style lang="scss" scoped>
@import "../styles/globals.scss";

.container-options {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 2.5rem;
  margin-inline: 2rem;
}

.card {
  height: 10rem;
  width: 10rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: bisque;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
}

.card:active {
  color: $active-color;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.6);
}
</style>
