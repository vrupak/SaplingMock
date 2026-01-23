"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { SeatingRow, SeatingRowSeat } from "../data/seating-mock-data"

interface VisualSeatingChartProps {
  rows: SeatingRow[]
  onSeatClick?: (seat: SeatingRowSeat, row: SeatingRow) => void
}

interface SeatProps {
  seat: SeatingRowSeat
  row: SeatingRow
  onSeatClick?: (seat: SeatingRowSeat, row: SeatingRow) => void
}

function Seat({ seat, row, onSeatClick }: SeatProps) {
  const seatElement = (
    <button
      onClick={() => onSeatClick?.(seat, row)}
      className={`
        w-6 h-6 rounded-sm transition-all duration-200
        ${
          seat.isOccupied
            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            : "bg-slate-200 hover:bg-slate-300 cursor-pointer"
        }
      `}
      aria-label={`Seat ${seat.seatNumber} - ${seat.isOccupied ? "Occupied" : "Available"}`}
    />
  )

  // Only show tooltip for occupied seats
  if (seat.isOccupied) {
    return (
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{seatElement}</TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg"
        >
          <div className="text-center">
            <p className="font-semibold text-sm">Seat {seat.seatNumber}</p>
            <p className="text-slate-300 text-xs">{seat.guestName}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  return seatElement
}

interface SeatingRowComponentProps {
  row: SeatingRow
  onSeatClick?: (seat: SeatingRowSeat, row: SeatingRow) => void
}

function SeatingRowComponent({ row, onSeatClick }: SeatingRowComponentProps) {
  const filledSeats = row.seats.filter((s) => s.isOccupied).length
  const totalSeats = row.seats.length

  return (
    <div className="flex items-center gap-4 py-3">
      {/* Row Letter Badge */}
      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-xl flex-shrink-0">
        {row.letter}
      </div>

      {/* Middle Section - Two rows: info on top, seats below */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Row Info - Top */}
        <div className="flex items-center gap-3">
          <span className="text-slate-700 font-medium">
            {row.name} - {row.location}
          </span>
          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-xs font-medium rounded">
            {row.category}
          </span>
        </div>

        {/* Seats Container - Bottom */}
        <div className="flex flex-wrap gap-1.5">
          {row.seats.map((seat) => (
            <Seat key={seat.id} seat={seat} row={row} onSeatClick={onSeatClick} />
          ))}
        </div>
      </div>

      {/* Seat Count - Right aligned */}
      <div className="text-slate-400 text-sm whitespace-nowrap flex-shrink-0 min-w-[80px] text-right">
        {filledSeats} / {totalSeats} seats
      </div>
    </div>
  )
}

export function VisualSeatingChart({ rows, onSeatClick }: VisualSeatingChartProps) {
  return (
    <TooltipProvider>
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Visual Seating Chart</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-blue-500" />
              <span className="text-sm text-slate-600">Filled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-slate-200" />
              <span className="text-sm text-slate-600">Available</span>
            </div>
          </div>
        </div>

        {/* Stage Indicator */}
        <div className="flex justify-center mb-8">
          <div className="px-8 py-2.5 bg-slate-800 text-white text-sm font-semibold uppercase tracking-wider rounded-full">
            Stage
          </div>
        </div>

        {/* Seating Rows */}
        <div className="space-y-1">
          {rows.map((row) => (
            <SeatingRowComponent key={row.id} row={row} onSeatClick={onSeatClick} />
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
