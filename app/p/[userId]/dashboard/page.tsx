"use client";

import RecentActivities from "@/components/dashboard/RecentActivities";
import Welcome from "@/components/dashboard/welcome";
import Loader from "@/components/Loader";
import { useSession } from "@/hooks/useSession";

const Page = () => {
  const session = useSession();

  if (session.isLoading) return <Loader />;
  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <Welcome
          name={session.data?.name || ""}
          avatar={session.data?.avatar || ""}
        />
        <RecentActivities />
      </div>
    </div>
  );
};

export default Page;
