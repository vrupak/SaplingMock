"use client"

import { useState } from "react"
import { ArrowLeft, Sparkles, Gift, TrendingUp, FileText, Calendar, Brain, MoreHorizontal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditContactOverlay } from "../edit-contact-overlay"
import { ContactProfileHeader } from "./ContactProfileHeader"
import { GivingStatisticsPanel } from "./GivingStatisticsPanel"
import { OrchidAIInsightsCard } from "./OrchidAIInsightsCard"
import { ContactSidebar } from "./ContactSidebar"
import { AtAGlanceTab, GiftsTab } from "./tabs"
import { useContactGivingStats } from "./hooks"
import type { Contact } from "./types"

interface ContactDetailViewProps {
  contact: Contact
  onBack: () => void
}

export function ContactDetailView({ contact, onBack }: ContactDetailViewProps) {
  const [editOverlayOpen, setEditOverlayOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("at-a-glance")
  const [showSidebar, setShowSidebar] = useState(false)
  const givingStats = useContactGivingStats()

  // Sidebar is always visible in At a Glance, toggle-able in other tabs
  const isSidebarVisible = activeTab === "at-a-glance" || showSidebar

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
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

      {/* Tabs Section - Docked to card below */}
      <div className="mx-24 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation - styled to dock with card below */}
          <TabsList className="w-full justify-start bg-white border border-gray-200 border-b-0 rounded-t-lg rounded-b-none p-0 h-auto">
            <TabsTrigger
              value="at-a-glance"
              className="gap-2 px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sapling-light data-[state=active]:bg-transparent data-[state=active]:text-sapling-dark data-[state=active]:font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              At a Glance
            </TabsTrigger>
            <TabsTrigger
              value="gifts"
              className="gap-2 px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sapling-light data-[state=active]:bg-transparent data-[state=active]:text-sapling-dark data-[state=active]:font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Gift className="w-4 h-4" />
              Gifts
            </TabsTrigger>
            <TabsTrigger
              value="journey"
              className="gap-2 px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sapling-light data-[state=active]:bg-transparent data-[state=active]:text-sapling-dark data-[state=active]:font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              Journey + Gift Asks
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="gap-2 px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sapling-light data-[state=active]:bg-transparent data-[state=active]:text-sapling-dark data-[state=active]:font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Notes & Tasks
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="gap-2 px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sapling-light data-[state=active]:bg-transparent data-[state=active]:text-sapling-dark data-[state=active]:font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger
              value="orchid"
              className="gap-2 px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sapling-light data-[state=active]:bg-transparent data-[state=active]:text-sapling-dark data-[state=active]:font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Brain className="w-4 h-4" />
              Orchid Insights
            </TabsTrigger>
            <TabsTrigger
              value="more"
              className="gap-2 px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sapling-light data-[state=active]:bg-transparent data-[state=active]:text-sapling-dark data-[state=active]:font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
              More
            </TabsTrigger>
          </TabsList>

          {/* Unified Container: White card wrapping sidebar + content - docked to tabs above */}
          <div className="bg-white rounded-b-lg rounded-t-none border border-gray-200 border-t-0 overflow-hidden" style={{ maxHeight: 'none' }}>
            {/* At a Glance Tab - standard flex-row layout with sidebar on left */}
            <TabsContent value="at-a-glance" className="mt-0 p-0">
              <div className="flex items-stretch">
                <ContactSidebar contact={contact} />
                <div className="flex-1 min-w-0 p-6 h-auto">
                  <AtAGlanceTab />
                </div>
              </div>
            </TabsContent>

            {/* Gifts Tab - full-width layout, sidebar renders inline when toggled */}
            <TabsContent value="gifts" className="mt-0 p-0">
              <GiftsTab
                showSidebar={showSidebar}
                onToggleSidebar={() => setShowSidebar(!showSidebar)}
                contact={contact}
              />
            </TabsContent>

            {/* Other tabs - standard flex-row layout with optional sidebar */}
            <TabsContent value="journey" className="mt-0 p-0">
              <div className={`flex ${showSidebar ? 'items-stretch' : ''}`}>
                {showSidebar && <ContactSidebar contact={contact} />}
                <div className="flex-1 min-w-0 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Journey + Gift Asks</h3>
                  <p className="text-gray-500">Donor journey and gift ask tracking will appear here.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-0 p-0">
              <div className={`flex ${showSidebar ? 'items-stretch' : ''}`}>
                {showSidebar && <ContactSidebar contact={contact} />}
                <div className="flex-1 min-w-0 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Notes & Tasks</h3>
                  <p className="text-gray-500">Notes and task management will appear here.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-0 p-0">
              <div className={`flex ${showSidebar ? 'items-stretch' : ''}`}>
                {showSidebar && <ContactSidebar contact={contact} />}
                <div className="flex-1 min-w-0 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Events</h3>
                  <p className="text-gray-500">Event attendance and registrations will appear here.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orchid" className="mt-0 p-0">
              <div className={`flex ${showSidebar ? 'items-stretch' : ''}`}>
                {showSidebar && <ContactSidebar contact={contact} />}
                <div className="flex-1 min-w-0 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Orchid Insights</h3>
                  <p className="text-gray-500">AI-powered donor insights will appear here.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="more" className="mt-0 p-0">
              <div className={`flex ${showSidebar ? 'items-stretch' : ''}`}>
                {showSidebar && <ContactSidebar contact={contact} />}
                <div className="flex-1 min-w-0 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">More Options</h3>
                  <p className="text-gray-500">Additional contact options will appear here.</p>
                </div>
              </div>
            </TabsContent>
          </div>
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
