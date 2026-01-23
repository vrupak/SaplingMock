import type { Contact } from "./types"

// Sample contacts data for the contacts module
export const sampleContacts: Contact[] = [
  {
    id: "1",
    initials: "MI",
    name: "Misc/Anonymous",
    status: "Active",
    type: "Household",
    lifetimeGiving: 0,
    location: "-",
    contactId: "9999",
  },
  {
    id: "2",
    initials: "JL",
    name: "Jennifer Lee",
    subtitle: "Main Example Contact",
    email: "jennifer.lee@email.com",
    phone: "(206) 555-0103",
    status: "Recurring",
    type: "Household",
    lifetimeGiving: 8500,
    location: "Seattle, WA",
    contactId: "1001",
  },
  {
    id: "3",
    initials: "JA",
    name: "James and Sarah Anderson",
    email: "james.anderson@email.com",
    phone: "(503) 555-0101",
    status: "Active",
    type: "Household",
    lifetimeGiving: 45000,
    location: "Portland, OR",
    contactId: "1002",
  },
  {
    id: "4",
    initials: "CR",
    name: "The Rodriguez Family",
    subtitle: "Carlos and Maria Rodriguez",
    email: "carlos.rodriguez@email.com",
    phone: "(619) 555-0110",
    status: "Prospect",
    type: "Household",
    lifetimeGiving: 0,
    location: "San Diego, CA",
    contactId: "1003",
  },
  {
    id: "5",
    initials: "TW",
    name: "Thompson-Williams Foundation",
    email: "grants@twfoundation.org",
    phone: "(415) 555-0200",
    status: "Active",
    type: "Foundation",
    lifetimeGiving: 250000,
    location: "San Francisco, CA",
    contactId: "2001",
  },
  {
    id: "6",
    initials: "GC",
    name: "Green City Enterprises",
    email: "partnerships@greencity.com",
    phone: "(312) 555-0150",
    status: "Recurring",
    type: "Business",
    lifetimeGiving: 75000,
    location: "Chicago, IL",
    contactId: "3001",
  },
]

// Status colors for badges
export const statusColors = {
  Active: "bg-sapling-light/10 text-sapling border-sapling-light/30",
  Recurring: "bg-amber-50 text-amber-700 border-amber-200",
  Prospect: "bg-orange-50 text-orange-700 border-orange-200",
}

// Type colors for badges
export const typeColors = {
  Household: "bg-sapling-light/10 text-sapling border-sapling-light/30",
  Foundation: "bg-blue-50 text-blue-700 border-blue-200",
  Business: "bg-purple-50 text-purple-700 border-purple-200",
}
