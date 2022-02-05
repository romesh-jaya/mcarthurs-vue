import { AuthInfo } from "@/types/AuthInfo";

export interface AuthState {
  user: AuthInfo;
}

export const auth = {
  namespaced: true,
  state: (): AuthState => ({
    user: Object(),
  }),
  mutations: {
    saveAuthInfo: (state: AuthState, payload: AuthInfo) => {
      state.user = payload;
    },
  },
};
