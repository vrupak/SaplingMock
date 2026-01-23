"use client"

import { Badge } from "@/components/ui/badge"
import type { Event } from "../types"

interface EventRowProps {
  event: Event
  onClick?: (event: Event) => void
}

export function EventRow({ event, onClick }: EventRowProps) {
  const registrationPercentage = Math.round((event.registered / event.capacity) * 100)

  // Category badge styles - lowercase display with color coding
  const typeBadgeStyles: Record<string, string> = {
    Gala: "bg-purple-100 text-purple-700 border-purple-200",
    Auction: "bg-blue-100 text-blue-700 border-blue-200",
    Fundraiser: "bg-green-100 text-green-700 border-green-200",
    Stewardship: "bg-pink-100 text-pink-700 border-pink-200",
    Workshop: "bg-amber-100 text-amber-700 border-amber-200",
  }

  // Status badge styles
  const statusBadgeStyles: Record<string, string> = {
    Planning: "bg-gray-100 text-gray-600 border-gray-200",
    Upcoming: "bg-blue-50 text-blue-600 border-blue-200",
    Ongoing: "bg-green-50 text-green-600 border-green-200",
    Completed: "bg-gray-50 text-gray-600 border-gray-200",
  }

  // Format time for display (e.g., "6:00 PM - 11:00 PM")
  const formatTimeRange = () => {
    if (event.startTime && event.endTime) {
      return `${event.startTime} - ${event.endTime}`
    }
    return event.startTime || ""
  }

  // Format revenue for display
  const formatRevenue = (amount: number) => {
    if (amount >= 1000) {
      return `$${amount.toLocaleString()}`
    }
    return `$${amount}`
  }

  return (
    <tr
      className="border-b border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
      onClick={() => onClick?.(event)}
    >
      {/* Event Column - Name and Category Badge */}
      <td className="py-4 px-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-gray-900">{event.name}</span>
          <Badge
            className={`text-xs font-medium border rounded-full px-2.5 py-0.5 w-fit ${typeBadgeStyles[event.type] || typeBadgeStyles.Gala}`}
          >
            {event.type.toLowerCase()}
          </Badge>
        </div>
      </td>

      {/* Date & Time Column */}
      <td className="py-4 px-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-gray-900">{event.startDate}</span>
          <span className="text-xs text-gray-500">{formatTimeRange()}</span>
        </div>
      </td>

      {/* Location Column */}
      <td className="py-4 px-4">
        <span className="text-sm text-gray-700">{event.venue}</span>
      </td>

      {/* Registered Column - Right aligned */}
      <td className="py-4 px-4 text-right">
        <div className="flex flex-col gap-0.5 items-end">
          <span className="text-sm font-medium text-gray-900">
            {event.registered} / {event.capacity}
          </span>
          <span className="text-xs text-gray-500">{registrationPercentage}% full</span>
        </div>
      </td>

      {/* Revenue Column - Right aligned */}
      <td className="py-4 px-4 text-right">
        <span className="text-sm font-medium text-gray-900">
          {formatRevenue(event.revenue)}
        </span>
      </td>

      {/* Status Column - Right aligned */}
      <td className="py-4 px-4 text-right">
        <Badge
          className={`text-xs font-medium border rounded-full px-3 py-1 ${statusBadgeStyles[event.status] || statusBadgeStyles.Planning}`}
        >
          {event.status.toLowerCase()}
        </Badge>
      </td>
    </tr>
  )
}
