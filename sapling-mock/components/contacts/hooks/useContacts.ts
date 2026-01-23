"use client"

import { useState, useCallback, useMemo } from "react"
import type { Contact, ContactFormData } from "../types"
import { sampleContacts } from "../mock-data"

interface UseContactsOptions {
  initialContacts?: Contact[]
}

interface UseContactsReturn {
  // State
  contacts: Contact[]
  selectedContact: Contact | null
  isLoading: boolean
  searchQuery: string
  statusFilter: string

  // Actions
  setSelectedContact: (contact: Contact | null) => void
  setSearchQuery: (query: string) => void
  setStatusFilter: (status: string) => void
  addContact: (data: ContactFormData) => void
  updateContact: (id: string, data: Partial<Contact>) => void
  deleteContact: (id: string) => void

  // Computed
  filteredContacts: Contact[]
}

export function useContacts(options: UseContactsOptions = {}): UseContactsReturn {
  const { initialContacts = sampleContacts } = options

  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Add a new contact
  const addContact = useCallback((data: ContactFormData) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      initials: `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`.toUpperCase(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email || undefined,
      phone: data.phone || undefined,
      status: "Prospect",
      type: data.donorType === "household" ? "Household" :
            data.donorType === "foundation" ? "Foundation" : "Business",
      lifetimeGiving: 0,
      location: data.city && data.stateProvince
        ? `${data.city}, ${data.stateProvince}`
        : undefined,
      contactId: Date.now().toString().slice(-4),
    }

    setContacts(prev => [...prev, newContact])
  }, [])

  // Update an existing contact
  const updateContact = useCallback((id: string, data: Partial<Contact>) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id ? { ...contact, ...data } : contact
      )
    )

    // Update selected contact if it's the one being edited
    setSelectedContact(prev =>
      prev?.id === id ? { ...prev, ...data } : prev
    )
  }, [])

  // Delete a contact
  const deleteContact = useCallback((id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id))

    // Clear selection if the deleted contact was selected
    setSelectedContact(prev => prev?.id === id ? null : prev)
  }, [])

  // Filtered contacts based on search and status
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      // Search filter
      const matchesSearch = searchQuery === "" ||
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchQuery.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === "all" ||
        contact.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [contacts, searchQuery, statusFilter])

  return {
    // State
    contacts,
    selectedContact,
    isLoading,
    searchQuery,
    statusFilter,

    // Actions
    setSelectedContact,
    setSearchQuery,
    setStatusFilter,
    addContact,
    updateContact,
    deleteContact,

    // Computed
    filteredContacts,
  }
}
