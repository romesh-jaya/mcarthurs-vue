<template>
  <div class="landing-container">
    <img src="../assets/fastfood.webp" class="hero" />
    <div class="category-title">McArthur's Colombo</div>
    <PrimaryButton class="button-start-order" @on-click="onStartOrderClicked"
      >Start Order</PrimaryButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrimaryButton from "../common/PrimaryButton.vue";

export default defineComponent({
  name: "Landing",
  components: {
    PrimaryButton,
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
}
</style>
