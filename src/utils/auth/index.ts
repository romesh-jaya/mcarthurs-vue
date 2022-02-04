import { AuthInfo } from "@/types/AuthInfo";

export const saveDataToLocalStorage = (data: AuthInfo) => {
  localStorage.setItem("user", JSON.stringify(data));
};
