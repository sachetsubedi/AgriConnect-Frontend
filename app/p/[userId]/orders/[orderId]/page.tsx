"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import StatusComponent from "@/components/products/statusComponent";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loadingButton";
import { useSession } from "@/hooks/useSession";
import {
  API_AcceptOrder,
  API_CancelOrder,
  API_CompleteOrder,
  API_GetOrder,
  API_RejectOrder,
  T_OrderStatus,
} from "@/lib/Api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Check,
  CircleX,
  PackageCheck,
  PackageX,
  TriangleAlert,
  X,
} from "lucide-react";
import { FC, ReactNode, use, useState } from "react";
import { toast } from "sonner";
import { T_Actions } from "../page";

const OrderViewPage: FC<{
  params: Promise<{ userId: string; orderId: string }>;
}> = ({ params }) => {
  const { orderId, userId } = use(params);
  const session = useSession();
  const [actionToPerform, setActionToPerform] = useState<{
    id: string;
    action: T_Actions;
    content: string;
  } | null>(null);

  const query = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await API_GetOrder(orderId);
      return response.data;
    },
  });

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
            icon: <Check />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "accept",
                content: "Are you sure you want to accept this order?",
              });
            },
            color: "default",
          });
          actions.push({
            label: "Reject Order",
            icon: <X />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "reject",
                content: "Are you sure you want to reject this order?",
              });
            },
            color: "destructive",
          });
        } else if (args.status === "ACCEPTED") {
          actions.push({
            label: "Mark Completed",
            icon: <PackageCheck />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "complete",
                content:
                  "Are you sure you want to mark this order as completed?",
              });
            },
            color: "default",
          });
          actions.push({
            label: "Reject Order",
            icon: <X />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "reject",
                content: "Are you sure you want to reject this order?",
              });
            },
            color: "destructive",
          });
        } else if (args.status === "REJECTED") {
          actions.push({
            label: "Accept Order",
            icon: <Check />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "accept",
                content: "Are you sure you want to accept this order?",
              });
            },
            color: "default",
          });
        }
        break;
      case "buyer":
        if (args.status === "PENDING") {
          actions.push({
            label: "Cancel Order",
            icon: <X />,
            action: (orderId: string) => {
              setActionToPerform({
                id: orderId,
                action: "cancel",
                content: "Are you sure you want to cancel this order?",
              });
            },
            color: "destructive",
          });
        }
        break;
    }
    return actions;
  };

  if (query.isLoading || session.isLoading) return <Loader />;

  return (
    <>
      <PageHeader title="View Order" />
      <CustomBreadcrumbs
        items={[
          { title: "Orders", link: `/p/${userId}/orders` },
          { title: "View" },
        ]}
      />
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-[500]">
              {query.data?.listing.title}
            </div>
            <div className="text-muted-foreground text-sm">
              {query.data?.listing.description}
            </div>
          </div>
          <div className="flex gap-2">
            {getActions({
              userType: session.data?.userType || "buyer",
              status: query.data?.status || "PENDING",
            }).map((action, index) => {
              return (
                <Button
                  variant={action.color as any}
                  key={index}
                  onClick={() => action.action(query.data?.id || "")}
                >
                  {action.icon} {action.label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <CardTitle className="mb-5">Order Details</CardTitle>
              <div className="flex flex-col gap-3">
                <ListItem
                  name="Order Id"
                  value={query.data?.orderNumber || ""}
                />
                <ListItem
                  name="Quantity"
                  value={`${query.data?.quantity} ${query.data?.listing.unit}`}
                />
                <ListItem
                  name="Total Price"
                  value={`Rs ${query.data?.totalPrice} `}
                />
                <ListItem
                  name="Status"
                  value={
                    <StatusComponent status={query.data?.status || "PENDING"} />
                  }
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <CardTitle className="mb-5 flex justify-between">
                Buyer Details{" "}
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={query.data?.buyer.avatar}
                    alt={query.data?.buyer.name}
                  />
                </Avatar>
              </CardTitle>
              <div className="flex flex-col gap-3">
                <ListItem name="Name" value={query.data?.buyer.name || ""} />
                <ListItem name="Email" value={query.data?.buyer.email || ""} />
                <ListItem name="Phone" value={query.data?.buyer.phone || ""} />
                <ListItem
                  name="Address"
                  value={query.data?.buyer.address || ""}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <CardTitle className="mb-5 flex justify-between">
                Seller Details{" "}
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={query.data?.listing.seller.avatar}
                    alt={query.data?.listing.seller.name}
                  />
                </Avatar>
              </CardTitle>
              <div className="flex flex-col gap-3">
                <ListItem
                  name="Name"
                  value={query.data?.listing.seller.name || ""}
                />
                <ListItem
                  name="Email"
                  value={query.data?.listing.seller.email || ""}
                />
                <ListItem
                  name="Phone"
                  value={query.data?.listing.seller.phone || ""}
                />
                <ListItem
                  name="Address"
                  value={query.data?.listing.seller.address || ""}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
                  actionToPerform.action == "reject" ? "destructive" : "default"
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
    </>
  );
};

export default OrderViewPage;

const ListItem: FC<{
  name: string;
  value: string | number | ReactNode;
}> = ({ name, value }) => {
  return (
    <div className="flex text-sm">
      <div className="w-36">{name}:</div>
      <div className="font-[500]">{value}</div>
    </div>
  );
};
