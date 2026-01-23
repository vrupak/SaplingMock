// Page Components
export { EventsPage } from "./pages/EventsPage"
export { EventDetailPage } from "./pages/EventDetailPage"
export { TablePlacementPage } from "./pages/TablePlacementPage"

// Shared Components
export { EventCard } from "./components/EventCard"
export { EventRow } from "./components/EventRow"
export { EventOverview } from "./components/EventOverview"
export { EventAttendees } from "./components/EventAttendees"
export { EventFinancials } from "./components/EventFinancials"
export { SeatingSummary } from "./components/SeatingSummary"
export { VenueCanvas } from "./components/VenueCanvas"
export { SeatingGridView } from "./components/SeatingGridView"

// Modal Components
export { CreateEventModal } from "./modals/CreateEventModal"
export { EventInviteLinkModal } from "./modals/EventInviteLinkModal"
export { AddContactModal } from "./modals/AddContactModal"
export { ImportContactsModal } from "./modals/ImportContactsModal"
export { EmailAttendeesModal } from "./modals/EmailAttendeesModal"

// Hooks
export { useEvents } from "./hooks/useEvents"

// Types
export type { Event, EventFormData, EventMetrics } from "./types"
export type { Attendee } from "./components/EventAttendees"
export type { TableData, Seat, SeatingMetrics, TableLevel, TableShape } from "./types/table-types"
