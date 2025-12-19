

import {
  IconDashboard,
  IconShirt,
  IconShoppingCart,
  IconHistory,
  IconMessageCircle,
  IconUser,
  IconFileDescription,
  IconFileAi,
} from "@tabler/icons-react";



import { NavMain } from "@/components/shared/nav-main";
import { NavUser } from "@/components/shared/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {

  navMain: [
    {
      title: "Home",
      id: "Home",
      icon: IconDashboard,
    },
    {
      title: "Products",
      id: "Products",
      icon: IconShirt,
    },
    {
      title: "Cart",
      id: "Cart",
      icon: IconShoppingCart,
    },
    {
      title: "Reservations",
      id: "Reservations",
      icon: IconHistory,
    },
    {
      title: "Inbox",
      id: "Inbox",
      icon: IconMessageCircle,
    },
  ],
  navClouds: [
    {
      title: "Fashion",
      icon: IconFileDescription,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Men's Fashion",
          url: "#",
        },
        {
          title: "Women's Fashion",
          url: "#",
        },
      ],
    },
    {
      title: "Categories",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Accessories",
          url: "#",
        },
        {
          title: "Footwear",
          url: "#",
        },
      ],
    },
  ],


  documents: [
    {
      name: "Support",
      url: "#",
      icon: IconMessageCircle,
    },
    {
      name: "Orders",
      url: "#",
      icon: IconShoppingCart,
    },
  ],
};

export function AppSidebar({ onPageChange, activePage, ...props }) {
  return (
    <>
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <a href="#">
                  <div className="bg-orange-500 rounded-lg p-1.5 shadow-lg shadow-orange-500/30 shadow-[4px_4px_8px_rgba(0,0,0,0.3)]">
                    <IconShirt className="!size-5 text-white" />
                  </div>
                  <span className="text-base font-semibold">Fit Tech</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <NavMain
            items={data.navMain}
            onPageChange={onPageChange}
            activePage={activePage}
          />
        </SidebarContent>

        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
