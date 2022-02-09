import { AuthInfo } from "@/types/AuthInfo";
import axios from "../../axios";

export const login = async (
  email: string,
  password: string
): Promise<AuthInfo> => {
  const { data } = await axios.post<AuthInfo>("/auth/login", {
    email,
    password,
  });

  return data;
};
