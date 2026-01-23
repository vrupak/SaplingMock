"use client"

export type SeatingCategory = "Orchestra" | "Balcony"

export interface SeatingRowSeat {
  id: string
  seatNumber: number
  isOccupied: boolean
  guestName?: string
  guestId?: string
}

export interface SeatingRow {
  id: string
  letter: string
  name: string
  location: string
  category: SeatingCategory
  seats: SeatingRowSeat[]
}

export interface VisualSeatingMetrics {
  totalRows: number
  totalSeats: number
  seatsFilled: number
  seatsAvailable: number
}

// Helper to generate seats for a row
const generateSeats = (
  rowLetter: string,
  count: number,
  filledIndices: number[] = []
): SeatingRowSeat[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${rowLetter}-${i + 1}`,
    seatNumber: i + 1,
    isOccupied: filledIndices.includes(i),
    guestName: filledIndices.includes(i) ? `Guest ${rowLetter}${i + 1}` : undefined,
    guestId: filledIndices.includes(i) ? `guest-${rowLetter.toLowerCase()}-${i + 1}` : undefined,
  }))
}

// Row configuration data
const rowConfigs: {
  letter: string
  name: string
  location: string
  category: SeatingCategory
  seatCount: number
  filledIndices: number[]
}[] = [
  { letter: "A", name: "Row A", location: "Front Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [4, 5, 8, 11, 12, 14] },
  { letter: "B", name: "Row B", location: "Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [6, 7, 10, 12] },
  { letter: "C", name: "Row C", location: "Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [5, 6, 8] },
  { letter: "D", name: "Row D", location: "Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [] },
  { letter: "E", name: "Row E", location: "Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [] },
  { letter: "F", name: "Row F", location: "Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [] },
  { letter: "G", name: "Row G", location: "Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [] },
  { letter: "H", name: "Row H", location: "Back Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [] },
  { letter: "I", name: "Row I", location: "Back Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [] },
  { letter: "J", name: "Row J", location: "Back Orchestra", category: "Orchestra", seatCount: 20, filledIndices: [] },
  { letter: "K", name: "Row K", location: "Front Balcony", category: "Balcony", seatCount: 15, filledIndices: [] },
  { letter: "L", name: "Row L", location: "Balcony", category: "Balcony", seatCount: 15, filledIndices: [] },
  { letter: "M", name: "Row M", location: "Balcony", category: "Balcony", seatCount: 15, filledIndices: [] },
  { letter: "N", name: "Row N", location: "Balcony", category: "Balcony", seatCount: 15, filledIndices: [] },
  { letter: "O", name: "Row O", location: "Back Balcony", category: "Balcony", seatCount: 15, filledIndices: [] },
]

// Generate sample seating rows
export const sampleSeatingRows: SeatingRow[] = rowConfigs.map((config) => ({
  id: `row-${config.letter.toLowerCase()}`,
  letter: config.letter,
  name: config.name,
  location: config.location,
  category: config.category,
  seats: generateSeats(config.letter, config.seatCount, config.filledIndices),
}))

// Calculate metrics from seating rows
export function calculateVisualSeatingMetrics(rows: SeatingRow[]): VisualSeatingMetrics {
  const totalRows = rows.length
  const totalSeats = rows.reduce((sum, row) => sum + row.seats.length, 0)
  const seatsFilled = rows.reduce(
    (sum, row) => sum + row.seats.filter((seat) => seat.isOccupied).length,
    0
  )
  const seatsAvailable = totalSeats - seatsFilled

  return {
    totalRows,
    totalSeats,
    seatsFilled,
    seatsAvailable,
  }
}
