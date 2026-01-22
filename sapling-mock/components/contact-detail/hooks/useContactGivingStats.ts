import { useMemo } from "react"
import type { GivingStats } from "../types"

export function useContactGivingStats(): GivingStats {
  return useMemo(() => ({
    currentYear: {
      lastGiftAmount: "$500.00",
      lastGiftDate: "October 31, 2024",
      yearToDateGiving: "$2,400.00",
      numberOfGifts: 5,
      givingThisMonth: "$500.00",
    },
    lifetime: {
      lifeToDateGiving: "$8,500.00",
      bestGiftYearAmount: "$3,000.00",
      bestGiftYearYear: "2023",
      largestGiftAmount: "$1,000.00",
      largestGiftDate: "December 14, 2023",
    },
  }), [])
}
