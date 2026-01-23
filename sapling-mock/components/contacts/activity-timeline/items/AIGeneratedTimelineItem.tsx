"use client"

import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { TimelineItem, TimelineItemStyles } from "../types"

interface AIGeneratedTimelineItemProps {
  item: TimelineItem
  styles: TimelineItemStyles
  alignment: "left" | "right"
  isLast?: boolean
  fullWidth?: boolean
}

export function AIGeneratedTimelineItem({ item, styles, alignment, fullWidth = false }: AIGeneratedTimelineItemProps) {
  const { Icon } = styles

  const badgeText = item.type === "contact-info-generated"
    ? "CONTACT INFORMATION GENERATED"
    : item.type === "wealth-info-generated"
    ? "WEALTH INFORMATION GENERATED"
    : item.type === "workflow-change"
    ? "ORCHID AI WORKFLOW CHANGE"
    : "DATA ENRICHMENT"

  return (
    <div className={cn(
      "flex relative",
      fullWidth ? "w-full" : "w-[75%]",
      alignment === "right" ? "self-end" : "self-start"
    )}>
      {/* Icon anchored on LEFT side of card at vertical midpoint */}
      <div className={cn(
        "absolute top-1/2 -translate-y-1/2 flex items-center justify-center",
        "h-10 w-10 rounded-full border-4 border-white shadow-sm z-20",
        styles.iconBg,
        "-left-5 -translate-x-full"
      )}>
        <Icon className={cn("w-5 h-5", styles.iconColor)} />
      </div>

      {/* Card with enhanced borders */}
      <div className={cn(
        "w-full rounded-lg border-2 p-4 shadow-sm z-10",
        styles.borderColor,
        styles.bgColor
      )}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge className={cn("border-none text-[10px] font-bold tracking-wide mb-2", styles.badgeColor)}>
              {badgeText}
            </Badge>
            <p className="text-sm text-gray-700 mb-2">{item.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              {item.addedBy} <span className="mx-2">•</span> {item.date}
            </p>
          </div>

          {/* Action Icons - top right corner */}
          <div className="flex items-center gap-1 ml-4">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
              <Pencil className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
