import { T_UserRegister } from "@/app/(auth)/register/page";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../providers/axiosInstance";

export type T_User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
};

export const API_RegisterUser = async (data: T_UserRegister) => {
  const response: AxiosResponse<{ message: string; data: T_User }> =
    await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const API_LoginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response: AxiosResponse<{ message: string; data: T_User }> =
    await axiosInstance.post("/auth/login", data);
  return response.data;
};

export type T_ListingAttachment = {
  id: string;
  listingId: string;
  createdAt: string;
  updatedAt: string;
};

export type T_Product = {
  title: string;
  description: string;
  pricePerUnit: number;
  quantity: number;
  unit: string;
  sellerId: string;
  seller: T_User;
};

export const API_GetAllProducts = async () => {
  const response: AxiosResponse<{ message: string; data: any[] }> =
    await axiosInstance.get("/listing");
  return response.data;
};
