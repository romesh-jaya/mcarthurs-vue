import { Item } from "@/types/Item";

export interface ItemState {
  items: Array<Item>;
}

export const items = {
  namespaced: true,
  state: (): ItemState => ({
    items: Array<Item>(),
  }),
  mutations: {
    saveItems: (state: ItemState, payload: Item[]) => {
      state.items = payload;
    },
  },
};
