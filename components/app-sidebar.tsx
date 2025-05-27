"use client";

import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
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
import { useQuery } from "@tanstack/react-query";
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
      },
      {
        title: "Products",
        url: `/p/${userId}/products`,
        icon: ShoppingCart,
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
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

  const query = useQuery({
    queryFn: useSession,
    queryKey: ["session"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  React.useEffect(() => {
    if (query.isSuccess) {
      setUser({
        name: query.data.data.name,
        email: query.data.data.email,
        avatar: query.data.data.avatar, // Assuming a static avatar for now
      });
    }
  }, [query.data]);

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
