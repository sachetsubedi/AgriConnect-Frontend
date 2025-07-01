"use client";

import CountCards from "@/components/dashboard/CountCards";
import RecentActivities from "@/components/dashboard/RecentActivities";
import Welcome from "@/components/dashboard/welcome";
import Loader from "@/components/Loader";
import { useSession } from "@/hooks/useSession";

const Page = () => {
  const session = useSession();

  if (session.isLoading) return <Loader />;
  return (
    <div>
      <div className="grid gap-5 grid-cols-2 ">
        <Welcome
          name={session.data?.name || ""}
          avatar={session.data?.avatar || ""}
          type={session.data?.userType || "buyer"}
        />

        <RecentActivities />

        <CountCards />
      </div>
    </div>
  );
};

export default Page;
