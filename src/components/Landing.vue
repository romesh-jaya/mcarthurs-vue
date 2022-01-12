<template>
  <div class="landing-container">
    <img src="../assets/fastfood.jpg" class="hero" />
    <div class="title">McArthur's Colombo</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Landing",
  data() {
    return {};
  },
});
</script>

<style lang="scss">
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
</style>
