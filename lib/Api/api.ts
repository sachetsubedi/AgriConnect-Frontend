import { T_UserRegister } from "@/app/(auth)/register/page";
import { DiseaseTreatment } from "@/app/p/[userId]/disease/page";
import { T_NotificationType } from "@/components/notification-sheet";
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

export const API_LogoutUser = async () => {
  const response: AxiosResponse<{ message: string; data: null }> =
    await axiosInstance.post("/auth/logout");
  return response.data;
};

export type T_ListingAttachment = {
  id: string;
  attachment: string;
  listingId: string;
  createdAt: string;
  updatedAt: string;
};

export type T_AuctionAttachment = {
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

export const API_UpdateProduct = async (args: {
  productId: string;
  data: FormData;
}) => {
  const { productId, data } = args;
  const response: AxiosResponse<{ message: string; data: T_Product }> =
    await axiosInstance.put(`/listing/${productId}`, data);
  return response.data;
};

export const API_DeleteProduct = async (productId: string) => {
  const response: AxiosResponse<{ message: string; data: T_Product }> =
    await axiosInstance.delete(`/listing/${productId}`);
  return response.data;
};

export type T_OrderStatus = "PENDING" | "COMPLETED" | "REJECTED" | "ACCEPTED";

export type T_Order = {
  id: string;
  orderNumber: string;
  listingId: string;
  listing: T_Product;
  buyerId: string;
  buyer: T_User;
  quantity: number;
  totalPrice: number;
  status: "PENDING" | "COMPLETED" | "REJECTED" | "ACCEPTED";
};

export type T_AuctionOrder = {
  id: string;
  orderNumber: string;
  auctionId: string;
  auction: T_Auction;
  buyerId: string;
  status: "PENDING" | "COMPLETED" | "REJECTED" | "ACCEPTED";
};

export const API_GetAllUserOrders = async (search?: string) => {
  const response: AxiosResponse<{ message: string; data: T_Order[] }> =
    await axiosInstance.get(`/order?search=${search || ""}&type=retail`);
  return response.data;
};

export const API_GetAllUserAuctionOrders = async (
  type: string,
  search?: string
) => {
  const response: AxiosResponse<{ message: string; data: T_AuctionOrder[] }> =
    await axiosInstance.get(`/auction-order?search=${search || ""}`);
  return response.data;
};

export const API_GetOrder = async (orderId: string) => {
  const response: AxiosResponse<{ message: string; data: T_Order }> =
    await axiosInstance.get(`/order/${orderId}`);
  return response.data;
};

export const API_CreateOrder = async (data: {
  productId: string;
  quantity: number;
}) => {
  const response: AxiosResponse<{ message: string; data: T_Order }> =
    await axiosInstance.post("/order", data);
  return response.data;
};

export const API_AcceptOrder = async (orderId: string) => {
  const response: AxiosResponse<{ message: string; data: T_Order }> =
    await axiosInstance.post(`/order/${orderId}/accept`);
  return response.data;
};

export const API_RejectOrder = async (orderId: string) => {
  const response: AxiosResponse<{ message: string; data: T_Order }> =
    await axiosInstance.post(`/order/${orderId}/reject`);
  return response.data;
};

export const API_CancelOrder = async (orderId: string) => {
  const response: AxiosResponse<{ message: string; data: T_Order }> =
    await axiosInstance.post(`/order/${orderId}/cancel`);
  return response.data;
};

export const API_CompleteOrder = async (orderId: string) => {
  const response: AxiosResponse<{ message: string; data: T_Order }> =
    await axiosInstance.post(`/order/${orderId}/complete`);
  return response.data;
};

export const API_DiseaseAnalyze = async (data: FormData) => {
  const response: AxiosResponse<{ message: string; data: DiseaseTreatment }> =
    await axiosInstance.post(`/disease/analyze`, data);
  return response.data;
};

export type T_Notification = {
  id: string;
  title: string;
  message: string;
  userId: string;
  link: string;
  isRead: boolean;
  createdAt: string;
  type: T_NotificationType;
};

export const API_GetAllNotifications = async () => {
  const response: AxiosResponse<{ message: string; data: T_Notification[] }> =
    await axiosInstance.get(`/notification`);
  return response.data;
};

export const API_CreateAuction = async (data: FormData) => {
  const response: AxiosResponse<{ message: string; data: any }> =
    await axiosInstance.post(`/auction`, data);
  return response.data;
};

export type T_Bid = {
  id: string;
  bidderId: string;
  bidder: T_User;
  auctionId: string;
  bidAmount: number;
  createdAt: string;
  updatedAt: string;
};

export type T_Auction = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  startPrice: number;
  currentBid: number;
  endDate: string;
  startDate: string;
  sellerId: string;
  seller: T_User;
  AuctionAttachments: T_AuctionAttachment[];
  highestBid: T_Bid | null;
  createdAt: string;
  updatedAt: string;
  auctionBids?: T_Bid[] | null;
  bidByUser?: T_Bid | null;
};

export const API_GetAllAuctions = async (searchQuery: string) => {
  const response: AxiosResponse<{ message: string; data: T_Auction[] }> =
    await axiosInstance.get(`/auction?search=${searchQuery}`);
  return response.data;
};

export const API_GetAuction = async (auctionId: string) => {
  const response: AxiosResponse<{ message: string; data: T_Auction }> =
    await axiosInstance.get(`/auction/${auctionId}`);
  return response.data;
};

export const API_AddBidToAuction = async (data: {
  auctionId: string;
  bidAmount: number;
}) => {
  const response: AxiosResponse<{ message: string; data: any }> =
    await axiosInstance.post(`/bid/${data.auctionId}`, data);
  return response.data;
};

export const API_IncreaseBid = async (data: {
  bidId: string;
  amount: number;
}) => {
  const response: AxiosResponse<{ message: string; data: any }> =
    await axiosInstance.post(`/bid/${data.bidId}/increase`, data);
  return response.data;
};

export type T_RecommCropType = {
  name: string;
  probability: number;
  image: string;
  process: {
    harvest: string;
    planting: string;
    process: string;
  };
};

export const API_GetRecommendation = async (data: { location: any }) => {
  const response: AxiosResponse<{
    crop: T_RecommCropType[];
  }> = await axiosInstance.post(`/recommend-crop`, data);
  return response.data;
};
