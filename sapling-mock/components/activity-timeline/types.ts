export type TimelineItemType =
  | "pinned-note"
  | "overdue-task"
  | "open-task"
  | "gift"
  | "ask"
  | "pledge"
  | "contact-info-generated"
  | "wealth-info-generated"
  | "workflow-change"
  | "data-enrichment"
  | "document"
  | "legacy-giving"
  | "event"
  | "fulfillment"
  | "membership"
  | "call-note"

export interface TimelineItem {
  id: string
  type: TimelineItemType
  title: string
  description?: string
  addedBy?: string
  date: string
  dueDate?: string
  owner?: string
  createdDate?: string
  // Gift specific
  amount?: string
  fund?: string
  channel?: string
  giftType?: string
  campaign?: string
  notes?: string
  // Ask specific
  status?: string
  followUp?: string
  // Pledge specific
  installments?: string
  balance?: string
  nextPayment?: string
  // Event specific
  eventName?: string
  ticket?: string
  table?: string
  guests?: string
  // Document specific
  documentType?: string
  fileName?: string
  // Legacy giving
  estimated?: string
  intentType?: string
  documented?: boolean
  // Fulfillment
  itemName?: string
  carrier?: string
  tracking?: string
  // Membership
  membershipAmount?: string
  renewal?: string
  // Call note
  outcome?: string
  nextSteps?: string
}

export interface TimelineItemStyles {
  borderColor: string
  bgColor: string
  iconBg: string
  iconColor: string
  badgeColor: string
  Icon: React.ComponentType<{ className?: string }>
}
