"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import StatusComponent from "@/components/products/statusComponent";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { API_GetOrder } from "@/lib/Api/api";
import { useQuery } from "@tanstack/react-query";
import { FC, ReactNode, use } from "react";

const OrderViewPage: FC<{
  params: Promise<{ userId: string; orderId: string }>;
}> = ({ params }) => {
  const { orderId, userId } = use(params);

  const query = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await API_GetOrder(orderId);
      return response.data;
    },
  });

  if (query.isLoading) return <Loader />;

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
        <div className="text-2xl font-[500]">{query.data?.listing.title}</div>
        <div className="text-muted-foreground text-sm">
          {query.data?.listing.description}
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
