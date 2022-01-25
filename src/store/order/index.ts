import { OrderItem } from "../../types/OrderItem";

export interface OrderState {
  orderItems: Array<OrderItem>;
}

export const order = {
  namespaced: true,
  state: (): OrderState => ({
    orderItems: Array<OrderItem>(),
  }),
  getters: {
    getOrderItemQuantity: (state: OrderState) => (itemId: string) => {
      return (
        state.orderItems.find((item) => item.itemId === itemId)?.quantity ?? 0
      );
    },
  },
  mutations: {
    addOrderItem: (state: OrderState, payload: OrderItem) => {
      state.orderItems.push(payload);
    },
    saveOrderItem: (state: OrderState, payload: OrderItem) => {
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
    clearAllItems: (state: OrderState) => {
      state.orderItems = [];
    },
  },
};
