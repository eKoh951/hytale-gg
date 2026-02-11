"use client"

import {
  ClipboardList,
  ExternalLink,
  LayoutDashboard,
  Tags,
  MessageSquareWarning,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function AdminSidebar() {
  const pathname = usePathname()

  // Extract locale from pathname (e.g. /en/admin -> en)
  const locale = pathname.split("/")[1] || "en"
  const basePath = `/${locale}/admin`

  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: basePath,
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      title: "Surveys",
      href: `${basePath}/surveys`,
      icon: <ClipboardList className="size-4" />,
    },
    {
      title: "Tags",
      href: `${basePath}/tags`,
      icon: <Tags className="size-4" />,
    },
    {
      title: "Reviews",
      href: `${basePath}/reviews`,
      icon: <MessageSquareWarning className="size-4" />,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">hytale.GG</span>
            <span className="truncate text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === basePath
                        ? pathname === basePath
                        : pathname.startsWith(item.href)
                    }
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to Site">
                  <Link href={`/${locale}`}>
                    <ExternalLink className="size-4" />
                    <span>Back to Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
