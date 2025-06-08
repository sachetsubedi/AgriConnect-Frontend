"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import StatusComponent from "@/components/products/statusComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_GetAllUserOrders } from "@/lib/Api/api";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, Eraser, Search } from "lucide-react";
import { FC, use } from "react";

const Orders: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const { userId } = use(params);

  const query = useQuery({
    queryKey: [`orders-${userId}`],
    queryFn: API_GetAllUserOrders,
  });

  if (query.isLoading) return <Loader />;

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
          <Button>
            <Search /> Search
          </Button>
          <Button variant={"outline"}>
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
            {query.data?.data.map((order) => (
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
                  <Button variant="link">
                    <EllipsisVertical />{" "}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
