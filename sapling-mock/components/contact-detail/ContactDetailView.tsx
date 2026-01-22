"use client"

import { useState } from "react"
import { ArrowLeft, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditContactOverlay } from "../edit-contact-overlay"
import { ContactProfileHeader } from "./ContactProfileHeader"
import { GivingStatisticsPanel } from "./GivingStatisticsPanel"
import { OrchidAIInsightsCard } from "./OrchidAIInsightsCard"
import { AtAGlanceTab, GiftsTab } from "./tabs"
import { useContactGivingStats } from "./hooks"
import type { Contact } from "./types"

interface ContactDetailViewProps {
  contact: Contact
  onBack: () => void
}

export function ContactDetailView({ contact, onBack }: ContactDetailViewProps) {
  const [editOverlayOpen, setEditOverlayOpen] = useState(false)
  const givingStats = useContactGivingStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="px-24 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Contacts</span>
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="mx-24 mb-6 bg-white rounded-lg border border-gray-200 p-8 relative">
        <div className="flex flex-col xl:flex-row items-stretch gap-12">
          <ContactProfileHeader contact={contact} onEditClick={() => setEditOverlayOpen(true)} />
          <GivingStatisticsPanel stats={givingStats} />
          <OrchidAIInsightsCard />
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mx-24 pb-6">
        <Tabs defaultValue="at-a-glance" className="w-full">
          <TabsList className="w-full justify-start bg-white border border-gray-200 rounded-lg p-1 h-auto">
            <TabsTrigger value="at-a-glance" className="gap-2 data-[state=active]:bg-gray-100">
              <Sparkles className="w-4 h-4" />
              At a Glance
            </TabsTrigger>
            <TabsTrigger value="gifts" className="gap-2 data-[state=active]:bg-gray-100">
              Gifts
            </TabsTrigger>
            <TabsTrigger value="journey" className="gap-2 data-[state=active]:bg-gray-100">
              Journey + Gift Asks
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2 data-[state=active]:bg-gray-100">
              Notes & Tasks
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2 data-[state=active]:bg-gray-100">
              Events
            </TabsTrigger>
            <TabsTrigger value="orchid" className="gap-2 data-[state=active]:bg-gray-100">
              Orchid Insights
            </TabsTrigger>
            <TabsTrigger value="more" className="gap-2 data-[state=active]:bg-gray-100">
              More
            </TabsTrigger>
          </TabsList>

          <TabsContent value="at-a-glance" className="mt-6">
            <AtAGlanceTab contact={contact} />
          </TabsContent>

          <TabsContent value="gifts" className="mt-6">
            <GiftsTab />
          </TabsContent>

          <TabsContent value="journey" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Journey + Gift Asks</h3>
              <p className="text-gray-500">Donor journey and gift ask tracking will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Notes & Tasks</h3>
              <p className="text-gray-500">Notes and task management will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Events</h3>
              <p className="text-gray-500">Event attendance and registrations will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="orchid" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Orchid Insights</h3>
              <p className="text-gray-500">AI-powered donor insights will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="more" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">More Options</h3>
              <p className="text-gray-500">Additional contact options will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Contact Overlay */}
      <EditContactOverlay
        open={editOverlayOpen}
        onClose={() => setEditOverlayOpen(false)}
        contact={contact}
        onSave={(data) => {
          console.log("Updated contact:", data)
        }}
      />
    </div>
  )
}
