import * as React from "react"

import {
  IconDashboard,
  IconChartBar,
  IconPackage,
  IconCalendar,
  IconUsers,
  IconShirt,
  IconHeart,
  IconTrendingUp,
} from "@tabler/icons-react"



import { NavUser } from "@/components/shared/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Staff Member",
    email: "staff@fittech.com",
    avatar: "/avatars/staff.jpg",
  },




  navMain: [
    {
      title: "Dashboard",
      id: "Dashboard",
      icon: IconDashboard,
    },
    {
      title: "Customer Analytics",
      id: "Analytics",
      icon: IconChartBar,
    },
    {
      title: "Stock Management",
      id: "Stock",
      icon: IconPackage,
    },
    {
      title: "Reservations",
      id: "Reservations",
      icon: IconCalendar,
    },
    {
      title: "Customer Care",
      id: "Customer Care",
      icon: IconHeart,
    },
  ],
}

export function AppSidebar({
  onPageChange,
  activePage,
  ...props
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <div className="bg-blue-500 rounded-lg p-1.5 shadow-lg shadow-blue-500/30 shadow-[4px_4px_8px_rgba(0,0,0,0.3)]">
                  <IconShirt className="!size-5 text-white" />
                </div>
                <span className="text-base font-semibold">Fit Tech - Staff</span>
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

// NavMain component for staff sidebar
function NavMain({ items, onPageChange, activePage }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={activePage === item.id}
            onClick={() => onPageChange(item.id)}
            className="cursor-pointer"
          >
            <button>
              <item.icon className="size-4" />
              <span>{item.title}</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
