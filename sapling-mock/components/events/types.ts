export interface Event {
  id: string
  name: string
  type: "Gala" | "Auction" | "Fundraiser" | "Stewardship" | "Workshop"
  status: "Planning" | "Upcoming" | "Ongoing" | "Completed"
  description: string
  startDate: string
  endDate?: string
  startTime: string
  endTime?: string
  venue: string
  address: string
  city: string
  state: string
  postalCode: string
  capacity: number
  ticketPrice: number
  fundraisingGoal: number
  registered: number
  revenue: number
  tags: string[]
}

export interface EventFormData {
  name: string
  type: string
  status: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  venueName: string
  address: string
  city: string
  state: string
  postalCode: string
  capacity: string
  ticketPrice: string
  fundraisingGoal: string
}

export interface EventMetrics {
  totalEvents: number
  totalAttendees: number
  totalRaised: number
  upcomingNext90Days: number
}
