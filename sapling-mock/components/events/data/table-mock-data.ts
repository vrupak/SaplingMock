import type { TableData, Seat } from "../types/table-types"

// Helper to generate seats for a table
const generateSeats = (capacity: number, filledCount: number): Seat[] => {
  const seats: Seat[] = []
  for (let i = 0; i < capacity; i++) {
    seats.push({
      id: `seat-${i}`,
      position: i,
      isOccupied: i < filledCount,
      guestName: i < filledCount ? `Guest ${i + 1}` : undefined,
      guestId: i < filledCount ? `guest-${i}` : undefined,
    })
  }
  return seats
}

export const sampleTables: TableData[] = [
  // Row 1 - Named Tables (Platinum/Gold)
  {
    id: "table-1",
    name: "Jennifer Lee",
    shape: "round",
    level: "Platinum",
    capacity: 10,
    seats: generateSeats(10, 5),
    position: { x: 180, y: 100 },
  },
  {
    id: "table-2",
    name: "Michael Chen",
    shape: "round",
    level: "Platinum",
    capacity: 10,
    seats: generateSeats(10, 8),
    position: { x: 370, y: 100 },
  },
  {
    id: "table-3",
    name: "Sarah Williams",
    shape: "round",
    level: "Gold",
    capacity: 10,
    seats: generateSeats(10, 10),
    position: { x: 560, y: 100 },
  },

  // Row 2 - Numbered Tables (Silver/Bronze)
  {
    id: "table-4",
    name: "Table 4",
    shape: "round",
    level: "Silver",
    capacity: 8,
    seats: generateSeats(8, 6),
    position: { x: 180, y: 290 },
  },
  {
    id: "table-5",
    name: "Table 5",
    shape: "round",
    level: "Silver",
    capacity: 8,
    seats: generateSeats(8, 8),
    position: { x: 370, y: 290 },
  },
  {
    id: "table-6",
    name: "Table 6",
    shape: "round",
    level: "Bronze",
    capacity: 8,
    seats: generateSeats(8, 4),
    position: { x: 560, y: 290 },
  },
  {
    id: "table-7",
    name: "Table 7",
    shape: "round",
    level: null,
    capacity: 8,
    seats: generateSeats(8, 0),
    position: { x: 750, y: 290 },
  },

  // Row 3 - More Tables
  {
    id: "table-8",
    name: "Table 8",
    shape: "round",
    level: "Bronze",
    capacity: 8,
    seats: generateSeats(8, 3),
    position: { x: 180, y: 480 },
  },
  {
    id: "table-9",
    name: "Table 9",
    shape: "round",
    level: "Silver",
    capacity: 8,
    seats: generateSeats(8, 7),
    position: { x: 370, y: 480 },
  },
  {
    id: "table-10",
    name: "Table 10",
    shape: "round",
    level: "Gold",
    capacity: 8,
    seats: generateSeats(8, 8),
    position: { x: 560, y: 480 },
  },
  {
    id: "table-11",
    name: "Table 11",
    shape: "round",
    level: "Silver",
    capacity: 8,
    seats: generateSeats(8, 5),
    position: { x: 750, y: 480 },
  },

  // Row 4 - Special Tables (Rectangular)
  {
    id: "table-12",
    name: "Sponsors Table",
    shape: "rectangular",
    level: "Diamond",
    capacity: 12,
    seats: generateSeats(12, 12),
    position: { x: 180, y: 670 },
  },
  {
    id: "table-13",
    name: "Staff Table",
    shape: "rectangular",
    level: null,
    capacity: 12,
    seats: generateSeats(12, 9),
    position: { x: 560, y: 670 },
  },
]

// Calculate metrics from tables
export const calculateSeatingMetrics = (tables: TableData[]) => {
  const totalTables = tables.length
  const totalSeats = tables.reduce((sum, t) => sum + t.capacity, 0)
  const seatsFilled = tables.reduce(
    (sum, t) => sum + t.seats.filter((s) => s.isOccupied).length,
    0
  )
  const seatsOpen = totalSeats - seatsFilled

  return {
    totalTables,
    totalSeats,
    seatsFilled,
    seatsOpen,
  }
}
