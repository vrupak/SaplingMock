"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Link2,
  UserPlus,
  Share2,
  ExternalLink,
  Mail,
  Download,
  QrCode,
  LayoutGrid,
  Calendar,
  MapPin,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventOverview } from "./EventOverview"
import { EventAttendees, type Attendee } from "./EventAttendees"
import { EventFinancials } from "./EventFinancials"
import type { Event } from "./types"

type TabType = "overview" | "attendees" | "financials"

interface EventDetailPageProps {
  event: Event
  onBack: () => void
}

// Sample attendees data for the event detail page
const sampleAttendees: Attendee[] = [
  {
    id: "att-1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "555-0101",
    ticketType: "VIP Table",
    amount: 2500.0,
    status: "confirmed",
    registeredDate: "2024-01-15",
    checkedIn: false,
  },
  {
    id: "att-2",
    name: "Michael Chen",
    email: "mchen@email.com",
    phone: "555-0102",
    ticketType: "Individual",
    amount: 250.0,
    status: "confirmed",
    registeredDate: "2024-01-18",
    checkedIn: false,
  },
  {
    id: "att-3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "555-0103",
    ticketType: "Couple",
    amount: 450.0,
    status: "confirmed",
    registeredDate: "2024-01-20",
    checkedIn: false,
  },
  {
    id: "att-4",
    name: "David Thompson",
    email: "dthompson@email.com",
    phone: "555-0104",
    ticketType: "Individual",
    amount: 250.0,
    status: "pending",
    registeredDate: "2024-01-22",
    checkedIn: false,
  },
  {
    id: "att-5",
    name: "Lisa Martinez",
    email: "lmartinez@email.com",
    phone: "555-0105",
    ticketType: "VIP Table",
    amount: 2500.0,
    status: "confirmed",
    registeredDate: "2024-01-25",
    checkedIn: false,
  },
]

export function EventDetailPage({ event, onBack }: EventDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [attendees, setAttendees] = useState<Attendee[]>(sampleAttendees)

  // Calculate metrics
  const confirmedCount = attendees.filter((a) => a.status === "confirmed").length
  const checkedInCount = attendees.filter((a) => a.checkedIn).length
  const totalRevenue = attendees.reduce((sum, a) => sum + a.amount, 0)
  const avgTicket = attendees.length > 0 ? totalRevenue / attendees.length : 0
  const capacityPercentage = Math.round((event.registered / event.capacity) * 100)

  // Format time range
  const timeRange = event.endTime
    ? `${event.startTime} - ${event.endTime}`
    : event.startTime

  const getStatusBadge = (status: Event["status"]) => {
    const styles = {
      Planning: "bg-gray-100 text-gray-700 border-gray-200",
      Upcoming: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Ongoing: "bg-green-100 text-green-700 border-green-200",
      Completed: "bg-blue-100 text-blue-700 border-blue-200",
    }
    return styles[status]
  }

  const handleCheckIn = (attendeeId: string) => {
    setAttendees((prev) =>
      prev.map((a) => (a.id === attendeeId ? { ...a, checkedIn: true } : a))
    )
  }

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "attendees" as const, label: `Attendees (${attendees.length})` },
    { id: "financials" as const, label: "Financials" },
  ]

  return (
    <div className="py-6 px-24">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Events</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {/* Header Row: Title + Actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
            <span
              className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusBadge(
                event.status
              )}`}
            >
              {event.status.toLowerCase()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Icon Buttons */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Link2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <UserPlus className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <ExternalLink className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <QrCode className="w-5 h-5" />
            </button>

            {/* Primary Action Button */}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 ml-2">
              <LayoutGrid className="w-4 h-4" />
              Table Placement/Seating
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6">{event.description}</p>

        {/* Secondary Metadata Row */}
        <div className="flex items-center gap-8 mb-6">
          {/* Date & Time */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Date & Time</p>
              <p className="text-sm font-medium text-gray-900">{event.startDate}</p>
              <p className="text-xs text-gray-600">{timeRange}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-900">{event.venue}</p>
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Capacity</p>
              <p className="text-sm font-medium text-gray-900">
                {event.registered} / {event.capacity} registered
              </p>
              <p className="text-xs text-gray-600">{capacityPercentage}% full</p>
            </div>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-4 gap-4">
          {/* Confirmed */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-600 mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-blue-700">{confirmedCount}</p>
          </div>

          {/* Checked In */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600 mb-1">Checked In</p>
            <p className="text-2xl font-bold text-green-700">{checkedInCount}</p>
          </div>

          {/* Revenue */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm font-medium text-purple-600 mb-1">Revenue</p>
            <p className="text-2xl font-bold text-purple-700">
              ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </p>
          </div>

          {/* Avg Ticket */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-medium text-yellow-600 mb-1">Avg Ticket</p>
            <p className="text-2xl font-bold text-yellow-700">
              ${Math.round(avgTicket).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Tab Navigation */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <EventOverview event={event} />}
        {activeTab === "attendees" && (
          <EventAttendees
            event={event}
            attendees={attendees}
            onCheckIn={handleCheckIn}
          />
        )}
        {activeTab === "financials" && (
          <EventFinancials event={event} attendees={attendees} />
        )}
      </div>
    </div>
  )
}
