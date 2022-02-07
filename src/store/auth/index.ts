import { AuthInfo } from "@/types/AuthInfo";
import { getDataFromLocalStorage } from "../../utils/auth";

export interface AuthState {
  user: AuthInfo;
  kioskId: string;
}

const initialState = getDataFromLocalStorage();

export const auth = {
  namespaced: true,
  state: initialState,
  mutations: {
    saveAuthInfo: (state: AuthState, payload: AuthInfo) => {
      state.user = payload;
    },
    saveKioskInfo: (state: AuthState, payload: string) => {
      state.kioskId = payload;
    },
  },
};
