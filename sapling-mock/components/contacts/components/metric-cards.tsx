"use client"

import React from "react"
import { Users, Home, Building2, Landmark, Star, Handshake, Eye, UserPlus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

function HoverStat({
  number,
  label,
  numberClassName = "text-gray-900",
  hasHover = true
}: {
  number: string
  label: string
  numberClassName?: string
  hasHover?: boolean
}) {
  return (
    <div className={`text-center ${hasHover ? 'group/stat cursor-default' : ''}`}>
      <p className={`text-2xl font-bold ${numberClassName} ${hasHover ? 'transition-transform duration-200 ease-out group-hover/stat:scale-110 inline-block origin-bottom' : ''}`}>
        {number}
      </p>
      <p className={`text-sm text-gray-500 leading-tight mt-0.5 ${hasHover ? 'transition-transform duration-200 ease-out group-hover/stat:scale-105 origin-top' : ''}`}>
        {label}
      </p>
    </div>
  )
}

// Small card - for single stat items (Total Contacts, New in 2025, Sponsors, Prospects)
function SmallCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border border-gray-200 flex-1 min-w-[140px] py-0 transition-shadow duration-200 hover:shadow-md">
      <CardContent className="px-4 py-3">
        {children}
      </CardContent>
    </Card>
  )
}

// Wide card - for triple stat items (Donor Types, Financial Partners, Donor Classes, Donor Status)
function WideCard({
  title,
  icon,
  children
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Card className="border border-gray-200 flex-[2] min-w-[280px] py-0 transition-shadow duration-200 hover:shadow-md">
      <CardContent className="px-4 py-3 h-full flex flex-col">
        {/* Header section - approximately 25% */}
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        {/* Content section - approximately 75%, centered */}
        <div className="flex-1 flex items-center justify-center pt-1">
          <div className="flex justify-between w-full px-2">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MetricCards() {
  return (
    <div className="space-y-4 mb-6">
      {/* Row 1: Total Contacts | Donor Types | Financial Partners | New in 2025 */}
      <div className="flex flex-wrap gap-4">
        {/* Total Contacts - Small Card */}
        <SmallCard>
          <div className="flex flex-col items-center text-center">
            <Users className="w-7 h-7 text-gray-500 mb-1.5" />
            <p className="text-3xl font-bold text-gray-900">8,247</p>
            <p className="text-sm text-gray-500 mt-0.5">Total Contacts</p>
          </div>
        </SmallCard>

        {/* Donor Types - Wide Card */}
        <WideCard title="Donor Types" icon={<Home className="w-5 h-5 text-sapling" />}>
          <HoverStat number="4,523" label="Household" numberClassName="text-sapling" />
          <HoverStat number="1,892" label="Foundation" numberClassName="text-metric-blue" />
          <HoverStat number="1,345" label="Business/Org" numberClassName="text-gray-600" />
        </WideCard>

        {/* Financial Partners - Wide Card */}
        <WideCard title="Financial Partners" icon={<Landmark className="w-5 h-5 text-sapling" />}>
          <HoverStat number="12" label="Banks" numberClassName="text-metric-grey" />
          <HoverStat number="8" label="Community Foundations" numberClassName="text-metric-blue" />
          <HoverStat number="15" label="Corporate Providers" numberClassName="text-sapling" />
        </WideCard>

        {/* New in 2025 - Small Card */}
        <SmallCard>
          <div className="flex flex-col items-center text-center group/stat cursor-default">
            <UserPlus className="w-7 h-7 text-metric-orange mb-1.5" />
            <p className="text-3xl font-bold text-metric-orange transition-transform duration-200 ease-out group-hover/stat:scale-110 inline-block origin-bottom">1,247</p>
            <p className="text-sm text-gray-500 mt-0.5 transition-transform duration-200 ease-out group-hover/stat:scale-105 origin-top">New in 2025</p>
          </div>
        </SmallCard>
      </div>

      {/* Row 2: Donor Classes | Sponsors | Prospects | Donor Status */}
      <div className="flex flex-wrap gap-4">
        {/* Donor Classes - Wide Card */}
        <WideCard title="Donor Classes" icon={<Star className="w-5 h-5 text-amber-500" />}>
          <HoverStat number="2,341" label="Major" numberClassName="text-sapling" />
          <HoverStat number="3,876" label="Middle" numberClassName="text-sapling" />
          <HoverStat number="2,030" label="Minor" numberClassName="text-sapling" />
        </WideCard>

        {/* Sponsors - Small Card */}
        <SmallCard>
          <div className="flex flex-col items-center text-center">
            <Handshake className="w-7 h-7 text-sapling mb-1.5" />
            <p className="text-3xl font-bold text-gray-900">487</p>
            <p className="text-sm text-gray-500 mt-0.5">Sponsors</p>
          </div>
        </SmallCard>

        {/* Prospects - Small Card */}
        <SmallCard>
          <div className="flex flex-col items-center text-center">
            <Eye className="w-7 h-7 text-blue-900 mb-1.5" />
            <p className="text-3xl font-bold text-gray-900">892</p>
            <p className="text-sm text-gray-500 mt-0.5">Prospects</p>
          </div>
        </SmallCard>

        {/* Donor Status - Wide Card */}
        <WideCard title="Donor Status" icon={<Users className="w-5 h-5 text-sapling" />}>
          <HoverStat number="4,982" label="Active" numberClassName="text-sapling" />
          <HoverStat number="1,834" label="Prelapsed" numberClassName="text-metric-amber" />
          <HoverStat number="1,431" label="Lapsed" numberClassName="text-status-lapsed" />
        </WideCard>
      </div>
    </div>
  )
}

// Remove SecondaryMetricCards since we combined them
export function SecondaryMetricCards() {
  return null
}
