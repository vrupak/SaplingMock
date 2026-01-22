"use client"

import { Phone, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TimelineItem, TimelineItemStyles } from "../types"

interface CallNoteTimelineItemProps {
  item: TimelineItem
  styles: TimelineItemStyles
}

export function CallNoteTimelineItem({ item, styles }: CallNoteTimelineItemProps) {
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
        "bg-white"
      )}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-700">Call</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{item.addedBy}</span>
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">{item.description}</p>
            <p className="text-sm text-gray-600 mb-2">{item.notes}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Outcome:</span> {item.outcome}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Next Steps:</span> {item.nextSteps}</p>
            <p className="text-xs text-gray-500 mt-2">
              {item.date} <span className="mx-2">•</span> {item.createdDate}
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
