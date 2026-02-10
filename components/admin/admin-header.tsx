"use client"

import { usePathname } from "next/navigation"
import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const labelMap: Record<string, string> = {
  admin: "Dashboard",
  surveys: "Surveys",
}

export function AdminHeader() {
  const pathname = usePathname()

  // Build breadcrumbs from pathname: /en/admin/surveys/xyz → ["admin", "surveys", "xyz"]
  const segments = pathname.split("/").filter(Boolean)
  // Remove locale segment (first)
  const adminSegments = segments.slice(1)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          {adminSegments.map((segment, index) => {
            const isLast = index === adminSegments.length - 1
            const href = `/${segments[0]}/${adminSegments.slice(0, index + 1).join("/")}`
            const label = labelMap[segment] || decodeURIComponent(segment)

            if (isLast) {
              return (
                <BreadcrumbItem key={segment}>
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            }

            return (
              <Fragment key={segment}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
