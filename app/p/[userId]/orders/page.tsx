"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import StatusComponent from "@/components/products/statusComponent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "@/hooks/useSession";
import { API_GetAllUserOrders } from "@/lib/Api/api";
import { useQuery } from "@tanstack/react-query";
import { Check, EllipsisVertical, Eraser, Search, X } from "lucide-react";
import { FC, use, useEffect, useState } from "react";

const Orders: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const { userId } = use(params);
  const [isClient, setIsClient] = useState(false);
  const [toSearch, setToSearch] = useState("");

  const query = useQuery({
    queryKey: [`orders-${userId}${toSearch}`],
    queryFn: () => {
      return API_GetAllUserOrders(toSearch);
    },
  });

  const session = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const actionsForSeller = [
    {
      label: "Accept Order",
      icon: <Check className="text-green-500" />,
      action: (orderId: string) => {
        // Implement view order logic
      },
    },
    {
      label: "Reject Order",
      icon: <X className="text-red-500" />,
      action: (orderId: string) => {
        // Implement update status logic
      },
    },
  ];

  const actionsForBuyer = [
    {
      label: "View Order",
      icon: <Check />,
      action: (orderId: string) => {
        // Implement view order logic
      },
    },
    {
      label: "Cancel Order",
      icon: <X className="text-destructive" />,
      action: (orderId: string) => {
        // Implement cancel order logic
      },
    },
  ];

  if (!isClient) return null;

  if (session.isLoading) return <Loader />;

  return (
    <div>
      <PageHeader title="Orders" />
      <CustomBreadcrumbs
        items={[
          { title: "Orders", link: `/p/${userId}/orders` },
          { title: "List" },
        ]}
      />

      <div className="mt-5">
        <div className="my-5 flex gap-2">
          <Input placeholder="Search Orders" />
          <Button
            onClick={() => {
              setToSearch(document.querySelector("input")?.value || "");
            }}
          >
            <Search /> Search
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              setToSearch("");
              document.querySelector("input")!.value = "";
            }}
          >
            <Eraser /> Clear
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No.</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {query.data &&
              query.data.data.length > 0 &&
              query.data?.data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.listing.title}</TableCell>
                  <TableCell>{`${order.quantity} ${order.listing.unit}${
                    Number(order.quantity) > 1 ? "s" : ""
                  }  `}</TableCell>
                  <TableCell>Rs {order.totalPrice}</TableCell>
                  <TableCell>
                    {" "}
                    <StatusComponent status={order.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                        <EllipsisVertical size={20} className="font-normal" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {session.data?.userType === "seller" &&
                          actionsForSeller.map((action, index) => {
                            return (
                              <DropdownMenuItem
                                className="cursor-pointer font-[500]"
                                key={index}
                              >
                                {action.icon} {action.label}
                              </DropdownMenuItem>
                            );
                          })}

                        {session.data?.userType === "buyer" &&
                          actionsForBuyer.map((action, index) => {
                            return (
                              <DropdownMenuItem
                                className="cursor-pointer font-[500]"
                                key={index}
                              >
                                {action.icon} {action.label}
                              </DropdownMenuItem>
                            );
                          })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            {query.data && query.data?.data.length == 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center font-[500]">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {query.isLoading && (
        <div className="flex h-2/6 items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Orders;
