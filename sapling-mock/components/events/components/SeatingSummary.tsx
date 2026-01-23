"use client"

import { Users } from "lucide-react"
import type { SeatingMetrics } from "../types/table-types"

interface SeatingSummaryProps {
  metrics: SeatingMetrics
}

export function SeatingSummary({ metrics }: SeatingSummaryProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {/* Total Tables - Blue */}
      <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5 transition-all hover:shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 bg-white rounded-lg shadow-sm">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            Setup
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-blue-600">
            {metrics.totalTables}
          </span>
        </div>
        <p className="text-sm text-blue-600 font-medium">Total Tables</p>
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

      {/* Seats Open - Green (Available) */}
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 transition-all hover:shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 bg-white rounded-lg shadow-sm">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
            Available
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-emerald-600">
            {metrics.seatsOpen}
          </span>
        </div>
        <p className="text-sm text-emerald-600 font-medium">Seats Open</p>
      </div>
    </div>
  )
}
