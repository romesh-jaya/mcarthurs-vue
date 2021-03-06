import { createRouter, createWebHistory } from "vue-router";
import { store } from "./store";
import { getDataFromLocalStorage } from "./utils/auth";
import { getKioskIdFromLocalStorage } from "./utils/kioskInfo";

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

router.beforeEach((to, _, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = getDataFromLocalStorage();
  const kioskId = getKioskIdFromLocalStorage();

  if (loggedIn && kioskId) {
    store.commit("auth/saveAuthInfo", loggedIn);
    store.commit("auth/saveKioskInfo", kioskId);
  }

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && (!loggedIn || !kioskId)) {
    next("/login");
  } else if (to.path === "/login" && loggedIn && kioskId) {
    next("/");
  } else {
    next();
  }
});

export default router;
