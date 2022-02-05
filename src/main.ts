import { createApp, provide, h } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";

import { DefaultApolloClient } from "@vue/apollo-composable";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import { store, key } from "./store";
import FontAwesomeIcon from "./fontawesome-icons";
import { apolloClient } from "./apolloClient";
import router from "./router";

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

const options: PluginOptions = {
  timeout: 5000,
  hideProgressBar: true,
};

app.use(Toast, options);

app.mount("#app");
