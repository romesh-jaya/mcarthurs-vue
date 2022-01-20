<template>
  <div class="landing-container">
    <div class="category-title">Page not found</div>
    <p>We couldn't find the page you're looking for</p>
    <PrimaryButton class="button-home" @on-click="onGoHomeClicked"
      >Back to Home</PrimaryButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrimaryButton from "../common/PrimaryButton.vue";

export default defineComponent({
  name: "PageNotFound",
  components: {
    PrimaryButton,
  },
  methods: {
    onGoHomeClicked() {
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/globals.scss";

.landing-container {
  height: 100%;
}

.button-home {
  margin-block-start: 3rem;
}
</style>
