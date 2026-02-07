"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "18rem"
const SIDEBAR_WIDTH_ICON = "4rem"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.")
  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) setOpenProp(openState)
      else _setOpen(openState)
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev)
  }, [isMobile, setOpen, setOpenMobile])

  const state: "expanded" | "collapsed" = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style } as React.CSSProperties}
          className={cn("group/sidebar-wrapper flex min-h-svh w-full bg-[#0b0e14]", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { variant?: "sidebar" | "floating" | "inset"; collapsible?: "offcanvas" | "icon" | "none" }
>(({ variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent className="bg-[#0b0e14] text-slate-300 w-(--sidebar-width) p-0 border-r border-white/5" side="left">
          <SheetHeader className="sr-only"><SheetTitle>Sidebar</SheetTitle><SheetDescription>Navigation</SheetDescription></SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="group peer text-slate-300 hidden md:block" data-state={state} data-collapsible={state === "collapsed" ? collapsible : ""} data-variant={variant} ref={ref}>
      <div className={cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-300 ease-in-out group-data-[collapsible=offcanvas]:w-0")} />
      <div className={cn(
        "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-300 ease-in-out md:flex border-r border-white/5 bg-[#0b0e14]",
        "group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
        "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        className
      )} {...props}>
        <div className="flex h-full w-full flex-col">{children}</div>
      </div>
    </div>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()
  return (
    <Button ref={ref} variant="ghost" size="icon" className={cn("size-9 text-slate-400 hover:text-white hover:bg-white/5", className)} onClick={(e) => { onClick?.(e); toggleSidebar() }} {...props}>
      <PanelLeftIcon className="size-5" />
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => (
  <main ref={ref} className={cn("relative flex min-h-svh flex-1 flex-col bg-[#0b0e14] transition-all duration-300", className)} {...props} />
))
SidebarInset.displayName = "SidebarInset"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-3 overflow-hidden rounded-xl p-3 text-left text-sm outline-none transition-all hover:bg-white/5 hover:text-white focus-visible:ring-1 focus-visible:ring-blue-500 disabled:opacity-50 data-[active=true]:bg-blue-600/10 data-[active=true]:text-blue-400 data-[active=true]:font-semibold [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: { default: "", outline: "border border-white/10" },
      size: { default: "h-11", sm: "h-9 text-xs", lg: "h-14" }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean; isActive?: boolean; tooltip?: string } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const { state } = useSidebar()
  const button = <Comp ref={ref} data-active={isActive} className={cn(sidebarMenuButtonVariants({ variant, size }), className)} {...props} />
  if (!tooltip) return button
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" hidden={state !== "collapsed"}>{tooltip}</TooltipContent>
    </Tooltip>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarHeader = ({ className, ...props }: React.ComponentProps<"div">) => <div className={cn("flex flex-col gap-2 p-4", className)} {...props} />
const SidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => <div className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2", className)} {...props} />
const SidebarGroup = ({ className, ...props }: React.ComponentProps<"div">) => <div className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />
const SidebarMenu = ({ className, ...props }: React.ComponentProps<"ul">) => <ul className={cn("flex w-full flex-col gap-1", className)} {...props} />
const SidebarMenuItem = ({ className, ...props }: React.ComponentProps<"li">) => <li className={cn("relative", className)} {...props} />
const SidebarMenuSub = ({ className, ...props }: React.ComponentProps<"ul">) => <ul className={cn("mx-3.5 flex flex-col gap-1 border-l border-white/5 px-2.5 py-0.5", className)} {...props} />
const SidebarMenuSubButton = ({ asChild = false, isActive = false, className, ...props }: React.ComponentProps<"a"> & { asChild?: boolean; isActive?: boolean }) => {
  const Comp = asChild ? Slot : "a"
  return <Comp data-active={isActive} className={cn("flex h-8 items-center gap-2 rounded-md px-2 text-sm text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200 data-[active=true]:text-blue-400", className)} {...props} />
}
const SidebarRail = ({ className, ...props }: React.ComponentProps<"button">) => {
  const { toggleSidebar } = useSidebar()
  return <button onClick={toggleSidebar} className={cn("absolute inset-y-0 -right-4 z-20 hidden w-4 -translate-x-1/2 transition-all after:absolute after:inset-y-0 after:left-1/2 after:w-[1px] after:bg-white/5 hover:after:bg-blue-500/50 sm:flex", className)} {...props} />
}

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
}