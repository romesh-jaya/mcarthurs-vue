import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { createRouter, createWebHistory } from "vue-router";

import Landing from "./components/Landing.vue";
import { store, key } from "./store";
import FontAwesomeIcon from "./fontawesome-icons";

const SelectCategory = () => import("./components/SelectCategory.vue");
const SelectItem = () => import("./components/SelectItem.vue");
const Item = () => import("./components/Item.vue");
const MyOrder = () => import("./components/MyOrder.vue");
const PageNotFound = () => import("./components/PageNotFound.vue");

const routes = [
  { path: "/", component: Landing },
  { path: "/select-category", component: SelectCategory },
  { path: "/select-item/:categoryId", component: SelectItem },
  { path: "/items/:itemId", component: Item },
  { path: "/my-order", component: MyOrder },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(store, key);
app.use(VueAxios, axios);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
