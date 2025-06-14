import { T_Auction } from "@/lib/Api/api";
import { format } from "date-fns";
import { CalendarDays, Weight } from "lucide-react";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";

const AuctionCard: FC<{ auction: T_Auction }> = ({ auction }) => {
  return (
    <Card className="w-64  shadow-none border-none hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      <CardContent className="px-0 my-5 ">
        <div className="relative">
          <img
            src={auction.AuctionAttachments[0].attachment}
            alt="product"
            className="rounded-md h-32 w-full"
          />
        </div>
        <div className="flex justify-between">
          <div className="font-[500]">{auction.title}</div>
          <div className="flex text-sm font-[500] items-center">
            <Weight size={16} color="green" className="mr-1" />{" "}
            {auction.quantity} {auction.unit}
            {auction.quantity > 1 && "s"}
          </div>
        </div>
        <div className="text-sm text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap ">
          {auction.description}
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
          <CalendarDays size={15} />
          {format(new Date(auction.startDate), "dd MMM yyyy")} -{" "}
          {format(new Date(auction.endDate), "dd MMM yyyy")}{" "}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuctionCard;
