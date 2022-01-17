<template>
  <div class="landing-container">
    <img src="../assets/fastfood.webp" class="hero" />
    <div class="category-title">McArthur's Colombo</div>
    <Button class="button-start-order" @on-click="onStartOrderClicked"
      >Start Order</Button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "../common/Button.vue";

export default defineComponent({
  name: "Landing",
  components: {
    Button,
  },
  methods: {
    onStartOrderClicked() {
      this.$router.push("/select-category");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/globals.scss";

.landing-container {
  height: 100%;
}

.hero {
  margin-block-start: 3rem;
  height: 50%;

  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.button-start-order {
  margin-block-start: 3rem;
  font-size: 1.75rem;
  padding-inline: 3rem;
  padding-block: 1rem;
  border-radius: 1rem;
  background-color: $text-color;
  color: white;
}
</style>
