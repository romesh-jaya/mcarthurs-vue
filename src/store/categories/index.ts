import { Category } from "@/types/Category";

export interface CategoriesState {
  categories: Array<Category>;
}

export const categories = {
  namespaced: true,
  state: (): CategoriesState => ({
    categories: Array<Category>(),
  }),
  mutations: {
    saveCategories: (state: CategoriesState, payload: Category[]) => {
      state.categories = payload;
    },
  },
};
