import { useState, useMemo } from "react"
import { sampleEvents } from "../mock-data"
import type { Event, EventMetrics } from "../types"

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(sampleEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All Status")

  // Calculate metrics
  const metrics: EventMetrics = useMemo(() => {
    const now = new Date()
    const next90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

    return {
      totalEvents: events.length,
      totalAttendees: events.reduce((sum, event) => sum + event.registered, 0),
      totalRaised: events.reduce((sum, event) => sum + event.revenue, 0),
      upcomingNext90Days: events.filter((event) => {
        const eventDate = new Date(event.startDate)
        return eventDate >= now && eventDate <= next90Days && event.status === "Upcoming"
      }).length,
    }
  }, [events])

  // Filter events based on search and status
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesStatus =
        statusFilter === "All Status" || event.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [events, searchQuery, statusFilter])

  const addEvent = (eventData: Partial<Event>) => {
    const newEvent: Event = {
      id: `evt-${Date.now()}`,
      name: eventData.name || "",
      type: (eventData.type as Event["type"]) || "Fundraiser",
      status: (eventData.status as Event["status"]) || "Planning",
      description: eventData.description || "",
      startDate: eventData.startDate || "",
      endDate: eventData.endDate,
      startTime: eventData.startTime || "",
      endTime: eventData.endTime,
      venue: eventData.venue || "",
      address: eventData.address || "",
      city: eventData.city || "",
      state: eventData.state || "",
      postalCode: eventData.postalCode || "",
      capacity: eventData.capacity || 0,
      ticketPrice: eventData.ticketPrice || 0,
      fundraisingGoal: eventData.fundraisingGoal || 0,
      registered: 0,
      revenue: 0,
      tags: [],
    }
    setEvents([newEvent, ...events])
  }

  return {
    events: filteredEvents,
    metrics,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addEvent,
  }
}
