// Contacts module barrel export
// Enables clean imports like: import { ContactsTable, ContactDetailView } from "@/components/contacts"

// Types
export * from "./types"

// Mock data
export { sampleContacts, statusColors, typeColors } from "./mock-data"

// Hooks
export * from "./hooks"

// UI Components
export { MetricCards, SecondaryMetricCards } from "./components"

// Table components
export { ContactsTable } from "./table"

// Modal components
export { AddContactModal, EditContactOverlay, UserProfileOverlay } from "./modals"

// Contact detail components
export {
  ContactDetailView,
  ContactProfileHeader,
  GivingStatisticsPanel,
  OrchidAIInsightsCard,
  IndividualsSection,
  ContactSidebar,
} from "./contact-detail"

// Contact detail tabs
export {
  AtAGlanceTab,
  GiftsTab,
  JourneyAskTab,
  EventsTab,
  OrchidInsightsTab,
  NotesTasksTab,
} from "./contact-detail/tabs"

// Contact detail accordions
export {
  WealthAccordion,
  BiographyAccordion,
  EmailListsAccordion,
  WorkflowsTagsAccordion,
  CommunicationPreferencesAccordion,
  RelationshipsAccordion,
} from "./contact-detail/accordions"

// Activity timeline
export { ActivityTimeline } from "./activity-timeline"
export { timelineStyles } from "./activity-timeline/config/timeline-styles"
export { mockTimelineItems } from "./activity-timeline/config/mock-timeline-items"
export * from "./activity-timeline/types"
