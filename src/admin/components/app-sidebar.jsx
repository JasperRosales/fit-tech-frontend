
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconReport,
  IconUsers,
  IconShirt,
  IconCirclePlusFilled,
} from "@tabler/icons-react"

import { NavDocuments } from "@/admin/components/nav-documents"

import { NavMain } from "@/components/shared/nav-main"
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
    name: "admin",
    email: "admin@email.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      id: "Home",
      icon: IconDashboard,
    },
    {
      title: "Analytics",
      id: "Analytics",
      icon: IconChartBar,
    },
    {
      title: "Sales",
      id: "Sales",
      icon: IconReport,
    },


    {
      title: "Users & Personnel",
      id: "Users & Personnel",
      icon: IconUsers,
    },
    {
      title: "Stock",
      id: "Stock",
      icon: IconDatabase,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },

  ],

  documents: [
    {
      name: "Metrics",
      url: import.meta.env.VITE_METRICS_URL || "localhost:5000/metric",
      icon: IconReport,
    },
    {
      name: "Dashboard",
      url: import.meta.env.VITE_DASHBOARD_URL || "#",
      icon: IconDashboard,
    },

    {
      name: "Documentation",
      url: import.meta.env.VITE_DOCS_URL || "#",
      icon: IconDatabase,
    },
  ],
}



export function AppSidebar({
  onPageChange,
  activePage,
  onQuickCreate,
  ...props
}) {


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <div className="bg-orange-500 rounded-lg p-1.5 shadow-lg shadow-orange-500/30 shadow-[4px_4px_8px_rgba(0,0,0,0.3)]">
                  <IconShirt className="!size-5 text-white" />
                </div>
                <span className="text-base font-semibold">Fit Tech - Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>

        {/* Quick Create Promotion Button */}
        <div className="px-3 py-2">
          <SidebarMenuButton
            onClick={() => onQuickCreate && onQuickCreate('promotion')}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-200 hover:scale-105"
            tooltip="Quick Create Promotion"
          >
            <IconCirclePlusFilled className="!size-4 mr-2" />
            <span className="font-medium">Create Promotion</span>
          </SidebarMenuButton>
        </div>

        <NavMain 
          items={data.navMain} 
          onPageChange={onPageChange}
          activePage={activePage}
        />
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

