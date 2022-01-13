import { createApp } from "vue";
import App from "./App.vue";
import Landing from "./components/Landing.vue";
import SelectCategory from "./components/SelectCategory.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: Landing },
  { path: "/select-category", component: SelectCategory },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
