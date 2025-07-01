"use client";
import { API_GetAllNotifications } from "@/lib/Api/api";
import { useQuery } from "@tanstack/react-query";
import { getNotificationIcon } from "../notification-sheet";
import { Card, CardContent, CardTitle } from "../ui/card";

const RecentActivities = () => {
  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: API_GetAllNotifications,
  });
  if (query.isLoading) return null;
  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardContent className="p-6">
        <CardTitle className="text-muted-foreground mb-3">
          Recent Notifications
        </CardTitle>
        <div className="flex gap-2 flex-col">
          {query.data?.data.slice(0, 3).map((n, i) => {
            return (
              <div key={i} className="flex  gap-2">
                <div className="w-fit"> {getNotificationIcon(n.type)} </div>
                <div className="font-[500]">
                  <div>{n.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {n.message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
