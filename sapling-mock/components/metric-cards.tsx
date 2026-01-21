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
      <p className={`text-xs text-gray-500 leading-tight mt-0.5 ${hasHover ? 'transition-transform duration-200 ease-out group-hover/stat:scale-105 origin-top' : ''}`}>
        {label}
      </p>
    </div>
  )
}

// Small card - for single stat items (Total Contacts, New in 2025, Sponsors, Prospects)
function SmallCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border border-gray-200 flex-1 min-w-[140px]">
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  )
}

// Wide card - for triple stat items (Donor Types, Financial Partners, Donor Classes, Donor Status)
function WideCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border border-gray-200 flex-[2] min-w-[280px]">
      <CardContent className="p-4">
        {children}
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
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">8,247</p>
            <p className="text-xs text-gray-500 mt-0.5">Total Contacts</p>
          </div>
        </SmallCard>

        {/* Donor Types - Wide Card */}
        <WideCard>
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-4 h-4 text-sapling" />
            <span className="text-sm font-medium text-gray-700">Donor Types</span>
          </div>
          <div className="flex justify-between px-2">
            <HoverStat number="4,523" label="Household" numberClassName="text-sapling" />
            <HoverStat number="1,892" label="Foundation" numberClassName="text-metric-blue" />
            <HoverStat number="1,345" label="Business/Org" numberClassName="text-gray-900" hasHover={false} />
          </div>
        </WideCard>

        {/* Financial Partners - Wide Card */}
        <WideCard>
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="w-4 h-4 text-sapling" />
            <span className="text-sm font-medium text-gray-700">Financial Partners</span>
          </div>
          <div className="flex justify-between px-2">
            <HoverStat number="12" label="Banks" numberClassName="text-metric-grey" />
            <HoverStat number="8" label="Community Foundations" numberClassName="text-metric-blue" />
            <HoverStat number="15" label="Corporate Providers" numberClassName="text-sapling" />
          </div>
        </WideCard>

        {/* New in 2025 - Small Card */}
        <SmallCard>
          <div className="flex flex-col items-center text-center group/stat cursor-default">
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-2">
              <UserPlus className="w-5 h-5 text-metric-orange" />
            </div>
            <p className="text-3xl font-bold text-metric-orange transition-transform duration-200 ease-out group-hover/stat:scale-110 inline-block origin-bottom">1,247</p>
            <p className="text-xs text-gray-500 mt-0.5 transition-transform duration-200 ease-out group-hover/stat:scale-105 origin-top">New in 2025</p>
          </div>
        </SmallCard>
      </div>

      {/* Row 2: Donor Classes | Sponsors | Prospects | Donor Status */}
      <div className="flex flex-wrap gap-4">
        {/* Donor Classes - Wide Card */}
        <WideCard>
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Donor Classes</span>
          </div>
          <div className="flex justify-between px-2">
            <HoverStat number="2,341" label="Major" numberClassName="text-sapling" />
            <HoverStat number="3,876" label="Middle" numberClassName="text-sapling" />
            <HoverStat number="2,030" label="Minor" numberClassName="text-sapling" />
          </div>
        </WideCard>

        {/* Sponsors - Small Card */}
        <SmallCard>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-2">
              <Handshake className="w-5 h-5 text-sapling" />
            </div>
            <p className="text-3xl font-bold text-gray-900">487</p>
            <p className="text-xs text-gray-500 mt-0.5">Sponsors</p>
          </div>
        </SmallCard>

        {/* Prospects - Small Card */}
        <SmallCard>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
              <Eye className="w-5 h-5 text-blue-900" />
            </div>
            <p className="text-3xl font-bold text-gray-900">892</p>
            <p className="text-xs text-gray-500 mt-0.5">Prospects</p>
          </div>
        </SmallCard>

        {/* Donor Status - Wide Card */}
        <WideCard>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-sapling" />
            <span className="text-sm font-medium text-gray-700">Donor Status</span>
          </div>
          <div className="flex justify-between px-2">
            <HoverStat number="4,982" label="Active" numberClassName="text-sapling" />
            <HoverStat number="1,834" label="Prelapsed" numberClassName="text-metric-amber" />
            <HoverStat number="1,431" label="Lapsed" numberClassName="text-status-lapsed" />
          </div>
        </WideCard>
      </div>
    </div>
  )
}

// Remove SecondaryMetricCards since we combined them
export function SecondaryMetricCards() {
  return null
}
