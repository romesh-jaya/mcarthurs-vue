<template>
  <div id="app">
    <Landing />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Landing from "./components/Landing.vue";

export default defineComponent({
  name: "App",
  components: {
    Landing,
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
</style>
