"use client"

import { useState } from "react"
import { Sparkles, MessageCircle, Calendar, Lightbulb, Check, Plus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { Contact } from "../types"

interface JourneyAskTabProps {
  showSidebar: boolean
  onToggleSidebar: () => void
  contact: Contact
}

// Stage progression data
const stages = [
  { id: "prospect", label: "Prospect", completed: true },
  { id: "cultivated", label: "Cultivated Prospect", completed: true },
  { id: "first-time", label: "First-time Donor", completed: true },
  { id: "repeat", label: "Repeat Donor", completed: true },
  { id: "mid-level", label: "Mid-level Donor", active: true },
  { id: "major", label: "Major Donor", completed: false },
  { id: "legacy", label: "Legacy Donor", completed: false },
  { id: "lapsed", label: "Lapsed", completed: false },
]

interface AskPledge {
  id: string
  type: "ask" | "pledge"
  amount: string
  status: "pending" | "fulfilled" | "declined"
  date: string
  time: string
  campaign: string
  assignedTo: string
  createdBy: string
  fund?: string
  installments?: string
  balance?: string
  nextPayment?: string
  notes: string
}

const asksAndPledges: AskPledge[] = [
  {
    id: "1",
    type: "ask",
    amount: "$15,000",
    status: "pending",
    date: "Nov 10, 2025",
    time: "14:00",
    campaign: "Capital Campaign - Building Expansion",
    assignedTo: "Maria Garcia",
    createdBy: "Maria Garcia",
    fund: "Capital Campaign",
    notes: "Very positive conversation, considering pledge over 3 years",
  },
  {
    id: "2",
    type: "pledge",
    amount: "$15,000",
    status: "pending",
    date: "Nov 10, 2025",
    time: "09:00",
    campaign: "Capital Campaign",
    assignedTo: "Maria Garcia",
    createdBy: "Maria Garcia",
    installments: "3 (Annual)",
    balance: "$10,000",
    nextPayment: "Dec 10, 2025",
    notes: "Pledge for building expansion, 3 annual payments of $5,000",
  },
  {
    id: "3",
    type: "ask",
    amount: "$5,000",
    status: "fulfilled",
    date: "Nov 4, 2024",
    time: "10:30",
    campaign: "Annual Fund 2024",
    assignedTo: "Alex Russo",
    createdBy: "Alex Russo",
    fund: "Annual Fund 2024",
    notes: "Fulfilled with DAF gift",
  },
  {
    id: "4",
    type: "ask",
    amount: "$25,000",
    status: "pending",
    date: "Oct 14, 2024",
    time: "14:00",
    campaign: "Legacy Society - Planned Giving",
    assignedTo: "Maria Garcia",
    createdBy: "Maria Garcia",
    fund: "Legacy Society - Planned Giving",
    notes: "Expressed interest in including us in estate plans, sent legacy society materials",
  },
  {
    id: "5",
    type: "ask",
    amount: "$8,000",
    status: "fulfilled",
    date: "Sep 19, 2024",
    time: "11:15",
    campaign: "Endowment Fund",
    assignedTo: "Alex Russo",
    createdBy: "Alex Russo",
    fund: "Endowment Fund",
    notes: "Donated via DAF, very enthusiastic about building long-term sustainability",
  },
  {
    id: "6",
    type: "ask",
    amount: "$12,000",
    status: "declined",
    date: "Aug 9, 2024",
    time: "09:30",
    campaign: "Technology Infrastructure",
    assignedTo: "Maria Garcia",
    createdBy: "Maria Garcia",
    fund: "Technology Infrastructure",
    notes: "Already committed to other causes this quarter, asked to revisit in Q1 2025",
  },
  {
    id: "7",
    type: "pledge",
    amount: "$6,000",
    status: "pending",
    date: "Jul 14, 2024",
    time: "15:30",
    campaign: "Scholarship Fund",
    assignedTo: "Alex Russo",
    createdBy: "Alex Russo",
    installments: "6 (Monthly)",
    balance: "$2,000",
    nextPayment: "Dec 14, 2024",
    notes: "Monthly recurring pledge of $1,000 to support student scholarships",
  },
]

function StageStep({ stage, isActive, isCompleted }: { stage: typeof stages[0]; isActive: boolean; isCompleted: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 relative">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
          isActive
            ? "bg-purple-100 border-purple-500 text-purple-700"
            : isCompleted
            ? "bg-gray-100 border-gray-400 text-gray-700"
            : "bg-white border-gray-300 text-gray-400"
        }`}
      >
        {isCompleted && !isActive ? (
          <Check className="w-5 h-5" />
        ) : isActive ? (
          <Sparkles className="w-5 h-5" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        )}
      </div>
      <p
        className={`text-xs text-center max-w-[100px] ${
          isActive ? "font-semibold text-purple-700" : isCompleted ? "text-gray-700" : "text-gray-500"
        }`}
      >
        {stage.label}
      </p>
    </div>
  )
}

function AskPledgeCard({ item }: { item: AskPledge }) {
  const statusColors = {
    pending: "bg-blue-100 text-blue-700 border-blue-200",
    fulfilled: "bg-green-100 text-green-700 border-green-200",
    declined: "bg-red-100 text-red-700 border-red-200",
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded text-xs font-semibold uppercase ${
              item.type === "ask" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
            }`}
          >
            {item.type}
          </span>
          <h4 className="text-2xl font-bold text-gray-900">{item.amount}</h4>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[item.status]}`}>
            {item.status}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
          ✏️ Edit
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-500">
            <Calendar className="w-3.5 h-3.5 inline mr-1" />
            {item.date} at {item.time}
          </p>
          <p className="text-gray-700 font-medium mt-1">{item.campaign}</p>
        </div>
        <div>
          <p className="text-gray-500">by {item.assignedTo}</p>
          <p className="text-gray-500 text-xs">Created by {item.createdBy}</p>
        </div>
      </div>

      {item.fund && (
        <p className="text-sm text-gray-700 font-medium mb-2">{item.fund}</p>
      )}

      {item.type === "pledge" && (
        <div className="bg-gray-50 rounded p-3 mb-3 text-sm">
          <p className="text-gray-700">
            <strong>Installments:</strong> {item.installments} <strong className="ml-4">Balance:</strong> {item.balance}
          </p>
          <p className="text-gray-700 mt-1">
            <strong>Next Payment:</strong> {item.nextPayment}
          </p>
        </div>
      )}

      <p className="text-sm text-gray-600">{item.notes}</p>
    </div>
  )
}

export function JourneyAskTab({ showSidebar, onToggleSidebar, contact }: JourneyAskTabProps) {
  const [orchidManaged, setOrchidManaged] = useState(true)

  return (
    <div className={`flex-1 min-w-0 ${showSidebar ? 'pl-6' : 'p-6'} h-auto`}>
      {/* Sidebar Toggle Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onToggleSidebar}
          className={`p-2 hover:bg-gray-100 rounded transition-colors ${showSidebar ? 'bg-gray-100' : ''}`}
          title={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
        >
          <Menu className="w-5 h-5 text-gray-500" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Journey + Asks</h2>
      </div>

      {/* Donor Journey Section */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Donor Journey</h3>
              <p className="text-sm text-gray-600">AI-powered stage management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Orchid AI Managed</span>
              <Switch checked={orchidManaged} onCheckedChange={setOrchidManaged} />
              <span className="text-sm font-medium text-purple-700">Yes</span>
            </div>
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
              <MessageCircle className="w-4 h-4" />
              Chat with Orchid
            </Button>
          </div>
        </div>

        {/* Stage Stepper */}
        <div className="flex items-center justify-between mb-6 overflow-x-auto pb-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              <StageStep stage={stage} isActive={stage.active || false} isCompleted={stage.completed} />
              {index < stages.length - 1 && (
                <div className={`h-0.5 w-16 mx-2 ${stage.completed ? "bg-gray-400" : "bg-gray-300"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Orchid AI Strategy Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-900">Orchid AI Strategy</h4>
                <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-xs font-medium rounded">
                  Fundraising Guidance
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                To move this donor to Major Donor status, schedule a face-to-face meeting to discuss their philanthropic
                goals. Present a compelling case for a $25,000 gift focused on program impact they care about. Emphasize
                naming opportunities and multi-year commitment options.
              </p>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                Dismiss
              </Button>
            </div>
          </div>
        </div>

        {/* Current Stage */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Current Stage</h4>
            <Button variant="link" className="text-purple-600 hover:text-purple-700 text-sm">
              → Change Stage
            </Button>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-lg p-4">
            <div className="w-10 h-10 bg-sapling-light rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Mid-level Donor</h5>
              <p className="text-sm text-gray-600">Growing donor with increasing gift sizes. Consider upgrade cultivation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Next Ask */}
      <div className="bg-gradient-to-br from-sapling-light to-sapling-dark rounded-lg p-6 mb-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">$</span>
          </div>
          <div className="flex-1">
            <p className="text-sm opacity-90 mb-1">Recommended Next Ask</p>
            <h3 className="text-4xl font-bold mb-3">$10,200</h3>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Ready for outreach now</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Ready for outreach</span>
            </div>
          </div>
        </div>
      </div>

      {/* Asks & Pledges Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Asks & Pledges</h3>
          <div className="flex items-center gap-3">
            <Button className="gap-2 bg-sapling hover:bg-sapling-dark text-white">
              <Plus className="w-4 h-4" />
              Log Ask
            </Button>
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="w-4 h-4" />
              Log Pledge
            </Button>
          </div>
        </div>

        {/* Asks & Pledges Feed */}
        <div className="space-y-4">
          {asksAndPledges.map((item) => (
            <AskPledgeCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
