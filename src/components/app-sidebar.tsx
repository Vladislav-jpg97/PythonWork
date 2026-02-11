"use client"

import * as React from "react"
import { ChevronRight, BookOpen, Terminal, Code2 } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarRail,
  useSidebar, // Импортируем хук управления сайтбаром
} from "@/components/ui/sidebar"

interface Theme { 
  id: string; 
  name: string; 
  subthemes: { id: string; name: string }[]; 
}

export function AppSidebar() {
  const t = useTranslations("PythonThemes")
  const locale = useLocale()
  const pathname = usePathname()
  
  // Извлекаем функцию закрытия мобильного меню
  const { setOpenMobile } = useSidebar()
  
  const themes = t.raw("themes") as Theme[] || []

  // Функция для закрытия сайтбара
  const handleLinkClick = () => {
    setOpenMobile(false)
  }

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="bg-[#0b0e14]">
      <SidebarHeader className="p-6">
        <Link 
          href={`/${locale}`} 
          className="flex items-center gap-3 group"
          onClick={handleLinkClick} // Закрыть при клике на лого
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
            <Code2 size={24} />
          </div>
          <span className="font-bold text-lg text-white uppercase leading-none">
            {t("academy")}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-4 opacity-50">
            {t("aside_title")}
          </div>
          <SidebarMenu className="gap-1">
            {themes.map((theme) => {
              const isThemeActive = pathname.includes(theme.id)
              return (
                <Collapsible key={theme.id} asChild defaultOpen={isThemeActive} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isThemeActive} className="text-slate-300">
                        <BookOpen className={cn("w-4 h-4 transition-colors", isThemeActive ? "text-blue-400" : "text-blue-500/50")} />
                        <span className="truncate">{theme.name}</span>
                        <ChevronRight className="ml-auto w-4 h-4 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {theme.subthemes?.map((sub) => {
                          const href = `/${locale}/course/${sub.id}`
                          const isActive = pathname === href
                          return (
                            <SidebarMenuItem key={sub.id}>
                              <SidebarMenuSubButton asChild isActive={isActive}>
                                <Link 
                                  href={href} 
                                  className={cn("flex items-center gap-3 w-full", isActive ? "text-blue-400" : "text-slate-500")}
                                  onClick={handleLinkClick} // ЗАКРЫВАЕТ САЙТБАР ТУТ
                                >
                                  <Terminal size={12} className={isActive ? "text-blue-400" : "opacity-20"} />
                                  <span className="text-xs truncate">{sub.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}