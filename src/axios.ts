import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_URL + "/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
