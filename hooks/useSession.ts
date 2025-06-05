import { T_User } from "@/lib/Api/api";
import { axiosInstance } from "@/lib/providers/axiosInstance";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useSession = (): UseQueryResult<T_User, any> => {
  return useQuery<T_User, any>({
    queryKey: ["user-data"],
    queryFn: async () => {
      const response: AxiosResponse<{ message: string; data: T_User }> =
        await axiosInstance.get("/auth/me");
      return response.data.data;
    },
  });
};
