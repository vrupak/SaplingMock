"use client"

import { Menu, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GiftCard, type GiftData } from "./GiftCard"

const sampleGifts: GiftData[] = [
  {
    id: "g1",
    amount: "$500.00",
    donorName: "Jennifer Lee",
    status: "Received",
    isRecurring: true,
    paymentMethod: "Credit Card",
    source: "Organic",
    fund: "General Fund",
    receiptType: "Tax Deductible",
    date: "November 6, 2024",
    time: "14:30:00",
    lastEditedBy: "Alex Russo",
    lastEditedDate: "November 5, 2024 at 14:30:00",
    passthrough: null,
    campaign: "Annual Fund 2024",
    segment: "Monthly-Recurring-2024",
    tributes: undefined,
    taxDeductible: "$500.00",
    nonTaxDeductible: "$0.00",
    receipted: "November 6, 2024",
    restrictions: "Unrestricted",
    notes: "Monthly recurring gift",
    bgColor: "white",
  },
  {
    id: "g-daf-1",
    amount: "$10,000.00",
    donorName: "The Jennifer Lee Charitable Fund",
    status: "Received",
    isRecurring: false,
    paymentMethod: "DAF Check",
    source: "Foundations",
    fund: "Capital Campaign",
    receiptType: "DAF",
    date: "September 14, 2024",
    time: "11:20:00",
    lastEditedBy: "System Admin",
    lastEditedDate: "September 14, 2024 at 11:20:00",
    passthrough: { name: "Fidelity Charitable", id: "1041" },
    campaign: undefined,
    segment: undefined,
    tributes: undefined,
    taxDeductible: "$10,000.00",
    nonTaxDeductible: "$0.00",
    receipted: "September 15, 2024",
    restrictions: "Unrestricted",
    notes: "DAF distribution from The Jennifer Lee Charitable Fund via Fidelity Charitable",
    bgColor: "white",
  },
  {
    id: "g-daf-2",
    amount: "$5,000.00",
    donorName: "The Jennifer Lee Charitable Fund",
    status: "Received",
    isRecurring: false,
    paymentMethod: "DAF Wire",
    source: "Foundations",
    fund: "Scholarship Fund",
    receiptType: "DAF",
    date: "June 9, 2024",
    time: "09:45:00",
    lastEditedBy: "System Admin",
    lastEditedDate: "June 9, 2024 at 09:45:00",
    passthrough: { name: "Fidelity Charitable", id: "1041" },
    campaign: undefined,
    segment: undefined,
    tributes: undefined,
    taxDeductible: "$5,000.00",
    nonTaxDeductible: "$0.00",
    receipted: "June 9, 2024",
    restrictions: "Unrestricted",
    notes: "DAF grant from The Jennifer Lee Charitable Fund through Fidelity Charitable",
    bgColor: "gray",
  },
  {
    id: "g-daf-3",
    amount: "$7,500.00",
    donorName: "The Jennifer Lee Charitable Fund",
    status: "Received",
    isRecurring: false,
    paymentMethod: "DAF Check",
    source: "Foundations",
    fund: "General Fund",
    receiptType: "DAF",
    date: "March 19, 2024",
    time: "10:15:00",
    lastEditedBy: "System Admin",
    lastEditedDate: "March 19, 2024 at 10:15:00",
    passthrough: { name: "Fidelity Charitable", id: "1041" },
    campaign: undefined,
    segment: undefined,
    tributes: undefined,
    taxDeductible: "$7,500.00",
    nonTaxDeductible: "$0.00",
    receipted: "March 20, 2024",
    restrictions: "Unrestricted",
    notes: "Quarterly DAF distribution from The Jennifer Lee Charitable Fund",
    bgColor: "white",
  },
]

interface YearSummary {
  year: string
  amount: string
  variant: "default" | "amber" | "green"
}

const yearSummaries: YearSummary[] = [
  { year: "Lifetime", amount: "$101,600.00", variant: "default" },
  { year: "2025", amount: "$500.00", variant: "amber" },
  { year: "2024", amount: "$99,100.00", variant: "amber" },
  { year: "2023", amount: "$2,000.00", variant: "green" },
  { year: "2022", amount: "$0.00", variant: "default" },
  { year: "2021", amount: "$0.00", variant: "default" },
]

function YearSummaryCard({ year, amount, variant }: YearSummary) {
  const variantClasses = {
    default: "bg-white border-gray-200 text-gray-900",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    green: "bg-sapling-light/10 border-sapling-light/30 text-sapling",
  }

  return (
    <div className={`border rounded-lg px-5 py-3 min-w-[120px] ${variantClasses[variant]}`}>
      <p className="text-xs text-gray-500 mb-1">{year}</p>
      <p className="text-xl font-bold">{amount}</p>
    </div>
  )
}

export function GiftsTab() {
  return (
    <>
      {/* Year Summary Cards */}
      <div className="flex items-center gap-4 mb-6">
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <Menu className="w-5 h-5 text-gray-500" />
        </button>
        <div className="flex gap-3 flex-1">
          {yearSummaries.map((summary, idx) => (
            <YearSummaryCard key={idx} {...summary} />
          ))}
          <div className="bg-sapling-light/10 border border-sapling-light/30 rounded-lg px-5 py-3 min-w-[100px]">
            <p className="text-xs text-gray-500 mb-1">Total Gifts</p>
            <p className="text-xl font-bold text-sapling">29</p>
          </div>
        </div>
      </div>

      {/* Gift Activity Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Gift Activity</h3>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            FILTER
          </Button>
          <Button className="gap-2 bg-sapling hover:bg-sapling-dark text-white">
            <Plus className="w-4 h-4" />
            ADD GIFT
          </Button>
        </div>
      </div>

      {/* Gift Cards */}
      <div className="space-y-4">
        {sampleGifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </>
  )
}
