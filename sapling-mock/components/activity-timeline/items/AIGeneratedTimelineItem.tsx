"use client"

import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { TimelineItem, TimelineItemStyles } from "../types"

interface AIGeneratedTimelineItemProps {
  item: TimelineItem
  styles: TimelineItemStyles
}

export function AIGeneratedTimelineItem({ item, styles }: AIGeneratedTimelineItemProps) {
  const { Icon } = styles

  const badgeText = item.type === "contact-info-generated"
    ? "CONTACT INFORMATION GENERATED"
    : item.type === "wealth-info-generated"
    ? "WEALTH INFORMATION GENERATED"
    : item.type === "workflow-change"
    ? "ORCHID AI WORKFLOW CHANGE"
    : "DATA ENRICHMENT"

  return (
    <div className="flex gap-4">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
        styles.iconBg
      )}>
        <Icon className={cn("w-5 h-5", styles.iconColor)} />
      </div>

      <div className={cn(
        "flex-1 rounded-lg border border-gray-200 p-4",
        styles.borderColor,
        styles.bgColor
      )}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge className={cn("border-none text-xs font-semibold mb-2", styles.badgeColor)}>
              {badgeText}
            </Badge>
            <p className="text-sm text-gray-700 mb-2">{item.description}</p>
            <p className="text-xs text-gray-500">
              {item.addedBy} <span className="mx-2">•</span> {item.date}
            </p>
          </div>

          <div className="flex items-center gap-1 ml-4">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="w-4 h-4 text-gray-400" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
