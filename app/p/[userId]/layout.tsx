import { AppSidebar } from "@/components/app-sidebar";
import NotificationSheet from "@/components/notification-sheet";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { use } from "react";

export default function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}>) {
  const rparams = use(params);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar userId={rparams.userId} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>

            <NotificationSheet />
          </header>
          <div className="flex flex-1 flex-col p-4 pt-0 px-16">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
