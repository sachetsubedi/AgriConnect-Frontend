"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { API_GetAllProducts } from "@/lib/Api/api";
import { getPath } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC, use } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
export interface I_Params {
  userId: string;
}

const Page: FC<{
  params: Promise<{ userId: string }>;
}> = ({ params }) => {
  const searchForm = useForm({ defaultValues: { search: "" } });

  const [searchQuery] = useDebounce(searchForm.watch("search"), 500);

  const productsQuery = useQuery({
    queryKey: [`products${searchQuery}`],
    queryFn: () => API_GetAllProducts(searchQuery),
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
      <div className="flex justify-end mt-5">
        <Input
          placeholder="Search products"
          type="search"
          {...searchForm.register("search")}
        />
      </div>
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
