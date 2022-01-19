import { createStore } from "vuex";

export const store = createStore({
  strict: true,
  state: {
    orderItems: [
      {
        itemId: "burger-double-layer",
        quantity: 2,
        itemName: "Double Layer Burger",
        total: 299,
      },
      {
        itemId: "fries-small",
        quantity: 2,
        itemName: "Small Fries",
        total: 299,
      },
      {
        itemId: "drink-orange",
        quantity: 1,
        itemName: "Orange Juice",
        total: 299,
      },
      {
        itemId: "drink-mango",
        quantity: 1,
        itemName: "Mango Juice",
        total: 299,
      },
    ],
  },
  getters: {
    getOrderItemQuantity: (state) => (itemId: string) => {
      console.log("itemId", itemId);
      return state.orderItems.find((item) => item.itemId === itemId)?.quantity;
    },
  },
  mutations: {
    addOrderItem: (state, payload) => {
      state.orderItems.push(payload);
    },
  },
});
