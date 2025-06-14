import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import PageHeader from "@/components/PageHeader";
import { FC, use } from "react";

const CreateAcution: FC<{ params: Promise<{ userId: string }> }> = ({
  params,
}) => {
  const { userId } = use(params);
  return (
    <div>
      <PageHeader title="Auctions" />
      <CustomBreadcrumbs
        items={[
          { title: "Auctions", link: `/p/${userId}/auction` },
          { title: "Create" },
        ]}
      />
    </div>
  );
};

export default CreateAcution;
