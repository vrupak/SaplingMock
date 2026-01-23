"use client"

import { useState } from "react"
import { Plus, Search, Grid3x3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EventCard } from "./EventCard"
import { EventRow } from "./EventRow"
import { CreateEventModal } from "./CreateEventModal"
import { useEvents } from "./hooks/useEvents"
import type { EventFormData } from "./types"

export function EventsPage() {
  const {
    events,
    metrics,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addEvent,
  } = useEvents()

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const handleCreateEvent = (eventData: EventFormData) => {
    addEvent({
      name: eventData.name,
      type: eventData.type as any,
      status: eventData.status as any,
      description: eventData.description,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      venue: eventData.venueName,
      address: eventData.address,
      city: eventData.city,
      state: eventData.state,
      postalCode: eventData.postalCode,
      capacity: parseInt(eventData.capacity) || 0,
      ticketPrice: parseFloat(eventData.ticketPrice) || 0,
      fundraisingGoal: parseFloat(eventData.fundraisingGoal) || 0,
    })
  }

  return (
    <div className="py-6 px-24">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 mt-1">Manage fundraisers, galas, and community events</p>
        </div>
        <Button
          className="bg-sapling-light hover:bg-sapling-dark text-white gap-2"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Total Events - Blue */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/60 rounded-xl p-5 transition-all hover:shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-white/80 rounded-lg shadow-sm">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
              This Year
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-blue-600">{metrics.totalEvents}</span>
          </div>
          <p className="text-sm text-blue-700 font-medium">Total Events</p>
        </div>

        {/* Total Attendees - Green */}
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/60 rounded-xl p-5 transition-all hover:shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-white/80 rounded-lg shadow-sm">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
              Registered
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-green-600">
              {metrics.totalAttendees.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-green-700 font-medium">Total Attendees</p>
        </div>

        {/* Total Raised - Purple */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/60 rounded-xl p-5 transition-all hover:shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-white/80 rounded-lg shadow-sm">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
              Revenue
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-purple-600">
              ${(metrics.totalRaised / 1000).toFixed(0)}K
            </span>
          </div>
          <p className="text-sm text-purple-700 font-medium">Total Raised</p>
        </div>

        {/* Next 90 Days - Yellow */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200/60 rounded-xl p-5 transition-all hover:shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-white/80 rounded-lg shadow-sm">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-yellow-600 uppercase tracking-wide">
              Upcoming
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-yellow-600">
              {metrics.upcomingNext90Days}
            </span>
          </div>
          <p className="text-sm text-yellow-700 font-medium">Next 90 Days</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
              title="Grid view"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Events Display - Grid or Table */}
      {events.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100">
                  <th className="py-3 px-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Event
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Location
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <EventRow key={event.id} event={event} />
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No events found</p>
          <p className="text-gray-400 text-sm mb-6">
            {searchQuery || statusFilter !== "All Status"
              ? "Try adjusting your search or filters"
              : "Get started by creating your first event"}
          </p>
          {!searchQuery && statusFilter === "All Status" && (
            <Button
              className="bg-sapling-light hover:bg-sapling-dark text-white gap-2"
              onClick={() => setCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Create Event
            </Button>
          )}
        </div>
      )}

      {/* Help Section - Bottom of Page */}
      <div className="grid grid-cols-2 gap-6 mt-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-2 bg-blue-100 rounded-lg mb-3">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Need assistance from an events team?
            </h3>
            <p className="text-sm text-gray-600">
              Contact{" "}
              <a
                href="mailto:events@fromsapling.com"
                className="text-blue-600 hover:underline font-medium"
              >
                events@fromsapling.com
              </a>
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-2 bg-purple-100 rounded-lg mb-3">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Need an auction team?</h3>
            <p className="text-sm text-gray-600">
              Contact{" "}
              <a
                href="mailto:auctions@fromsapling.com"
                className="text-purple-600 hover:underline font-medium"
              >
                auctions@fromsapling.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSave={handleCreateEvent}
      />
    </div>
  )
}
