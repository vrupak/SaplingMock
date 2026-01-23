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

function EventRow({ event, isLast, index }: { event: EventData; isLast: boolean; index: number }) {
  const statusStyles = {
    Attended: "text-green-700 bg-green-50",
    Registered: "text-blue-700 bg-blue-50",
  }

  // Alternate row background - even rows get subtle gray
  const rowBg = index % 2 === 0 ? "bg-slate-50/70" : ""

  return (
    <div className={`py-4 ${!isLast ? 'border-b border-gray-200' : ''} ${rowBg} -mx-5 px-5`}>
      <div className="flex items-start gap-4">
        {/* Green Calendar Icon */}
        <div className="flex-shrink-0 mt-1">
          <Calendar className="w-5 h-5 text-sapling" />
        </div>

        {/* Event Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-0.5">{event.title}</h4>
          <p className="text-sm text-gray-600 mb-0.5">
            {event.date} at {event.time}
          </p>
          <p className="text-xs text-gray-500 mb-2">Registered on {event.registeredDate}</p>

          {/* Attendees List */}
          {event.attendees.length > 0 && (
            <ul className="text-sm text-gray-700">
              {event.attendees.map((attendee, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  {attendee}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded text-xs font-medium flex-shrink-0 ${statusStyles[event.status]}`}
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
        <div className="bg-white border border-slate-200 rounded-xl">
          {/* Header */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-0.5">Event Participation</h3>
            <p className="text-sm text-gray-500">Events managed by Sapling Events</p>
          </div>

          {/* Event Rows */}
          <div className="px-5">
            {sampleEvents.map((event, index) => (
              <EventRow key={event.id} event={event} isLast={index === sampleEvents.length - 1} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
