"use client";

import { ChartLineDefault } from "@/components/charts/LineChart";
import CountCards from "@/components/dashboard/CountCards";
import RecentActivities from "@/components/dashboard/RecentActivities";
import Welcome from "@/components/dashboard/welcome";
import Loader from "@/components/Loader";
import { useSession } from "@/hooks/useSession";
import { API_GetDashboardData } from "@/lib/Api/api";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const session = useSession();
  const query = useQuery({
    queryKey: ["dashboardCardData"],
    queryFn: API_GetDashboardData,
  });

  if (session.isLoading || query.isLoading) return <Loader />;
  return (
    <div>
      <div className="grid gap-5 grid-cols-2 ">
        <Welcome
          name={session.data?.name || ""}
          avatar={session.data?.avatar || ""}
          type={session.data?.userType || "buyer"}
        />

        <RecentActivities />

        {query.data?.data.cardsData && (
          <CountCards data={query.data?.data.cardsData} />
        )}

        {query.data?.data.salesData && (
          <ChartLineDefault title="Sales" data={query.data.data.salesData} />
        )}
      </div>
    </div>
  );
};

export default Page;
