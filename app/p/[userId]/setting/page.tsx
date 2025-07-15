"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSession } from "@/hooks/useSession";
import { FC, use } from "react";

const page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const { userId } = use(params);

  const session = useSession();

  if (session.isLoading) return <Loader />;
  console.log(session.data);
  return (
    <div>
      <PageHeader title="Settings" />
      <CustomBreadcrumbs
        items={[
          { title: "Account", link: `/p/${userId}/account` },
          { title: "Edit" },
        ]}
      />

      <Card className="mt-10">
        <CardContent className="p-6">
          <CardTitle className="font-semibold">Account Settings</CardTitle>

          <div className="mt-10">
            <div className="relative group">
              <img
                src={session.data?.avatar || ""}
                alt={session.data?.name || ""}
                className="w-60 h-60 rounded-full mb-4 group-hover:blur-sm"
              />
              <div className=" absolute">Change Image</div>
            </div>
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
