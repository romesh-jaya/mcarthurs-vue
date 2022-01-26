import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { categories, CategoriesState } from "./categories";
import { items, ItemState } from "./items";
import { order, OrderState } from "./order";

export interface StoreState {
  order: OrderState;
  categories: CategoriesState;
  items: ItemState;
}

export const key: InjectionKey<Store<StoreState>> = Symbol();

export const store = createStore<StoreState>({
  strict: true, // whenever Vuex state is mutated outside of mutation handlers, an error will be thrown.
  modules: {
    order,
    categories,
    items,
  },
});

export function useStore() {
  return baseUseStore(key);
}
