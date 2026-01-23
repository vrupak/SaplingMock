"use client"

import { useState } from "react"
import { Menu, Sparkles, TrendingUp, DollarSign, Activity, Lightbulb, Target, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion } from "@/components/ui/accordion"
import { IndividualsSection } from "../IndividualsSection"
import {
  WealthAccordion,
  CommunicationPreferencesAccordion,
  WorkflowsTagsAccordion,
  BiographyAccordion,
  RelationshipsAccordion,
  EmailListsAccordion,
} from "../accordions"
import type { Contact } from "../types"

interface OrchidInsightsTabProps {
  showSidebar: boolean
  onToggleSidebar: () => void
  contact: Contact
}

interface KeyInsight {
  id: string
  text: string
  color: "green" | "blue" | "purple" | "amber"
}

interface RecommendedAction {
  id: string
  number: number
  title: string
  subtitle: string
  priority: "high" | "medium"
}

const keyInsights: KeyInsight[] = [
  {
    id: "1",
    text: "Consistent giving pattern for 5+ years with increasing gift sizes",
    color: "green",
  },
  {
    id: "2",
    text: "Strong affinity for education programs based on designation history",
    color: "blue",
  },
  {
    id: "3",
    text: "High capacity indicator: professional background and geographic location",
    color: "purple",
  },
  {
    id: "4",
    text: "Prefers digital communication channels over traditional mail",
    color: "amber",
  },
]

const recommendedActions: RecommendedAction[] = [
  {
    id: "1",
    number: 1,
    title: "Schedule cultivation meeting",
    subtitle: "Within next 2 weeks • High priority",
    priority: "high",
  },
  {
    id: "2",
    number: 2,
    title: "Send personalized impact report",
    subtitle: "This week • Medium priority",
    priority: "medium",
  },
  {
    id: "3",
    number: 3,
    title: "Invite to exclusive event",
    subtitle: "Within 30 days • Medium priority",
    priority: "medium",
  },
]

const givingYears = [
  { year: "2017", amount: 800 },
  { year: "2018", amount: 1200 },
  { year: "2019", amount: 1800 },
  { year: "2020", amount: 2000 },
  { year: "2021", amount: 2300 },
  { year: "2022", amount: 2800 },
  { year: "2023", amount: 3200 },
  { year: "2024", amount: 3700 },
]

function DonorScoreCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-sapling" />
        <h3 className="text-sm font-semibold text-gray-900">Donor Score</h3>
      </div>
      <div className="flex-1 min-w-0 mb-2">
        <div className="text-3xl font-bold text-sapling-dark truncate">87/100</div>
      </div>
      <p className="text-xs text-gray-600 mb-2">High engagement potential</p>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-sapling rounded-full" style={{ width: "87%" }} />
      </div>
    </div>
  )
}

function NextGiftPredictionCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="w-4 h-4 text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900">Next Gift Prediction</h3>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-3xl font-bold text-blue-600 mb-2 truncate">$2,500</div>
      </div>
      <p className="text-xs text-gray-600 mb-1">Estimated in 45-60 days</p>
      <p className="text-xs text-gray-500">Based on giving patterns</p>
    </div>
  )
}

function EngagementLevelCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-purple-600" />
        <h3 className="text-sm font-semibold text-gray-900">Engagement Level</h3>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-3xl font-bold text-purple-600 mb-2 truncate">High</div>
      </div>
      <p className="text-xs text-gray-600 mb-2">Active in last 30 days</p>
      <div className="flex gap-1">
        <div className="h-2 flex-1 bg-purple-600 rounded-full" />
        <div className="h-2 flex-1 bg-purple-600 rounded-full" />
        <div className="h-2 flex-1 bg-purple-600 rounded-full" />
        <div className="h-2 flex-1 bg-purple-400 rounded-full" />
      </div>
    </div>
  )
}

function KeyInsightItem({ insight }: { insight: KeyInsight }) {
  const colorStyles = {
    green: "text-sapling",
    blue: "text-blue-600",
    purple: "text-purple-600",
    amber: "text-amber-600",
  }

  return (
    <div className="flex items-start gap-2">
      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colorStyles[insight.color].replace("text-", "bg-")}`} />
      <p className="text-sm text-gray-700">{insight.text}</p>
    </div>
  )
}

function RecommendedActionCard({ action }: { action: RecommendedAction }) {
  const priorityStyles = {
    high: {
      bg: "bg-green-50",
      border: "border-green-200",
      number: "bg-green-600 text-white",
    },
    medium: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      number: "bg-blue-600 text-white",
    },
  }

  const style = priorityStyles[action.priority]

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${style.bg} ${style.border}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${style.number}`}>
        {action.number}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 mb-0.5">{action.title}</h4>
        <p className="text-xs text-gray-600">{action.subtitle}</p>
      </div>
    </div>
  )
}

