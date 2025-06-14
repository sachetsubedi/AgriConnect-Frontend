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
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loadingButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "@/hooks/useSession";
import { API_GetAuction } from "@/lib/Api/api";
import { formatDate, isTodayOrBefore } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, Clock, PencilRuler, X } from "lucide-react";
import { FC, use, useEffect, useState } from "react";

const AuctionView: FC<{
  params: Promise<{ userId: string; auctionId: string }>;
}> = ({ params }) => {
  const { userId, auctionId } = use(params);
  const [header, setheader] = useState("Auction");
  const [placeBidOpen, setPlaceBidOpen] = useState(false);
  const query = useQuery({
    queryKey: ["auction"],
    queryFn: () => {
      return API_GetAuction(auctionId);
    },
  });

  useEffect(() => {
    if (!query.isSuccess) return;
    if (query.data?.data) {
      setheader(query.data.data.title + " - Auction");
    }
  }, [query.data]);

  const session = useSession();

  if (query.isLoading || session.isLoading) return <Loader />;

  return (
    <>
      <PageHeader title={header} />
      <CustomBreadcrumbs
        items={[
          { title: "Auctions", link: `/p/${userId}/auction` },
          { title: "View" },
        ]}
      />
      <div className=" relative mt-5">
        <Carousel>
          <CarouselContent>
            {query.data?.data.AuctionAttachments.map((att, i) => {
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
      <div className="mt-5 flex justify-between">
        <div>{query.data?.data.description}</div>

        <div>
          {query.data?.data.sellerId === userId && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    disabled={isTodayOrBefore(query.data?.data.startDate || "")}
                  >
                    <PencilRuler /> Edit
                  </Button>
                </div>
              </TooltipTrigger>

              {isTodayOrBefore(query.data?.data.startDate || "") && (
                <TooltipContent>
                  Auction has been started and cannot be edited
                </TooltipContent>
              )}
            </Tooltip>
          )}

          {session.data?.userType === "buyer" && (
            <>
              <Dialog open={placeBidOpen} onOpenChange={setPlaceBidOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <BadgeDollarSign /> Add Bid
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="font-bold text-center">
                    Place a bid
                  </DialogTitle>
                  <Label>Price</Label>
                  <Input />
                  <DialogFooter>
                    <DialogClose>
                      <Button type="button" variant={"outline"}>
                        <X /> Cancel
                      </Button>
                    </DialogClose>
                    <LoadingButton>
                      <BadgeDollarSign /> Place Bid
                    </LoadingButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
      <div>
        {isTodayOrBefore(query.data?.data.startDate || "") &&
          !isTodayOrBefore(query.data?.data.endDate || "") && (
            <Badge className="bg-primary flex gap-2 w-fit">
              <Clock size={12} /> Started
            </Badge>
          )}
        {isTodayOrBefore(query.data?.data.endDate || "") && (
          <Badge className="bg-destructive flex gap-2 w-fit">
            <Clock size={12} /> Ended
          </Badge>
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2">
        <div className=" flex flex-col gap-3">
          <div className="font-bold text-xl mb-2">Auction Details</div>
          <div className="flex">
            <div className="w-40 font-[500] text-muted-foreground">
              Quantity
            </div>
            <div className="font-bold">
              {query.data?.data.quantity} {query.data?.data.unit}
              {query.data?.data.quantity && query.data.data.quantity > 1 && "s"}
            </div>
          </div>

          <div className="flex">
            <div className="w-40 font-[500] text-muted-foreground">
              Start Date
            </div>
            <div className="font-bold">
              {" "}
              {formatDate(query.data?.data.startDate || "")}
            </div>
          </div>

          <div className="flex">
            <div className="w-40 font-[500] text-muted-foreground">
              End Date
            </div>
            <div className="font-bold">
              {" "}
              {formatDate(query.data?.data.endDate || "")}
            </div>
          </div>
        </div>

        <div>
          <div className="font-bold text-xl mb-5">Owner Details</div>
          <div className="flex gap-5">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={query.data?.data.seller.avatar} alt={"user"} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {query.data?.data.seller.name}
              </span>
              <span className="truncate text-xs">
                {query.data?.data.seller.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionView;
