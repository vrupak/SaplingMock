"use client"

import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { TimelineItem, TimelineItemStyles } from "../types"

interface MembershipTimelineItemProps {
  item: TimelineItem
  styles: TimelineItemStyles
  alignment: "left" | "right"
  isLast?: boolean
  fullWidth?: boolean
}

export function MembershipTimelineItem({ item, styles, alignment, fullWidth = false }: MembershipTimelineItemProps) {
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
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-sapling-light/20 text-sapling border-none text-[10px] font-bold tracking-wide uppercase">
                MEMBERSHIP
              </Badge>
              <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">{item.status}</Badge>
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">{item.description}</p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Amount:</span> {item.membershipAmount}{" "}
              <span className="font-medium ml-2">Renewal:</span> {item.renewal}
            </p>
            <p className="text-sm text-gray-600"><span className="font-medium">Notes:</span> {item.notes}</p>
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
