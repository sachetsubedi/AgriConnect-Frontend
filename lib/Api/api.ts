import { T_UserRegister } from "@/app/auth/register/page";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../providers/axiosInstance";

export type T_User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
};

export const API_RegisterUser = async (data: T_UserRegister) => {
  const response: AxiosResponse<{ message: string; data: T_User }> =
    await axiosInstance.post("/auth/register", data);
  return response.data;
};
