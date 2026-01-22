"use client"

import { Pencil, Trash2, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TimelineItem, TimelineItemStyles } from "../types"

interface TaskTimelineItemProps {
  item: TimelineItem
  styles: TimelineItemStyles
  alignment: "left" | "right"
  isLast?: boolean
  fullWidth?: boolean
}

export function TaskTimelineItem({ item, styles, alignment, fullWidth = false }: TaskTimelineItemProps) {
  const { Icon } = styles

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
            <span className={cn(
              "inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase mb-2",
              styles.badgeColor
            )}>
              {item.title}
            </span>

            {item.description && (
              <p className="text-sm text-gray-700 mb-2">{item.description}</p>
            )}

            {item.type === "pinned-note" && item.addedBy && (
              <p className="text-xs text-gray-500 mt-2">
                Added by: <span className="text-gray-700">{item.addedBy}</span>
                {" "}&bull;{" "}
                {item.date}
              </p>
            )}

            {item.type === "overdue-task" && (
              <p className="text-xs mt-2">
                <span className="text-red-600">Due: {item.dueDate}</span>
                {" "}&bull;{" "}
                <span className="text-gray-500">Owner: {item.owner}</span>
              </p>
            )}

            {item.type === "open-task" && (
              <div className="text-xs text-gray-500 space-y-0.5 mt-2">
                <p>Created: {item.createdDate}</p>
                <p>Due: {item.dueDate}</p>
                <p>Owner: {item.owner}</p>
              </div>
            )}
          </div>

          {/* Actions - top right corner */}
          <div className="flex items-center gap-1 ml-4">
            {item.type !== "pinned-note" && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                <Square className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </Button>
            )}
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
