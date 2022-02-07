import { Store } from "vuex";
import { OrderState } from "./store/order";
import { AuthState } from "./store/auth";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    order: OrderState;
    categories: CategoriesState;
    auth: AuthState;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
