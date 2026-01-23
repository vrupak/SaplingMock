"use client"

import { useState } from "react"
import { Search, Plus, ExternalLink, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Event } from "../types"

export interface Attendee {
  id: string
  name: string
  email: string
  phone: string
  ticketType: "VIP Table" | "Individual" | "Couple" | "General"
  amount: number
  status: "confirmed" | "pending" | "cancelled"
  registeredDate: string
  checkedIn: boolean
}

interface EventAttendeesProps {
  event: Event
  attendees: Attendee[]
  onAddAttendee?: () => void
  onCheckIn?: (attendeeId: string) => void
  onEditAttendee?: (attendeeId: string) => void
  onDeleteAttendee?: (attendeeId: string) => void
}

export function EventAttendees({
  event,
  attendees,
  onAddAttendee,
  onCheckIn,
  onEditAttendee,
  onDeleteAttendee,
}: EventAttendeesProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: Attendee["status"]) => {
    const styles = {
      confirmed: "bg-green-100 text-green-700 border-green-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
    }
    return styles[status]
  }

  return (
    <div>
      {/* Search and Add Attendee Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Search Input */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search attendees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Add Attendee Button */}
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          onClick={onAddAttendee}
        >
          <Plus className="w-4 h-4" />
          Add Attendee
        </Button>
      </div>

      {/* Attendees Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Ticket Type
              </th>
              <th className="py-3 px-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                Check-In
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendees.map((attendee) => (
              <tr
                key={attendee.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Name */}
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{attendee.name}</p>
                    <p className="text-xs text-gray-500">
                      Registered {attendee.registeredDate}
                    </p>
                  </div>
                </td>

                {/* Contact */}
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm text-gray-900">{attendee.email}</p>
                    <p className="text-xs text-gray-500">{attendee.phone}</p>
                  </div>
                </td>

                {/* Ticket Type */}
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-900">{attendee.ticketType}</span>
                </td>

                {/* Amount */}
                <td className="py-3 px-4 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    ${attendee.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusBadge(
                      attendee.status
                    )}`}
                  >
                    {attendee.status}
                  </span>
                </td>

                {/* Check-In */}
                <td className="py-3 px-4 text-center">
                  {attendee.checkedIn ? (
                    <span className="text-sm text-green-600 font-medium">Checked In</span>
                  ) : (
                    <button
                      onClick={() => onCheckIn?.(attendee.id)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
                    >
                      Check In
                    </button>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditAttendee?.(attendee.id)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit attendee"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteAttendee?.(attendee.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete attendee"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredAttendees.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-sm">
              {searchQuery
                ? "No attendees found matching your search"
                : "No attendees registered yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
