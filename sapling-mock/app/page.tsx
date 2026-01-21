"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { MetricCards, SecondaryMetricCards } from "@/components/metric-cards"
import { ContactsTable, type Contact } from "@/components/contacts-table"
import { ContactDetailView } from "@/components/contact-detail-view"
import { AddContactModal } from "@/components/add-contact-modal"
import { UserProfileOverlay } from "@/components/user-profile-overlay"
import { Button } from "@/components/ui/button"
import { Download, MoreVertical, Plus } from "lucide-react"

// Sample contacts data matching the screenshots
const sampleContacts: Contact[] = [
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
]

type View = "contacts" | "contact-detail"

export default function SaplingCRM() {
  const [activeNav, setActiveNav] = useState("contacts")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentView, setCurrentView] = useState<View>("contacts")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [addContactModalOpen, setAddContactModalOpen] = useState(false)
  const [profileOverlayOpen, setProfileOverlayOpen] = useState(false)

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact)
    setCurrentView("contact-detail")
  }

  const handleBackToContacts = () => {
    setSelectedContact(null)
    setCurrentView("contacts")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeNav}
        onItemClick={setActiveNav}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          onAddContact={() => setAddContactModalOpen(true)}
          onProfileClick={() => setProfileOverlayOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {currentView === "contacts" ? (
            <div className="py-6 px-24">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
                  <p className="text-gray-500 mt-1">Manage your donors and constituents</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Import
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <MoreVertical className="w-4 h-4" />
                    Actions
                  </Button>
                  <Button 
                    className="bg-sapling hover:bg-sapling-dark text-white gap-2"
                    onClick={() => setAddContactModalOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Add Contact
                  </Button>
                </div>
              </div>

              {/* Metric Cards */}
              <MetricCards />

              {/* Contacts Table */}
              <ContactsTable
                contacts={sampleContacts}
                onContactClick={handleContactClick}
              />
            </div>
          ) : (
            selectedContact && (
              <ContactDetailView
                contact={selectedContact}
                onBack={handleBackToContacts}
              />
            )
          )}
        </main>
      </div>

      {/* Modals and Overlays */}
      <AddContactModal
        open={addContactModalOpen}
        onOpenChange={setAddContactModalOpen}
        onSave={(data) => {
          console.log("New contact:", data)
          setAddContactModalOpen(false)
        }}
      />

      <UserProfileOverlay
        open={profileOverlayOpen}
        onClose={() => setProfileOverlayOpen(false)}
      />
    </div>
  )
}
