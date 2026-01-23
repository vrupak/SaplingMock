"use client"

export type TableLevel = "Diamond" | "Platinum" | "Gold" | "Silver" | "Bronze" | null

export type TableShape = "round" | "rectangular" | "oval" | "square"

export interface Seat {
  id: string
  position: number // Position around the table (0-11 for round, etc.)
  isOccupied: boolean
  guestName?: string
  guestId?: string
}

export interface TableData {
  id: string
  name: string
  shape: TableShape
  level: TableLevel
  capacity: number
  seats: Seat[]
  position: { x: number; y: number }
}

export interface SeatingMetrics {
  totalTables: number
  totalSeats: number
  seatsFilled: number
  seatsOpen: number
}

// Color mapping for table levels
export const levelColors: Record<NonNullable<TableLevel> | "default", { bg: string; text: string; border: string }> = {
  Diamond: { bg: "bg-teal-100", text: "text-teal-600", border: "border-teal-300" },
  Platinum: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-300" },
  Gold: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-300" },
  Silver: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" },
  Bronze: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-300" },
  default: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" },
}

// Background colors for the table circles based on occupancy
export const getTableBackgroundColor = (filled: number, capacity: number): string => {
  const percentage = capacity > 0 ? filled / capacity : 0
  if (percentage === 0) return "bg-gray-100" // Empty
  if (percentage < 0.5) return "bg-yellow-100" // Less than half
  if (percentage < 1) return "bg-blue-100" // More than half
  return "bg-green-200" // Full
}

// Table dimensions for constraint calculations
export const TABLE_DIMENSIONS = {
  round: { width: 160, height: 160 },
  rectangular: { width: 200, height: 160 },
  oval: { width: 180, height: 140 },
  square: { width: 160, height: 160 },
} as const
