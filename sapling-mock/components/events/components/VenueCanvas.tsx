"use client"

import { MapPin, Trash2, Users } from "lucide-react"
import type { TableData } from "../types/table-types"
import { levelColors, getTableBackgroundColor } from "../types/table-types"

interface VenueCanvasProps {
  tables: TableData[]
  onTableClick?: (table: TableData) => void
}

interface TableComponentProps {
  table: TableData
  onClick?: () => void
}

// Individual seat component
function SeatIndicator({ isOccupied, angle, distance }: { isOccupied: boolean; angle: number; distance: number }) {
  const x = Math.cos(angle) * distance
  const y = Math.sin(angle) * distance

  return (
    <div
      className={`absolute w-4 h-4 rounded-sm transform -translate-x-1/2 -translate-y-1/2 border ${
        isOccupied
          ? "bg-blue-500 border-blue-600"
          : "bg-gray-200 border-gray-300"
      }`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
    />
  )
}

// Round table component
function RoundTable({ table, onClick }: TableComponentProps) {
  const filledCount = table.seats.filter((s) => s.isOccupied).length
  const levelColor = levelColors[table.level ?? "default"]
  const bgColor = getTableBackgroundColor(filledCount, table.capacity)

  // Calculate seat positions around the circle
  const seatAngles = table.seats.map((_, i) => (i / table.capacity) * 2 * Math.PI - Math.PI / 2)
  const seatDistance = 65 // Distance from center to seats

  return (
    <div
      className="absolute cursor-pointer group"
      style={{
        left: table.position.x,
        top: table.position.y,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}
    >
      {/* Seats around the table */}
      <div className="relative w-[140px] h-[140px]">
        {table.seats.map((seat, i) => (
          <SeatIndicator
            key={seat.id}
            isOccupied={seat.isOccupied}
            angle={seatAngles[i]}
            distance={seatDistance}
          />
        ))}

        {/* Table circle */}
        <div
          className={`absolute inset-4 rounded-full ${bgColor} border-2 border-gray-300 flex flex-col items-center justify-center transition-shadow group-hover:shadow-lg`}
        >
          {/* Table name */}
          <span className="text-xs font-semibold text-gray-800 text-center px-2 leading-tight">
            {table.name}
          </span>

          {/* Level badge */}
          {table.level ? (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 ${levelColor.bg} ${levelColor.text}`}
            >
              {table.level}
            </span>
          ) : (
            <button className="text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 text-orange-600 hover:bg-orange-50">
              + Add Level
            </button>
          )}

          {/* Occupancy */}
          <span className="text-xs text-gray-600 mt-1">
            {filledCount}/{table.capacity}
          </span>

          {/* Action icons */}
          <div className="flex items-center gap-1 mt-1">
            <button className="p-0.5 text-red-400 hover:text-red-600 transition-colors">
              <Trash2 className="w-3 h-3" />
            </button>
            <button className="p-0.5 text-orange-400 hover:text-orange-600 transition-colors">
              <Users className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Rectangular table component
function RectangularTable({ table, onClick }: TableComponentProps) {
  const filledCount = table.seats.filter((s) => s.isOccupied).length
  const levelColor = levelColors[table.level ?? "default"]
  const bgColor = getTableBackgroundColor(filledCount, table.capacity)

  // Calculate seat positions for rectangular table
  // Top row, bottom row, and side seats
  const topSeats = Math.ceil(table.capacity / 3)
  const bottomSeats = Math.ceil(table.capacity / 3)
  const leftSeats = Math.floor((table.capacity - topSeats - bottomSeats) / 2)
  const rightSeats = table.capacity - topSeats - bottomSeats - leftSeats

  return (
    <div
      className="absolute cursor-pointer group"
      style={{
        left: table.position.x,
        top: table.position.y,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}
    >
      <div className="relative w-[180px] h-[140px]">
        {/* Top seats */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex gap-2">
          {Array.from({ length: topSeats }).map((_, i) => (
            <div
              key={`top-${i}`}
              className={`w-4 h-4 rounded-sm border ${
                table.seats[i]?.isOccupied
                  ? "bg-blue-500 border-blue-600"
                  : "bg-gray-200 border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Left seats */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          {Array.from({ length: leftSeats }).map((_, i) => (
            <div
              key={`left-${i}`}
              className={`w-4 h-4 rounded-sm border ${
                table.seats[topSeats + i]?.isOccupied
                  ? "bg-blue-500 border-blue-600"
                  : "bg-gray-200 border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Right seats */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          {Array.from({ length: rightSeats }).map((_, i) => (
            <div
              key={`right-${i}`}
              className={`w-4 h-4 rounded-sm border ${
                table.seats[topSeats + leftSeats + i]?.isOccupied
                  ? "bg-blue-500 border-blue-600"
                  : "bg-gray-200 border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Bottom seats */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
          {Array.from({ length: bottomSeats }).map((_, i) => (
            <div
              key={`bottom-${i}`}
              className={`w-4 h-4 rounded-sm border ${
                table.seats[topSeats + leftSeats + rightSeats + i]?.isOccupied
                  ? "bg-blue-500 border-blue-600"
                  : "bg-gray-200 border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Table rectangle */}
        <div
          className={`absolute inset-5 rounded-lg ${bgColor} border-2 border-gray-300 flex flex-col items-center justify-center transition-shadow group-hover:shadow-lg`}
        >
          {/* Table name */}
          <span className="text-xs font-semibold text-gray-800 text-center px-2 leading-tight">
            {table.name}
          </span>

          {/* Level badge */}
          {table.level ? (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 ${levelColor.bg} ${levelColor.text}`}
            >
              {table.level}
            </span>
          ) : (
            <button className="text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 text-orange-600 hover:bg-orange-50">
              + Add Level
            </button>
          )}

          {/* Occupancy */}
          <span className="text-xs text-gray-600 mt-1">
            {filledCount}/{table.capacity}
          </span>

          {/* Action icons */}
          <div className="flex items-center gap-1 mt-1">
            <button className="p-0.5 text-red-400 hover:text-red-600 transition-colors">
              <Trash2 className="w-3 h-3" />
            </button>
            <button className="p-0.5 text-orange-400 hover:text-orange-600 transition-colors">
              <Users className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function VenueCanvas({ tables, onTableClick }: VenueCanvasProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Canvas Header */}
      <div className="flex items-center justify-center gap-2 py-3 border-b border-dashed border-gray-300 text-gray-500 text-sm">
        <MapPin className="w-4 h-4" />
        <span>Drag tables to arrange your venue layout</span>
      </div>

      {/* Canvas Area */}
      <div className="flex justify-center bg-white py-8">
        <div className="relative" style={{ width: "900px", height: "850px" }}>
          {tables.map((table) =>
            table.shape === "round" ? (
              <RoundTable
                key={table.id}
                table={table}
                onClick={() => onTableClick?.(table)}
              />
            ) : (
              <RectangularTable
                key={table.id}
                table={table}
                onClick={() => onTableClick?.(table)}
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
