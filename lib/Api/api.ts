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
  userType: "buyer" | "seller";
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
  attachment: string;
  listingId: string;
  createdAt: string;
  updatedAt: string;
};

export type T_Product = {
  id: string;
  title: string;
  description: string;
  pricePerUnit: number;
  quantity: number;
  unit: string;
  sellerId: string;
  seller: T_User;
  harvested: boolean;
  createdAt: string;
  willHarvestAt: string;
  listingAttachments: T_ListingAttachment[];
};

export const API_GetAllProducts = async (searchQuery: string) => {
  const response: AxiosResponse<{ message: string; data: T_Product[] }> =
    await axiosInstance.get(`/listing/?search=${searchQuery}`);
  return response.data;
};

export const API_CreateProduct = async (data: FormData) => {
  const response: AxiosResponse<{ message: string; data: T_Product }> =
    await axiosInstance.post("/listing", data);
  return response.data;
};

export const API_GetProduct = async (productId: string) => {
  const response: AxiosResponse<{ message: string; data: T_Product }> =
    await axiosInstance.get(`/listing/${productId}`);
  return response.data;
};

export const API_UpdateProduct = async (productId: string, data: any) => {
  const response: AxiosResponse<{ message: string; data: T_Product }> =
    await axiosInstance.put(`/listing/${productId}`, data);
  return response.data;
};

export const API_DeleteProduct = async (productId: string) => {
  const response: AxiosResponse<{ message: string; data: T_Product }> =
    await axiosInstance.delete(`/listing/${productId}`);
  return response.data;
};
