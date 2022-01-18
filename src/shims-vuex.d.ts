import { Store } from "vuex";
import { OrderItem } from "./types/OrderItem";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    orderItems: OrderItem[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
