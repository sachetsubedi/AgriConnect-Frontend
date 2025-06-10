"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import StatusComponent from "@/components/products/statusComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loadingButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "@/hooks/useSession";
import {
  API_AcceptOrder,
  API_CancelOrder,
  API_CompleteOrder,
  API_GetAllUserOrders,
  API_RejectOrder,
  T_OrderStatus,
} from "@/lib/Api/api";
import { getPath } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Check,
  CircleX,
  EllipsisVertical,
  Eraser,
  Eye,
  PackageCheck,
  PackageX,
  Search,
  TriangleAlert,
  X,
} from "lucide-react";
import Link from "next/link";
import { FC, use, useEffect, useState } from "react";
import { toast } from "sonner";

export type T_Actions = "accept" | "reject" | "cancel" | "complete";

const Orders: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const { userId } = use(params);
  const [isClient, setIsClient] = useState(false);
  const [toSearch, setToSearch] = useState("");

  const [actionToPerform, setActionToPerform] = useState<{
    id: string;
    action: T_Actions;
    content: string;
  } | null>(null);

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

  const acceptOrderMutation = useMutation({
    mutationFn: API_AcceptOrder,
    onSuccess: () => {
      toast.success("Order accepted successfully");
      query.refetch();
      setActionToPerform(null);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
      setActionToPerform(null);
    },
  });

  const rejectOrderMutation = useMutation({
    mutationFn: API_RejectOrder,
    onSuccess: () => {
      toast.success("Order rejected successfully");
      query.refetch();
      setActionToPerform(null);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
      setActionToPerform(null);
    },
  });

  const calcelOrderMutation = useMutation({
    mutationFn: API_CancelOrder,
    onSuccess: () => {
      toast.success("Order canceled successfully");
      query.refetch();
      setActionToPerform(null);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
      setActionToPerform(null);
    },
  });

  const completeOrderMutation = useMutation({
    mutationFn: API_CompleteOrder,
    onSuccess: () => {
      toast.success("Order marked as completed successfully");
      query.refetch();
      setActionToPerform(null);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
      setActionToPerform(null);
    },
  });

  const getActions = (args: {
    userType: "seller" | "buyer";
    status: T_OrderStatus;
  }) => {
    const { userType } = args;
    const actions = [];
    switch (userType) {
      case "seller":
        if (args.status === "PENDING") {
          actions.push({
            label: "Accept Order",
            icon: <Check className="text-green-500" />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "accept",
                content: "Are you sure you want to accept this order?",
              });
            },
          });
          actions.push({
            label: "Reject Order",
            icon: <X className="text-red-500" />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "reject",
                content: "Are you sure you want to reject this order?",
              });
            },
          });
        } else if (args.status === "ACCEPTED") {
          actions.push({
            label: "Mark Completed",
            icon: <PackageCheck className="text-green-500" />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "complete",
                content:
                  "Are you sure you want to mark this order as completed?",
              });
            },
          });
          actions.push({
            label: "Reject Order",
            icon: <X className="text-destructive" />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "reject",
                content: "Are you sure you want to reject this order?",
              });
            },
          });
        } else if (args.status === "REJECTED") {
          actions.push({
            label: "Accept Order",
            icon: <Check className="text-green-500" />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "accept",
                content: "Are you sure you want to accept this order?",
              });
            },
          });
        }
        break;
      case "buyer":
        if (args.status === "PENDING") {
          actions.push({
            label: "Cancel Order",
            icon: <X className="text-destructive" />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "cancel",
                content: "Are you sure you want to cancel this order?",
              });
            },
          });
        }
        break;
    }
    return actions;
  };

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
                        <Link href={getPath(userId, ["orders", order.id])}>
                          <DropdownMenuItem className="cursor-pointer font-[500] flex gap-2 items-center">
                            <Eye size={20} /> View
                          </DropdownMenuItem>
                        </Link>

                        {getActions({
                          userType: session.data?.userType || "buyer",
                          status: order.status,
                        }).map((action, index) => {
                          return (
                            <DropdownMenuItem
                              className={`cursor-pointer font-[500]`}
                              key={index}
                              onClick={() => {
                                action.action(order.id);
                              }}
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

      {actionToPerform && (
        <Dialog
          open={!!actionToPerform}
          onOpenChange={() => setActionToPerform(null)}
        >
          <DialogContent>
            <DialogTitle className="flex justify-center flex-col gap-5 items-center">
              {" "}
              {actionToPerform.action === "reject" ? (
                <PackageX size={40} className="text-red-500" />
              ) : actionToPerform.action === "cancel" ? (
                <TriangleAlert size={40} className="text-yellow-500" />
              ) : (
                <PackageCheck size={40} className="text-green-500" />
              )}
              <div>{actionToPerform.content}</div>
            </DialogTitle>
            <DialogFooter>
              <Button
                variant={"outline"}
                onClick={() => setActionToPerform(null)}
              >
                <CircleX /> Cancel
              </Button>
              <LoadingButton
                variant={
                  actionToPerform.action == "reject" ||
                  actionToPerform.action == "cancel"
                    ? "destructive"
                    : "default"
                }
                onClick={() => {
                  if (actionToPerform?.action === "accept") {
                    acceptOrderMutation.mutate(actionToPerform.id);
                  } else if (actionToPerform?.action === "reject") {
                    rejectOrderMutation.mutate(actionToPerform.id);
                  } else if (actionToPerform?.action === "cancel") {
                    calcelOrderMutation.mutate(actionToPerform.id);
                  } else if (actionToPerform?.action === "complete") {
                    completeOrderMutation.mutate(actionToPerform.id);
                  }
                }}
                loading={
                  acceptOrderMutation.isPending ||
                  rejectOrderMutation.isPending ||
                  calcelOrderMutation.isPending ||
                  completeOrderMutation.isPending
                }
              >
                {actionToPerform.action === "accept" && (
                  <>
                    <Check /> Accept
                  </>
                )}
                {actionToPerform.action === "reject" && (
                  <>
                    <X /> Reject
                  </>
                )}
                {actionToPerform.action === "cancel" && (
                  <>
                    <TriangleAlert /> Cancel
                  </>
                )}
                {actionToPerform.action === "complete" && (
                  <>
                    <Check /> Completed
                  </>
                )}
              </LoadingButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Orders;
