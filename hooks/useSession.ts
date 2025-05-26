import { T_User } from "@/lib/Api/api";
import { axiosInstance } from "@/lib/providers/axiosInstance";
import { AxiosResponse } from "axios";

export const useSession = async () => {
  const response: AxiosResponse<{ message: string; data: T_User }> =
    await axiosInstance.get("/auth/me");
  return response.data;
};
