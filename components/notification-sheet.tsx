"use client";

import { API_GetAllNotifications } from "@/lib/Api/api";
import { useQuery } from "@tanstack/react-query";
import { Bell, CheckCheck, Dot, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const NotificationSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: API_GetAllNotifications,
    refetchInterval: 10000,
  });

  if (query.isLoading) return null;

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger className="pr-5">
        <Bell />
      </SheetTrigger>
      <SheetContent className="z-50">
        <SheetTitle></SheetTitle>
        <div>
          <SheetTitle className="flex items-center justify-between">
            Notifications{" "}
          </SheetTitle>
          <Separator className="my-2" />
          <div>
            {query.data?.data.map((notification) => (
              <Link
                href={notification.link}
                key={notification.id}
                onClick={() => {
                  setSheetOpen(false);
                }}
                className={` rounded-md mb-2 hover:bg-muted cursor-pointer`}
              >
                <div className="flex p-3  items-center gap-2 hover:bg-muted rounded-md">
                  {getNotificationIcon(notification.type)}
                  <div className="w-full">
                    <h3 className="font-semibold flex items-center justify-between">
                      {notification.title} <Dot className="text-green-500" />
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;
export type T_NotificationType =
  | "order.accepted"
  | "order.rejected"
  | "order.completed"
  | "order.cancelled"
  | "order.created"
  | "order.created"
  | "auction.won";

export const getNotificationIcon = (type: T_NotificationType) => {
  switch (type) {
    case "order.rejected":
      return (
        <div className="bg-red-500 h-full rounded-md  text-white">
          <X className="h-10 w-10  " />
        </div>
      );
    case "order.accepted":
      return (
        <div className="bg-green-500 h-full rounded-md  text-white">
          <CheckCheck className="h-10 w-10  " />
        </div>
      );
    case "order.completed":
      return (
        <div className="bg-blue-500 h-full rounded-md  text-white">
          <CheckCheck className="h-10 w-10  " />
        </div>
      );
    case "order.cancelled":
      return (
        <div className="bg-yellow-500 h-full rounded-md  text-white">
          <X className="h-10 w-10  " />
        </div>
      );
    case "order.created":
      return (
        <div className="bg-purple-500 h-full rounded-md  text-white">
          <Bell className="h-10 w-10  " />
        </div>
      );

    case "auction.won":
      return (
        <div className="bg-green-500 h-full rounded-md  text-white">
          <CheckCheck className="h-10 w-10  " />
        </div>
      );

    default:
      return (
        <div className="bg-purple-500 h-full rounded-md  text-white">
          <Bell className="h-10 w-10  " />
        </div>
      );
  }
};
