import { AuthInfo } from "@/types/AuthInfo";

const JWT_TIMEOUT = 30;

export const saveDataToLocalStorage = (data: AuthInfo) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      data,
      serverType: import.meta.env.VITE_BE_SERVER,
      lastLoggedIn: new Date().getTime(),
    })
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

    const timeLapsedMs =
      new Date().getTime() - new Date(userInfo.lastLoggedIn).getTime();

    if (timeLapsedMs / (1000 * 60) > JWT_TIMEOUT) {
      // if the last login was greater than 30 mins, which is the dyno discarding time in Strapi
      localStorage.removeItem("user");
      return;
    }

    return userInfo.data;
  }
};
