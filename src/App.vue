<template>
  <div id="app">
    <Landing />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Landing from "./components/Landing.vue";

export default Vue.extend({
  name: "App",
  components: {
    Landing,
  },
});
</script>

<style lang="scss">
@import "./styles/globals.scss";
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

html,
body {
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
  height: 100%;
  color: $text-color;
  font-size: 1rem;
}

a {
  color: inherit;
  text-decoration: none;
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
</style>
