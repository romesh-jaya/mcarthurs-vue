import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { categories, CategoriesState } from "./categories";
import { order, OrderState } from "./order";

export interface StoreState {
  order: OrderState;
  categories: CategoriesState;
}

export const key: InjectionKey<Store<StoreState>> = Symbol();

export const store = createStore<StoreState>({
  strict: true, // whenever Vuex state is mutated outside of mutation handlers, an error will be thrown.
  modules: {
    order,
    categories,
  },
});
