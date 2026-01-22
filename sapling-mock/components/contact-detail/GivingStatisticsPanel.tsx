"use client"

import type { GivingStats } from "./types"

interface GivingStatisticsPanelProps {
  stats: GivingStats
}

function StatItem({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-0.5">{label}</p>
      <p className={`text-lg font-semibold ${highlight ? "text-sapling" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  )
}

export function GivingStatisticsPanel({ stats }: GivingStatisticsPanelProps) {
  return (
    <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Current Year Giving */}
      <div className="pr-12 border-r border-gray-200">
        <h3 className="text-lg font-semibold text-sapling-dark mb-5">Current Year Giving</h3>
        <div className="space-y-4">
          <StatItem label="Last Gift Amount" value={stats.currentYear.lastGiftAmount} highlight />
          <StatItem label="Last Gift Date" value={stats.currentYear.lastGiftDate} />
          <StatItem label="Year to Date Giving" value={stats.currentYear.yearToDateGiving} highlight />
          <StatItem label="# of Gifts this Year" value={stats.currentYear.numberOfGifts} />
          <StatItem label="Giving this Month" value={stats.currentYear.givingThisMonth} highlight />
        </div>
      </div>

      {/* Lifetime Giving */}
      <div className="pr-12 border-r border-gray-200">
        <h3 className="text-lg font-semibold text-sapling-dark mb-5">Lifetime Giving</h3>
        <div className="space-y-4">
          <StatItem label="Life to Date Giving" value={stats.lifetime.lifeToDateGiving} highlight />
          <StatItem label="Best Gift Year Amount" value={stats.lifetime.bestGiftYearAmount} highlight />
          <StatItem label="Best Gift Year Year" value={stats.lifetime.bestGiftYearYear} />
          <StatItem label="Largest Gift Amount" value={stats.lifetime.largestGiftAmount} highlight />
          <StatItem label="Largest Gift Date" value={stats.lifetime.largestGiftDate} />
        </div>
      </div>
    </div>
  )
}
