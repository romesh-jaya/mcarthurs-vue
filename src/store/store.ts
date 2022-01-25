import { createStore } from "vuex";
import { order, OrderState } from "./order";

interface State {
  order: OrderState;
}

export const store = createStore<State>({
  strict: true, // whenever Vuex state is mutated outside of mutation handlers, an error will be thrown.
  modules: {
    order: order,
  },
});
