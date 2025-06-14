import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import PageHeader from "@/components/PageHeader";
import { getPath } from "@/lib/utils";
import { FC, use } from "react";

const AuctionList: FC<{ params: Promise<{ userId: string }> }> = ({
  params,
}) => {
  const { userId } = use(params);
  return (
    <>
      <PageHeader
        title="Auctions"
        createPageTitle="Create Auction"
        createPage={getPath(userId, ["auction", "create"])}
      />
      <CustomBreadcrumbs
        items={[
          { title: "Auctions", link: `/p/${userId}/auction` },
          { title: "List" },
        ]}
      />
    </>
  );
};

export default AuctionList;
