"use client";
import AuctionCard from "@/components/auctions/AuctionCard";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { useSession } from "@/hooks/useSession";
import { API_GetAllAuctions } from "@/lib/Api/api";
import { getPath } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC, use } from "react";

const AuctionList: FC<{ params: Promise<{ userId: string }> }> = ({
  params,
}) => {
  const { userId } = use(params);

  const query = useQuery({
    queryKey: ["all-auction"],
    queryFn: () => {
      return API_GetAllAuctions("");
    },
  });

  const session = useSession();

  if (query.isLoading || session.isLoading) return <Loader />;

  return (
    <>
      <PageHeader
        title="Auctions"
        createPageTitle={"Create Auction"}
        createPage={
          session.data?.userType === "seller"
            ? getPath(userId, ["auction", "create"])
            : undefined
        }
      />
      <CustomBreadcrumbs
        items={[
          { title: "Auctions", link: `/p/${userId}/auction` },
          { title: "List" },
        ]}
      />

      <div className="mt-5 flex flex-wrap gap-8">
        {query.data?.data.length === 0 && (
          <div className="w-full text-center font-bold text-muted-foreground mt-6">
            No auctions found.
          </div>
        )}

        {query.data?.data.map((auction, index) => {
          return (
            <Link href={getPath(userId, ["auction", auction.id])} key={index}>
              <AuctionCard auction={auction} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default AuctionList;
