"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/products/ProductCard";
import { API_GetAllProducts } from "@/lib/Api/api";
import { getPath } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { FC, use } from "react";
export interface I_Params {
  userId: string;
}

const Page: FC<{
  params: Promise<{ userId: string }>;
}> = ({ params }) => {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: API_GetAllProducts,
  });

  const { userId } = use(params);

  if (productsQuery.isLoading) return <Loader />;

  return (
    <div>
      <PageHeader
        title="Products"
        createPage={getPath(userId, "products/create")}
        createPageTitle="Add Product"
      />
      <CustomBreadcrumbs
        items={[
          { title: "Products", link: `/p/${userId}/products` },
          { title: "List" },
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {productsQuery.data?.data.map((product, index) => (
          <div key={index} className="mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
