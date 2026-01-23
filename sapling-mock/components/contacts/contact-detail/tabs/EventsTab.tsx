"use client"

import { Menu, Calendar } from "lucide-react"
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

interface EventsTabProps {
  showSidebar: boolean
  onToggleSidebar: () => void
  contact: Contact
}

interface EventData {
  id: string
  title: string
  date: string
  time: string
  registeredDate: string
  attendees: string[]
  status: "Attended" | "Registered"
}

const sampleEvents: EventData[] = [
  {
    id: "e1",
    title: "Annual Gala 2024",
    date: "October 15, 2024",
    time: "6:00 PM",
    registeredDate: "September 2, 2024 at 11:23 AM",
    attendees: ["Jennifer Lee"],
    status: "Attended",
  },
  {
    id: "e2",
    title: "Summer Fundraiser BBQ",
    date: "June 20, 2024",
    time: "5:00 PM",
    registeredDate: "May 18, 2024 at 3:45 PM",
    attendees: ["Jennifer Lee"],
    status: "Registered",
  },
  {
    id: "e3",
    title: "Spring Donor Appreciation",
    date: "March 12, 2024",
    time: "7:00 PM",
    registeredDate: "February 8, 2024 at 9:17 AM",
    attendees: ["Jennifer Lee"],
    status: "Attended",
  },
]

function EventCard({ event, index }: { event: EventData; index: number }) {
  const statusStyles = {
    Attended: "bg-green-100/80 text-green-800 border-green-300",
    Registered: "bg-blue-100/80 text-blue-800 border-blue-300",
  }

  // Alternate row styling: odd rows white, even rows subtle grey
  const rowBgColor = index % 2 === 0 ? "bg-white" : "bg-slate-50"

  return (
    <div className={`${rowBgColor} border border-gray-200 rounded-lg p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-bold text-gray-900 mb-2">{event.title}</h4>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1.5">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{event.date} at {event.time}</span>
          </div>
          <p className="text-xs text-gray-500">Registered on {event.registeredDate}</p>

          {/* Attendees List */}
          {event.attendees.length > 0 && (
            <div className="mt-3">
              <ul className="list-disc list-inside text-sm text-gray-700">
                {event.attendees.map((attendee, idx) => (
                  <li key={idx}>{attendee}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <span
          className={`px-3 py-1 rounded text-xs font-semibold border flex-shrink-0 ${statusStyles[event.status]}`}
        >
          {event.status}
        </span>
      </div>
    </div>
  )
}

export function EventsTab({ showSidebar, onToggleSidebar, contact }: EventsTabProps) {
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

      {/* Right Column: Event Participation Feed (Flexible Width) */}
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
          <h2 className="text-xl font-semibold text-sapling-dark">Events</h2>
        </div>

        {/* Event Participation Section */}
        <div className="mb-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Event Participation</h3>
            <p className="text-sm text-gray-500">Events managed by Sapling Events</p>
          </div>

          {/* Event Cards */}
          <div className="space-y-4">
            {sampleEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
