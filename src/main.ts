import { createApp } from "vue";
import App from "./App.vue";
import Landing from "./components/Landing.vue";
import SelectCategory from "./components/SelectCategory.vue";
import SelectItem from "./components/SelectItem.vue";
import Item from "./components/Item.vue";
import MyOrder from "./components/MyOrder.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Landing },
  { path: "/select-category", component: SelectCategory },
  { path: "/select-item/:categoryId", component: SelectItem },
  { path: "/items/:itemId", component: Item },
  { path: "/my-order", component: MyOrder },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
