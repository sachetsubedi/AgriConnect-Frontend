"use client";

import {
  Frame,
  LayoutDashboard,
  Leaf,
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
  const session = useSession();

  // Generate navigation items based on user type
  const getNavItems = React.useMemo(() => {
    const navItems = [];

    // Add user-specific navigation items based on role
    if (session.data?.userType === "seller") {
      navItems.push(
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
          title: "Disease Management",
          url: `/p/${userId}/disease`,
          icon: Leaf,
          value: "disease",
        }
      );
    } else if (session.data?.userType === "buyer") {
      navItems.push(
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
        }
      );
    }

    // Add common navigation items for all users
    navItems.push({
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
    });

    return navItems;
  }, [session.data?.userType, userId]);

  const projects = [
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
  ];

  const [user, setUser] = React.useState({ name: "", email: "", avatar: "" });

  React.useEffect(() => {
    if (session.isSuccess) {
      setUser({
        name: session.data?.name || "",
        email: session.data?.email || "",
        avatar: session.data?.avatar || "",
      });
    }
  }, [session.isSuccess, session.data]);

  if (session.isLoading || !session.data) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-between">
        <Image src={"/logo.png"} width={150} height={100} alt="Logo" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavItems} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
