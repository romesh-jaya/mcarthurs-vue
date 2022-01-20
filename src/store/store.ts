import { createStore } from "vuex";
import { OrderItem } from "../types/OrderItem";

interface State {
  orderItems: OrderItem[];
}

export const store = createStore<State>({
  strict: true, // whenever Vuex state is mutated outside of mutation handlers, an error will be thrown.
  state: {
    orderItems: [],
  },
  getters: {
    getOrderItemQuantity: (state) => (itemId: string) => {
      return (
        state.orderItems.find((item) => item.itemId === itemId)?.quantity ?? 0
      );
    },
  },
  mutations: {
    addOrderItem: (state, payload: OrderItem) => {
      state.orderItems.push(payload);
    },
    saveOrderItem: (state, payload: OrderItem) => {
      if (payload.quantity > 0) {
        const orderItem = state.orderItems.find(
          (item) => item.itemId === payload.itemId
        );
        if (orderItem) {
          orderItem.quantity = payload.quantity;
          orderItem.total = payload.total;
        }
      } else {
        const newArray = state.orderItems.filter(
          (item) => item.itemId !== payload.itemId
        );
        state.orderItems = newArray;
      }
    },
    clearAllItems: (state) => {
      state.orderItems = [];
    },
  },
});
