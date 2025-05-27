"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import PageHeader from "@/components/PageHeader";
import { API_GetAllProducts } from "@/lib/Api/api";
import { useQuery } from "@tanstack/react-query";
import { FC, use } from "react";

const Page: FC<{
  params: Promise<{ userId: string }>;
}> = ({ params }) => {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: API_GetAllProducts,
  });

  const { userId } = use(params);
  return (
    <div>
      <PageHeader title="Products" />
      <CustomBreadcrumbs
        items={[
          { title: "Products", link: `/p/${userId}/products` },
          { title: "List" },
        ]}
      />

      <div></div>
    </div>
  );
};

export default Page;
