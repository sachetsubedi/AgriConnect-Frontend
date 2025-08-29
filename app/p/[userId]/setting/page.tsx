"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/hooks/useSession";
import { FC, use } from "react";
import { ProfileSettings } from "./components/ProfileSettings";
import { SecuritySettings } from "./components/SecuritySettings";

const Page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const { userId } = use(params);
  const session = useSession();

  if (session.isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" />
      <CustomBreadcrumbs
        items={[
          { title: "Account", link: `/p/${userId}/account` },
          { title: "Settings" },
        ]}
      />

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings user={session.data!} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
