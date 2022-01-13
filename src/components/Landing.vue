<template>
  <div class="landing-container">
    <img src="../assets/fastfood.webp" class="hero" />
    <div class="title">McArthur's Colombo</div>
    <Button class="button-start-order">Start Order</Button>
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
});
</script>

<style lang="scss">
@import "../styles/globals.scss";

.landing-container {
  height: 100%;
}

.title {
  margin-block-start: 3rem;
  font-size: 3rem;
  font-weight: 900;
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
  background-color: $text-color;
  color: white;
}
</style>
