"use client"

import { Pencil, Trash2, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TimelineItem, TimelineItemStyles } from "../types"

interface TaskTimelineItemProps {
  item: TimelineItem
  styles: TimelineItemStyles
}

export function TaskTimelineItem({ item, styles }: TaskTimelineItemProps) {
  const { Icon } = styles

  return (
    <div className="flex gap-4">
      {/* Icon */}
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
        styles.iconBg
      )}>
        <Icon className={cn("w-5 h-5", styles.iconColor)} />
      </div>

      {/* Card */}
      <div className={cn(
        "flex-1 rounded-lg border-l-4 p-4",
        styles.borderColor,
        styles.bgColor
      )}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <span className={cn(
              "inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2",
              styles.badgeColor
            )}>
              {item.title}
            </span>

            {item.description && (
              <p className="text-sm text-gray-700 mb-2">{item.description}</p>
            )}

            {item.type === "pinned-note" && item.addedBy && (
              <p className="text-xs text-gray-500">
                Added by: <span className="text-gray-700">{item.addedBy}</span>
                {" "}&bull;{" "}
                {item.date}
              </p>
            )}

            {item.type === "overdue-task" && (
              <p className="text-xs">
                <span className="text-red-600">Due: {item.dueDate}</span>
                {" "}&bull;{" "}
                <span className="text-gray-500">Owner: {item.owner}</span>
              </p>
            )}

            {item.type === "open-task" && (
              <div className="text-xs text-gray-500 space-y-0.5">
                <p>Created: {item.createdDate}</p>
                <p>Due: {item.dueDate}</p>
                <p>Owner: {item.owner}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-4">
            {item.type !== "pinned-note" && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Square className="w-4 h-4 text-gray-400" />
              </Button>
            )}
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
