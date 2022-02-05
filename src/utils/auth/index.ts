import { AuthInfo } from "@/types/AuthInfo";

export const saveDataToLocalStorage = (data: AuthInfo) => {
  localStorage.setItem(
    "user",
    JSON.stringify({ data, serverType: import.meta.env.VITE_BE_SERVER })
  );
};

export const getDataFromLocalStorage = (): AuthInfo | undefined => {
  const userInfoString = localStorage.getItem("user");
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    if (!userInfo) {
      return;
    }
    if (userInfo.serverType !== import.meta.env.VITE_BE_SERVER) {
      // JWT is from a different BE server
      localStorage.removeItem("user");
      return;
    }
    return userInfo.data;
  }
};
