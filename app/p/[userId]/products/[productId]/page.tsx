"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loadingButton";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/useSession";
import { API_DeleteProduct, API_GetProduct } from "@/lib/Api/api";
import { formatDate, getPath } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  PackageCheck,
  PencilRuler,
  ShoppingCart,
  Tractor,
  Trash,
  TriangleAlert,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, use, useState } from "react";
import { toast } from "sonner";

const ProductView: FC<{
  params: Promise<{ userId: string; productId: string }>;
}> = ({ params }) => {
  const { userId, productId } = use(params);

  const [deleDialogOpen, setDeleteDialogOpen] = useState(false);

  const router = useRouter();

  const query = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await API_GetProduct(productId);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: API_DeleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      setDeleteDialogOpen(false);
      router.push(getPath(userId, "products"));
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to delete product");
    },
  });

  const session = useSession();

  if (query.isLoading || session.isLoading) return <Loader />;

  return (
    <div>
      <PageHeader title={query.isSuccess ? query.data.title : "Product"} />
      <CustomBreadcrumbs
        items={[
          { title: "Products", link: `/p/${userId}/products` },
          { title: "View" },
        ]}
      />
      <div className="mt-10">
        <div className=" relative">
          <Carousel>
            <CarouselContent>
              {query.data?.listingAttachments.map((att, i) => {
                return (
                  <CarouselItem key={i}>
                    <img
                      key={i}
                      src={att.attachment}
                      alt="image"
                      className="h-[50vh] w-full rounded-md"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute top-[50%] -translate-y-[50%] left-5 " />
            <CarouselNext className="absolute top-[50%] -translate-y-[50%] right-5 " />
          </Carousel>
        </div>
        <div className="badges mt-3">
          <Badge
            variant={query.data?.harvested ? "default" : "secondary"}
            className="flex items-center gap-2 w-fit "
          >
            {query.data?.harvested ? (
              <PackageCheck size={15} />
            ) : (
              <Tractor size={15} />
            )}
            {query.data?.harvested ? "Harvested" : " To be harvested at "}
            {!query.data?.harvested && (
              <> {formatDate(query.data?.willHarvestAt || "")} </>
            )}
          </Badge>
        </div>
        <div className="mt-3 text-slate-600 flex justify-between">
          <div className="flex flex-col gap-2">
            <div>{query.data?.description}</div>
            <div className="text-sm">
              Posted at: {formatDate(query.data?.createdAt || "")}{" "}
            </div>
          </div>
          <div>
            {session.data?.userType === "buyer" && (
              <Button disabled={!query.data?.quantity}>
                <ShoppingCart></ShoppingCart>{" "}
                {query.data?.quantity ? "Buy" : "Out of Stock"}
              </Button>
            )}
            {session.data?.id === query.data?.sellerId && (
              <div className="flex gap-2">
                <Button
                  variant={"destructive"}
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash /> Delete
                </Button>
                <Button variant={"default"}>
                  <PencilRuler /> Edit
                </Button>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex justify-between my-5">
          <div className=" w-[60%]">
            <div className="text-lg font-semibold mb-2">Product Details</div>
            <div className="flex flex-col gap-3">
              <div className="text-sm flex">
                <div className=" w-40"> Total Quantity </div>
                <div className="text-black font-bold">
                  {query.data?.quantity} {query.data?.unit}
                </div>
              </div>
              <div className="text-sm flex">
                <div className=" w-40"> Price </div>
                <div className="text-black font-bold">
                  {query.data?.pricePerUnit}/{query.data?.unit}
                </div>
              </div>
            </div>
          </div>

          <div className="  w-[40%]">
            <div className="text-lg font-semibold mb-2 ">Owner Details</div>
            <div className="flex gap-5">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={query.data?.seller.avatar} alt={"user"} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {query.data?.seller.name}
                </span>
                <span className="truncate text-xs">
                  {query.data?.seller.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={deleDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogTitle className="text-center">
            <TriangleAlert
              className="mx-auto mb-2 text-destructive"
              size={40}
            />
            Are you sure you want to delete this product?
          </DialogTitle>
          <div></div>
          <DialogFooter>
            <Button
              variant={"outline"}
              onClick={() => {
                setDeleteDialogOpen(false);
              }}
            >
              <X />
              Cancel
            </Button>
            <LoadingButton
              variant={"destructive"}
              loading={deleteMutation.isPending}
              onClick={() => {
                deleteMutation.mutate(productId);
              }}
            >
              <Trash />
              Delete
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductView;
