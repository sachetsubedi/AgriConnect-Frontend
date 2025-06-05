"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { API_GetAllUserOrders } from "@/lib/Api/api";
import { useQuery } from "@tanstack/react-query";
import { Eraser, Search } from "lucide-react";
import { FC, use } from "react";

const Orders: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const { userId } = use(params);

  const query = useQuery({
    queryKey: [`orders-${userId}`],
    queryFn: API_GetAllUserOrders,
  });

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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
