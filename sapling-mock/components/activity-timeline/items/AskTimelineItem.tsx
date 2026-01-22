"use client"

import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { TimelineItem, TimelineItemStyles } from "../types"

interface AskTimelineItemProps {
  item: TimelineItem
  styles: TimelineItemStyles
}

export function AskTimelineItem({ item, styles }: AskTimelineItemProps) {
  const { Icon } = styles

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
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-amber-100 text-amber-700 border-none text-xs font-semibold">ASK</Badge>
              <span className="font-bold text-sapling">{item.amount}</span>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">{item.status}</Badge>
            </div>
            <p className="text-sm font-medium text-gray-900 mb-2">{item.description}</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Follow-up:</span> {item.followUp}</p>
              <p><span className="font-medium">Notes:</span> {item.notes}</p>
              <p className="text-gray-500">
                {item.addedBy} <span className="mx-2">•</span> {item.date} <span className="mx-2">•</span> {item.createdDate}
              </p>
            </div>
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
