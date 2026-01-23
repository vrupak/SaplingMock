"use client"

import { Users } from "lucide-react"
import type { VisualSeatingMetrics } from "../data/seating-mock-data"

interface SeatingMetricCardsProps {
  metrics: VisualSeatingMetrics
}

export function SeatingMetricCards({ metrics }: SeatingMetricCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {/* Total Rows - Blue */}
      <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5 transition-all hover:shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 bg-white rounded-lg shadow-sm">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            Rows
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-blue-600">
            {metrics.totalRows}
          </span>
        </div>
        <p className="text-sm text-blue-600 font-medium">Total Rows</p>
      </div>

      {/* Total Seats - Green */}
      <div className="bg-green-50/60 border border-green-200 rounded-xl p-5 transition-all hover:shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 bg-white rounded-lg shadow-sm">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
            Capacity
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-green-600">
            {metrics.totalSeats}
          </span>
        </div>
        <p className="text-sm text-green-600 font-medium">Total Seats</p>
      </div>

      {/* Seats Filled - Purple */}
      <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-5 transition-all hover:shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 bg-white rounded-lg shadow-sm">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
            Assigned
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-purple-600">
            {metrics.seatsFilled}
          </span>
        </div>
        <p className="text-sm text-purple-600 font-medium">Seats Filled</p>
      </div>

      {/* Seats Available - Amber/Gold */}
      <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 transition-all hover:shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 bg-white rounded-lg shadow-sm">
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
            Available
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-amber-600">
            {metrics.seatsAvailable}
          </span>
        </div>
        <p className="text-sm text-amber-600 font-medium">Seats Available</p>
      </div>
    </div>
  )
}
