import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
