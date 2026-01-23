"use client"

import type { Event } from "./types"

interface EventOverviewProps {
  event: Event
}

export function EventOverview({ event }: EventOverviewProps) {
  const capacityPercentage = Math.round((event.registered / event.capacity) * 100)
  const goalPercentage = event.fundraisingGoal > 0
    ? Math.round((event.revenue / event.fundraisingGoal) * 100)
    : 0

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column - Event Details */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4">Event Details</h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Event Type */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600 bg-slate-50 px-2 py-0.5 rounded">Event Type</span>
            <span className="text-sm font-medium text-gray-900">{event.type}</span>
          </div>

          {/* Capacity */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600 bg-slate-50 px-2 py-0.5 rounded">Capacity</span>
            <span className="text-sm font-medium text-gray-900">{event.capacity} people</span>
          </div>

          {/* Registration Status */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600 bg-slate-50 px-2 py-0.5 rounded">Registration Status</span>
            <span className="text-sm font-medium text-gray-900">
              {event.status === "Completed" ? "Closed" : "Open"}
            </span>
          </div>

          {/* Fundraising Goal */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-gray-600 bg-slate-50 px-2 py-0.5 rounded">Fundraising Goal</span>
            <span className="text-sm font-medium text-gray-900">
              ${event.fundraisingGoal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column - Registration Progress */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4">Registration Progress</h3>
        <div className="space-y-6">
          {/* Capacity Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Capacity</span>
              <span className="text-sm font-medium text-gray-900">{capacityPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Goal Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Goal Progress</span>
              <span className="text-sm font-medium text-gray-900">{goalPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-sapling-light h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(goalPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
