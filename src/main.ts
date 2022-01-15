import { createApp } from "vue";
import App from "./App.vue";
import Landing from "./components/Landing.vue";
import SelectCategory from "./components/SelectCategory.vue";
import SelectItem from "./components/SelectItem.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Landing },
  { path: "/select-category", component: SelectCategory },
  { path: "/select-item/:categoryId", component: SelectItem },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
