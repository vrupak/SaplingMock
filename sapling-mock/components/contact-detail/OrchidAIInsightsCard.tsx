"use client"

import { Sparkles } from "lucide-react"

interface OrchidInsight {
  text: string
  color: "green" | "blue" | "amber"
}

interface OrchidAIInsightsCardProps {
  insights?: OrchidInsight[]
  assignedContact?: string
  asks?: string
  pledges?: string
  fulfilled?: string
  outstanding?: string
}

const colorMap = {
  green: "bg-sapling",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
}

const defaultInsights: OrchidInsight[] = [
  { text: "Consistent quarterly donor", color: "green" },
  { text: "Year-end outreach recommended", color: "blue" },
  { text: "94% retention probability", color: "amber" },
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
    <div className="w-72 flex-shrink-0">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-sapling" />
        <h3 className="text-lg font-semibold text-sapling">Orchid AI Insight</h3>
      </div>

      <ul className="space-y-2 text-sm">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className={`w-2 h-2 rounded-full ${colorMap[insight.color]} mt-1.5 flex-shrink-0`} />
            <span className="text-gray-700">{insight.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-0.5">Major Gifts Assigned Contact</p>
          <p className="text-base font-semibold text-gray-900">{assignedContact}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Asks</p>
            <p className="text-base font-semibold text-sapling">{asks}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Pledges</p>
            <p className="text-base font-semibold text-sapling">{pledges}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Fulfilled</p>
            <p className="text-base font-semibold text-sapling">{fulfilled}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Outstanding</p>
            <p className="text-base font-semibold text-sapling">{outstanding}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
