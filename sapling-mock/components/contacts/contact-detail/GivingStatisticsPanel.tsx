"use client"

import type { GivingStats } from "./types"

interface GivingStatisticsPanelProps {
  stats: GivingStats
}

function StatItem({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-normal mb-0.5">{label}</p>
      <p className={`text-lg font-medium ${highlight ? "text-sapling" : "text-slate-900"}`}>
        {value}
      </p>
    </div>
  )
}

export function GivingStatisticsPanel({ stats }: GivingStatisticsPanelProps) {
  return (
    <>
      {/* Current Year Giving - col-span-2 with right border */}
      <div className="col-span-2 px-8 pb-8 border-r border-slate-100">
        <h3 className="text-lg font-semibold text-sapling-dark mb-5">Current Year Giving</h3>
        <div className="space-y-4">
          <StatItem label="Last Gift Amount" value={stats.currentYear.lastGiftAmount} highlight />
          <StatItem label="Last Gift Date" value={stats.currentYear.lastGiftDate} />
          <StatItem label="Year to Date Giving" value={stats.currentYear.yearToDateGiving} highlight />
          <StatItem label="# of Gifts this Year" value={stats.currentYear.numberOfGifts} />
          <StatItem label="Giving this Month" value={stats.currentYear.givingThisMonth} highlight />
        </div>
      </div>

      {/* Lifetime Giving - col-span-2 with right border */}
      <div className="col-span-2 px-8 pb-8 border-r border-slate-100">
        <h3 className="text-lg font-semibold text-sapling-dark mb-5">Lifetime Giving</h3>
        <div className="space-y-4">
          <StatItem label="Life to Date Giving" value={stats.lifetime.lifeToDateGiving} highlight />
          <StatItem label="Best Gift Year Amount" value={stats.lifetime.bestGiftYearAmount} highlight />
          <StatItem label="Best Gift Year Year" value={stats.lifetime.bestGiftYearYear} />
          <StatItem label="Largest Gift Amount" value={stats.lifetime.largestGiftAmount} highlight />
          <StatItem label="Largest Gift Date" value={stats.lifetime.largestGiftDate} />
        </div>
      </div>
    </>
  )
}
