import { Store } from "vuex";
import { OrderState } from "./store/order";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    order: OrderState;
    categories: CategoriesState;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
