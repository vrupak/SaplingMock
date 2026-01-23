"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Event } from "../types"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  status: "Major Donor" | "Monthly Donor" | "Active" | "Prospect"
}

interface AddContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: Event
  onAddContacts?: (contactIds: string[]) => void
}

// Sample contacts data
const sampleContacts: Contact[] = [
  {
    id: "c-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    status: "Major Donor",
  },
  {
    id: "c-2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "(555) 234-5678",
    status: "Active",
  },
  {
    id: "c-3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "(555) 345-6789",
    status: "Monthly Donor",
  },
  {
    id: "c-4",
    name: "David Thompson",
    email: "dthompson@email.com",
    phone: "(555) 456-7890",
    status: "Active",
  },
  {
    id: "c-5",
    name: "Amanda Williams",
    email: "a.williams@email.com",
    phone: "(555) 567-8901",
    status: "Prospect",
  },
  {
    id: "c-6",
    name: "Robert Garcia",
    email: "rgarcia@email.com",
    phone: "(555) 678-9012",
    status: "Major Donor",
  },
]

export function AddContactModal({
  open,
  onOpenChange,
  event,
  onAddContacts,
}: AddContactModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [addedContacts, setAddedContacts] = useState<Set<string>>(new Set())

  // Filter contacts based on search query
  const filteredContacts = sampleContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  )

  const handleAddContact = (contactId: string) => {
    setAddedContacts((prev) => new Set([...prev, contactId]))
  }

  const handleAddSelected = () => {
    if (onAddContacts) {
      onAddContacts(Array.from(addedContacts))
    }
    handleClose()
  }

  const handleClose = () => {
    setSearchQuery("")
    setAddedContacts(new Set())
    onOpenChange(false)
  }

  const getStatusBadgeStyle = (status: Contact["status"]) => {
    switch (status) {
      case "Major Donor":
        return "bg-blue-100 text-blue-700"
      case "Monthly Donor":
        return "bg-purple-100 text-purple-700"
      case "Active":
        return "bg-gray-100 text-gray-700"
      case "Prospect":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden p-0" showCloseButton={true}>
        <DialogTitle className="sr-only">Add Contact to Event</DialogTitle>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Contact to Event</h2>
        </div>

        {/* Search Interface */}
        <div className="px-6 py-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Search Contacts
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="px-6 overflow-y-auto max-h-[300px] border-t border-gray-100">
          {filteredContacts.map((contact) => {
            const isAdded = addedContacts.has(contact.id)
            return (
              <div
                key={contact.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {contact.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeStyle(
                        contact.status
                      )}`}
                    >
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                  <p className="text-xs text-gray-400">{contact.phone}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAddContact(contact.id)}
                  disabled={isAdded}
                  className={
                    isAdded
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                >
                  {isAdded ? "Added" : "Add"}
                </Button>
              </div>
            )
          })}

          {filteredContacts.length === 0 && (
            <div className="py-8 text-center text-gray-500 text-sm">
              No contacts found matching your search.
            </div>
          )}
        </div>

        {/* Quick Add Tips - Light blue info box */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <h4 className="text-sm font-medium text-blue-900">Quick Add Tips:</h4>
            <p className="text-sm text-blue-700 mt-1">
              Select contacts from your CRM to add them directly to this event. They&apos;ll receive a confirmation email automatically.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAddSelected}
            disabled={addedContacts.size === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Selected
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
