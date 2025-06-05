"use client";

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  Package,
  PieChart,
  Settings2,
  ShoppingCart,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "@/hooks/useSession";
import Image from "next/image";

export function AppSidebar({
  userId,
  ...props
}: React.ComponentProps<typeof Sidebar> & { userId: string }) {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: `/p/${userId}/dashboard`,
        icon: LayoutDashboard,
        isActive: true,
        value: "dashboard",
      },
      {
        title: "Products",
        url: `/p/${userId}/products`,
        icon: Package,
        value: "products",
      },
      {
        title: "Orders",
        url: `/p/${userId}/orders`,
        icon: ShoppingCart,
        value: "orders",
      },

      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,

        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  const [user, setUser] = React.useState({ name: "", email: "", avatar: "" });

  const userData = useSession();

  React.useEffect(() => {
    if (userData.isSuccess) {
      setUser({
        name: userData.data?.name || "",
        email: userData.data?.email || "",
        avatar: userData.data?.avatar || "",
      });
    }
  }, [userData.isSuccess]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-between">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Image src={"/logo.png"} width={150} height={100} alt="Logo" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