function GivingPatternChart() {
  const maxAmount = Math.max(...givingYears.map((y) => y.amount))

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-4 h-4 text-sapling" />
        <h3 className="text-base font-semibold text-gray-900">Giving Pattern Analysis</h3>
      </div>

      {/* Bar Chart */}
      <div className="mb-6">
        <div className="flex items-end justify-between gap-3 h-40">
          {givingYears.map((year) => (
            <div key={year.year} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-32">
                <div
                  className="w-full bg-sapling-light rounded-t"
                  style={{ height: `${(year.amount / maxAmount) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{year.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Footer */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Avg Gift Size</p>
          <p className="text-xl font-bold text-sapling">$2,150</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Growth Rate</p>
          <p className="text-xl font-bold text-blue-600">+18%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Total Gifts</p>
          <p className="text-xl font-bold text-purple-600">29</p>
        </div>
      </div>
    </div>
  )
}

export function OrchidInsightsTab({ showSidebar, onToggleSidebar, contact }: OrchidInsightsTabProps) {
  const [chatInput, setChatInput] = useState("")

  return (
    <div className="flex items-start h-auto">
      {/* Left Column: Sidebar (Fixed Width) - Conditionally Rendered */}
      {showSidebar && (
        <div className="w-[380px] flex-shrink-0 p-6 border-r border-sapling-light/20">
          <IndividualsSection contact={contact} />

          {/* Accordion Sections - All Collapsed by Default */}
          <Accordion type="multiple" defaultValue={[]} className="mt-6">
            <WealthAccordion />
            <CommunicationPreferencesAccordion />
            <WorkflowsTagsAccordion />
            <BiographyAccordion />
            <RelationshipsAccordion />
            <EmailListsAccordion />
          </Accordion>
        </div>
      )}

      {/* Main Content Area (Flexible Width) */}
      <div className={`flex-1 min-w-0 ${showSidebar ? 'pl-6' : 'p-6'} h-auto`}>
        {/* Header with Menu Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onToggleSidebar}
            className={`p-2 hover:bg-gray-100 rounded transition-colors ${showSidebar ? 'bg-gray-100' : ''}`}
            title={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-xl font-semibold text-sapling-dark">Orchid Insights</h2>
        </div>

        {/* Two-Column Layout: AI Assistant + Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Column: Orchid AI Assistant */}
          <div className="flex flex-col h-full">
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex-1 flex flex-col">
              {/* AI Assistant Header */}
              <div className="flex items-start gap-3 mb-5 pb-5 border-b border-gray-200">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900">Orchid AI Assistant</h3>
                  <p className="text-sm text-gray-500">Ask me anything about this donor</p>
                </div>
              </div>

              {/* AI Message Bubble */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Hello! I'm Orchid AI, your intelligent assistant for this contact. I can help you with:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    <li>• Donor insights and giving patterns</li>
                    <li>• Next best actions and engagement strategies</li>
                    <li>• Gift predictions and capacity analysis</li>
                    <li>• Communication recommendations</li>
                  </ul>
                  <p className="text-sm text-gray-700 mt-4 mb-1">What would you like to know?</p>
                  <p className="text-xs text-gray-500">09:47 AM</p>
                </div>
              </div>

              {/* Chat Input - Fixed at Bottom */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask Orchid AI anything..."
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5">
                    <span>Send</span>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Analytics & Insights */}
          <div className="flex flex-col gap-6">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DonorScoreCard />
              <NextGiftPredictionCard />
              <EngagementLevelCard />
            </div>

            {/* Key Insights & Recommended Actions */}
            <div className="grid grid-cols-2 gap-4">
              {/* Key Insights */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Key Insights</h3>
                </div>
                <div className="space-y-3">
                  {keyInsights.map((insight) => (
                    <KeyInsightItem key={insight.id} insight={insight} />
                  ))}
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-red-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Recommended Actions</h3>
                </div>
                <div className="space-y-3 mb-4">
                  {recommendedActions.map((action) => (
                    <RecommendedActionCard key={action.id} action={action} />
                  ))}
                </div>
                {/* Automated Workflow Card */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Add to automated workflow</h4>
                      <p className="text-xs text-gray-600">
                        AI recommends: <span className="text-purple-600 font-medium">Major Donor Cultivation</span> • Start now
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Giving Pattern Analysis */}
            <GivingPatternChart />
          </div>
        </div>
      </div>
    </div>
  )
}
