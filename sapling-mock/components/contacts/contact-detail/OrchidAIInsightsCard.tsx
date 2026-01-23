"use client"

import { Flower2 } from "lucide-react"

interface OrchidInsight {
  text: string
}

interface OrchidAIInsightsCardProps {
  insights?: OrchidInsight[]
  assignedContact?: string
  asks?: string
  pledges?: string
  fulfilled?: string
  outstanding?: string
}

// Dynamic bullet colors: Item 1 (green), Item 2 (blue), Item 3 (orange)
const bulletColors = ["bg-green-500", "bg-blue-500", "bg-orange-500"]

const defaultInsights: OrchidInsight[] = [
  { text: "Consistent quarterly donor" },
  { text: "Year-end outreach recommended" },
  { text: "94% retention probability" },
]

export function OrchidAIInsightsCard({
  insights = defaultInsights,
  assignedContact = "Alex Russo",
  asks = "$5,000.00",
  pledges = "$2,500.00",
  fulfilled = "$7,000.00",
  outstanding = "$500.00",
}: OrchidAIInsightsCardProps) {
  return (
    <div className="col-span-3 px-8 pb-8">
      <div className="flex items-center gap-2 mb-4">
        <Flower2 className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-sapling-dark">Orchid AI Insight</h3>
      </div>

      <ul className="space-y-2 text-sm">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className={`w-2 h-2 rounded-full ${bulletColors[idx] || "bg-gray-400"} mt-1.5 flex-shrink-0`} />
            <span className="text-gray-700">{insight.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-4">
        <div>
          <p className="text-xs text-slate-400 font-normal mb-0.5">Major Gifts Assigned Contact</p>
          <p className="text-base font-semibold text-slate-900">{assignedContact}</p>
        </div>

        {/* 2x2 Grid for Asks/Pledges/Fulfilled/Outstanding */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-xs text-slate-400 font-normal mb-0.5">Asks</p>
            <p className="text-base font-medium text-slate-700">{asks}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-normal mb-0.5">Pledges</p>
            <p className="text-base font-medium text-slate-700">{pledges}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-normal mb-0.5">Fulfilled</p>
            <p className="text-base font-medium text-slate-700">{fulfilled}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-normal mb-0.5">Outstanding</p>
            <p className="text-base font-medium text-slate-700">{outstanding}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
