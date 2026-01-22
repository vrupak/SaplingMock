"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Gift,
  BarChart3,
  CreditCard,
  Megaphone,
  Calendar,
  Mail,
  Heart,
  Puzzle,
  Tags,
  Activity,
  Download,
  Sparkles,
  Settings,
  PlusCircle,
  Menu,
  Cog,
} from "lucide-react"

interface SidebarProps {
  activeItem: string
  onItemClick: (item: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "gifts", label: "Gifts", icon: Gift },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "events", label: "Events", icon: Calendar },
  { id: "communications", label: "Communications", icon: Mail },
  { id: "volunteers", label: "Volunteers", icon: Heart },
]

const secondaryNavItems = [
  { id: "integrations", label: "Integrations", icon: Puzzle },
  { id: "workflows", label: "Workflows + Tags", icon: Tags },
  { id: "data-health", label: "Data Health", icon: Activity },
]

export function Sidebar({ activeItem, onItemClick, collapsed = false, onToggleCollapse }: SidebarProps) {
  return (
    <aside className={cn(
      "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-56"
    )}>
      {/* Logo Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
        <button
          onClick={onToggleCollapse}
          className={cn(
            "w-8 h-8 bg-sapling rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-sapling-dark"
          )}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </button>
        {!collapsed && <span className="font-semibold text-gray-900">Sapling CRM</span>}
        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-gray-100 rounded ml-auto"
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (collapsed) {
                onToggleCollapse?.()
              }
              onItemClick(item.id)
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              activeItem === item.id
                ? "bg-sapling text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 flex-shrink-0",
              activeItem === item.id ? "text-white" : "text-gray-400"
            )} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}

        {/* Divider */}
        <div className="my-4 border-t border-gray-100" />

        {secondaryNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (collapsed) {
                onToggleCollapse?.()
              }
              onItemClick(item.id)
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              activeItem === item.id
                ? "bg-sapling text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 flex-shrink-0",
              activeItem === item.id ? "text-white" : "text-gray-400"
            )} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}

        {/* Divider */}
        <div className="my-4 border-t border-gray-100" />

        {/* Import */}
        <button
          onClick={() => {
            if (collapsed) {
              onToggleCollapse?.()
            }
            onItemClick("import")
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeItem === "import"
              ? "bg-sapling text-white"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <Download className={cn(
            "w-5 h-5 flex-shrink-0",
            activeItem === "import" ? "text-white" : "text-gray-400"
          )} />
          {!collapsed && <span>Import</span>}
        </button>

        {/* Orchid AI */}
        <button
          onClick={() => {
            if (collapsed) {
              onToggleCollapse?.()
            }
            onItemClick("orchid-ai")
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeItem === "orchid-ai"
              ? "bg-sapling text-white"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <Sparkles className={cn(
            "w-5 h-5 flex-shrink-0",
            activeItem === "orchid-ai" ? "text-white" : "text-gray-400"
          )} />
          {!collapsed && (
            <div className="flex flex-col items-start">
              <span>Orchid AI</span>
              <span className={cn(
                "text-xs",
                activeItem === "orchid-ai" ? "text-white/70" : "text-gray-400"
              )}>AI-powered insights</span>
            </div>
          )}
        </button>

        {/* Divider */}
        <div className="my-4 border-t border-gray-100" />

        {/* Operations */}
        <button
          onClick={() => {
            if (collapsed) {
              onToggleCollapse?.()
            }
            onItemClick("operations")
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeItem === "operations"
              ? "bg-sapling text-white"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <Cog className={cn(
            "w-5 h-5 flex-shrink-0",
            activeItem === "operations" ? "text-white" : "text-gray-400"
          )} />
          {!collapsed && <span>Operations</span>}
        </button>

        {/* Custom */}
        <button
          onClick={() => {
            if (collapsed) {
              onToggleCollapse?.()
            }
            onItemClick("custom")
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeItem === "custom"
              ? "bg-sapling text-white"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <PlusCircle className={cn(
            "w-5 h-5 flex-shrink-0",
            activeItem === "custom" ? "text-white" : "text-gray-400"
          )} />
          {!collapsed && <span>Custom</span>}
        </button>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-100 p-2">
        <button
          onClick={() => {
            if (collapsed) {
              onToggleCollapse?.()
            }
            onItemClick("settings")
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeItem === "settings"
              ? "bg-sapling text-white"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <Settings className={cn(
            "w-5 h-5 flex-shrink-0",
            activeItem === "settings" ? "text-white" : "text-gray-400"
          )} />
          {!collapsed && <span>Settings</span>}
        </button>

        {/* Organization */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-3 mt-2",
          collapsed ? "justify-center" : ""
        )}>
          <div className="w-8 h-8 bg-sapling-light/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-sapling" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Sample Charity</p>
            </div>
          )}
          {!collapsed && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <Menu className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
