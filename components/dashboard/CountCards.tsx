"use client";
import { API_GetDashboardData } from "@/lib/Api/api";
import { useQuery } from "@tanstack/react-query";
import {
  Package,
  PackageCheck,
  PackagePlus,
  PackageSearch,
  User,
} from "lucide-react";
import Loader from "../Loader";
import { Card, CardContent, CardTitle } from "../ui/card";

const samnpleData = [
  {
    title: "Total Users",
    value: 1500,
    icon: <User className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Active Users",
    value: 1200,
    icon: <User className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Inactive Users",
    value: 300,
    icon: <User className="h-6 w-6 text-red-500" />,
  },
  {
    title: "New Users ",
    value: 200,
    icon: <User className="h-6 w-6 text-yellow-500" />,
  },
];

const CountCards = () => {
  const query = useQuery({
    queryKey: ["dashboardCardData"],
    queryFn: API_GetDashboardData,
  });

  if (query.isLoading) return <Loader />;
  return (
    <div className="col-span-2 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {query.data?.data.map((item, index) => {
        return (
          <Card key={index} className="">
            <CardContent className="p-6">
              <CardTitle className="text-muted-foreground flex items-center gap-2">
                {getGetCardIcon(item.title)} {item.title}
              </CardTitle>
              <div className="text-4xl mt-5">{item.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CountCards;

const getGetCardIcon = (title: string) => {
  switch (title) {
    case "All Orders":
      return <Package className="h-6 w-6 text-blue-500" />;
    case "Pending Orders":
      return <PackageSearch className="h-6 w-6 text-yellow-500" />;
    case "Accepted Orders":
      return <PackagePlus className="h-6 w-6 text-green-500" />;
    case "Completed Orders":
      return <PackageCheck className="h-6 w-6 text-purple-500" />;
  }
};
