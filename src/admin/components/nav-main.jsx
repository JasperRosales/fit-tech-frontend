

import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { StaffNotificationModal } from "@/admin/components/staff-notification-modal"
import { PromotionModal } from "@/admin/components/promotion-modal"

export function NavMain({
  items,
  onPageChange,
  activePage
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">

        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <PromotionModal />
            <StaffNotificationModal />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                tooltip={item.title}
                onClick={() => onPageChange && onPageChange(item.id)}
                className={activePage === item.id ? "bg-accent text-accent-foreground" : ""}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
