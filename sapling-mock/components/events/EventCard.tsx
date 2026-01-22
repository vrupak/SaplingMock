"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Event } from "./types"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const registrationProgress = (event.registered / event.capacity) * 100
  const revenueProgress = event.fundraisingGoal > 0
    ? (event.revenue / event.fundraisingGoal) * 100
    : 0

  // Badge styles based on event type
  const typeBadgeStyles = {
    Gala: "bg-purple-50 text-purple-700 border-purple-200",
    Auction: "bg-blue-50 text-blue-700 border-blue-200",
    Fundraiser: "bg-green-50 text-green-700 border-green-200",
    Stewardship: "bg-pink-50 text-pink-700 border-pink-200",
    Workshop: "bg-amber-50 text-amber-700 border-amber-200",
  }

  const statusBadgeStyles = {
    Planning: "bg-gray-50 text-gray-700 border-gray-200",
    Upcoming: "bg-blue-50 text-blue-700 border-blue-200",
    Ongoing: "bg-orange-50 text-orange-700 border-orange-200",
    Completed: "bg-green-50 text-green-700 border-green-200",
  }

  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-5 transition-all duration-200 hover:border-metric-blue hover:shadow-md">
      {/* Header: Title and Badges */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-semibold text-gray-900 flex-1 min-w-0 line-clamp-2">
          {event.name}
        </h3>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge className={`text-xs font-medium border ${typeBadgeStyles[event.type]}`}>
            {event.type}
          </Badge>
          <Badge className={`text-xs font-medium border ${statusBadgeStyles[event.status]}`}>
            {event.status}
          </Badge>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 flex-shrink-0 text-gray-400" />
          <span>{event.startDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 flex-shrink-0 text-gray-400" />
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 flex-shrink-0 text-gray-400" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3">
        {/* Registration Progress */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-700">Registration</span>
            <span className="text-xs font-semibold text-gray-900">
              {event.registered} / {event.capacity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-metric-blue h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(registrationProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Revenue Progress */}
        {event.fundraisingGoal > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-gray-700">Revenue</span>
              <span className="text-xs font-semibold text-gray-900">
                ${event.revenue.toLocaleString()} / ${event.fundraisingGoal.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-sapling-light h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(revenueProgress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
