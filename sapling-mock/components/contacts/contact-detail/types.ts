import type { Contact } from "../types"

export type { Contact }

export interface GivingStats {
  currentYear: {
    lastGiftAmount: string
    lastGiftDate: string
    yearToDateGiving: string
    numberOfGifts: number
    givingThisMonth: string
  }
  lifetime: {
    lifeToDateGiving: string
    bestGiftYearAmount: string
    bestGiftYearYear: string
    largestGiftAmount: string
    largestGiftDate: string
  }
}

export interface ContactProfileProps {
  contact: Contact
  onEditClick: () => void
}

export interface GivingStatsPanelProps {
  stats: GivingStats
}

export interface OrchidInsight {
  text: string
  color: "green" | "blue" | "amber"
}

export interface OrchidAIInsightsProps {
  insights: OrchidInsight[]
  assignedContact: string
  asks: string
  pledges: string
  fulfilled: string
  outstanding: string
}

export interface Relationship {
  name: string
  type: string
  id: string
}

export interface IndividualsSectionProps {
  contact: Contact
}

export interface WealthData {
  estimatedNetWorth: string
  annualIncome: string
  realEstate: string
  stockHoldings: string
  businessInterests: string
  philanthropyScore: string
  givingCapacity: string
  lastScreened: string
}

export interface CommunicationPreferences {
  optOuts: string[]
  optIns: string[]
  mailSchedule: string
}

export interface Workflow {
  name: string
  status: "Active" | "Pending"
  stage: string
}

export interface BiographyData {
  biography: string
  occupation: string
  employer: string
  industry: string
  education: string
  interests: string
  boardAffiliations: string
}

export interface Gift {
  id: string
  amount: string
  donorName: string
  status: "Received" | "Pending" | "Declined"
  isRecurring?: boolean
  paymentMethod: string
  source: string
  fund: string
  receiptType: string
  date: string
  time: string
  lastEditedBy: string
  lastEditedDate: string
  passthrough?: { name: string; id: string } | null
  campaign?: string
  segment?: string
  tributes?: string
  taxDeductible: string
  nonTaxDeductible: string
  receipted: string
  restrictions: string
  notes: string
}
