"use client"

import type { Event } from "../types"
import type { Attendee } from "./EventAttendees"

interface TicketRevenue {
  ticketType: string
  ticketsSold: number
  totalRevenue: number
  averagePrice: number
}

interface EventFinancialsProps {
  event: Event
  attendees: Attendee[]
}

export function EventFinancials({ event, attendees }: EventFinancialsProps) {
  // Calculate metrics from attendees
  const totalRevenue = attendees.reduce((sum, a) => sum + a.amount, 0)
  const confirmedAttendees = attendees.filter((a) => a.status === "confirmed")
  const averageTicket = confirmedAttendees.length > 0
    ? totalRevenue / confirmedAttendees.length
    : 0

  // Calculate projected total (if sold out)
  const remainingCapacity = event.capacity - event.registered
  const projectedTotal = totalRevenue + (remainingCapacity * averageTicket)

  // Group revenue by ticket type
  const revenueByTicketType: TicketRevenue[] = attendees.reduce((acc, attendee) => {
    const existing = acc.find((item) => item.ticketType === attendee.ticketType)
    if (existing) {
      existing.ticketsSold += 1
      existing.totalRevenue += attendee.amount
    } else {
      acc.push({
        ticketType: attendee.ticketType,
        ticketsSold: 1,
        totalRevenue: attendee.amount,
        averagePrice: attendee.amount,
      })
    }
    return acc
  }, [] as TicketRevenue[])

  // Calculate average price for each ticket type
  revenueByTicketType.forEach((item) => {
    item.averagePrice = item.totalRevenue / item.ticketsSold
  })

  // Sort by total revenue descending
  revenueByTicketType.sort((a, b) => b.totalRevenue - a.totalRevenue)

  return (
    <div>
      {/* Secondary Metric Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <p className="text-sm font-medium text-blue-600 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-blue-800">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            of ${event.fundraisingGoal.toLocaleString()} goal
          </p>
        </div>

        {/* Average Ticket */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
          <p className="text-sm font-medium text-purple-600 mb-1">Average Ticket</p>
          <p className="text-3xl font-bold text-purple-800">
            ${Math.round(averageTicket).toLocaleString()}
          </p>
          <p className="text-sm text-purple-600 mt-1">per attendee</p>
        </div>

        {/* Projected Total */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
          <p className="text-sm font-medium text-green-600 mb-1">Projected Total</p>
          <p className="text-3xl font-bold text-green-800">
            ${Math.round(projectedTotal).toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">if sold out</p>
        </div>
      </div>

      {/* Revenue by Ticket Type */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4">Revenue by Ticket Type</h3>
        <div className="space-y-3">
          {revenueByTicketType.length > 0 ? (
            revenueByTicketType.map((item) => (
              <div
                key={item.ticketType}
                className="flex items-center justify-between px-4 py-4 bg-slate-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.ticketType}</p>
                  <p className="text-xs text-gray-500">{item.ticketsSold} tickets sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${item.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-gray-500">
                    ${item.averagePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })} avg
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center bg-slate-50 rounded-lg">
              <p className="text-gray-500 text-sm">No ticket revenue data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
