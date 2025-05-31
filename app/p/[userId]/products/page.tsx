"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/products/ProductCard";
import { API_GetAllProducts } from "@/lib/Api/api";
import { getPath } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
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
      <div className="flex flex-wrap gap-10">
        {productsQuery.data?.data.map((product, index) => (
          <Link
            href={getPath(userId, ["products", product.id])}
            key={index}
            className="mb-4"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
