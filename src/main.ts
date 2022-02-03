import { createApp, provide, h } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { createRouter, createWebHistory } from "vue-router";
import { DefaultApolloClient } from "@vue/apollo-composable";

import { store, key } from "./store";
import FontAwesomeIcon from "./fontawesome-icons";
import { apolloClient } from "./apolloClient";

const SelectCategory = () => import("./components/SelectCategory.vue");
const SelectItem = () => import("./components/SelectItem.vue");
const Item = () => import("./components/Item.vue");
const MyOrder = () => import("./components/MyOrder.vue");
const PageNotFound = () => import("./components/PageNotFound.vue");
const Landing = () => import("./components/Landing.vue");
const Login = () => import("./components/Login.vue");

const routes = [
  { path: "/", component: Landing },
  { path: "/select-category", component: SelectCategory },
  { path: "/select-item/:categoryId", component: SelectItem },
  { path: "/items/:itemId", component: Item },
  { path: "/my-order", component: MyOrder },
  { path: "/login", component: Login },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});
app.use(router);
app.use(store, key);
app.use(VueAxios, axios);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
