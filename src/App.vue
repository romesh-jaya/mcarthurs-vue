<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { createToaster } from "@meforma/vue-toaster";
import { getBasicData } from "./api";

const toaster = createToaster({
  position: "top-right",
  duration: 6000,
});

export default defineComponent({
  name: "App",
  mounted() {
    const fetchBasicData = async () => {
      try {
        const { categoryData, itemData } = await getBasicData();

        this.$store.commit("categories/saveCategories", categoryData);
        this.$store.commit("items/saveItems", itemData);
      } catch {
        toaster.error("Error in accessing backend server!");
      }
    };
    fetchBasicData();
  },
});
</script>

<style lang="scss">
@import "./styles/globals.scss";
@import url("https://fonts.googleapis.com/css?family=Nunito");

html,
body {
  padding: 0;
  margin: 0;
  font-family: "Nunito";
  height: 100%;
  color: $text-color;
  font-size: 1rem;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: "Nunito";
}

* {
  box-sizing: border-box;
}

p {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-block-start: 60px;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

/* Common styles for components */
.category-title {
  margin-block: 2rem;
  font-size: 2rem;
  font-weight: 900;
}

.navbar-bottom {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
}

/* This is for the toast notifications */
.c-toast {
  font-family: "Nunito" !important;
}
</style>
