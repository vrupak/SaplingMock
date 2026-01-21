"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Pencil, Sparkles, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ActivityTimeline } from "./activity-timeline"
import { EditContactOverlay } from "./edit-contact-overlay"
import type { Contact } from "./contacts-table"

interface ContactDetailViewProps {
  contact: Contact
  onBack: () => void
}

export function ContactDetailView({ contact, onBack }: ContactDetailViewProps) {
  const [editOverlayOpen, setEditOverlayOpen] = useState(false)

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
      <div className="mx-24 mb-6 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col xl:flex-row items-start gap-8">
          {/* Left: Avatar and Info */}
          <div className="flex-shrink-0 min-w-[200px]">
            <div className="text-xs text-sapling mb-1">Sample Charity</div>
            <div className="text-xs text-gray-400 mb-4">Contact ID: {contact.contactId}</div>
            
            <div className="w-24 h-24 bg-[#8bad71]/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-semibold text-sapling">{contact.initials}</span>
            </div>

            <h1 className="text-xl font-semibold text-gray-900">{contact.name}</h1>
            <p className="text-sm text-sapling mb-4">The Jennifer Lee Charitable Fund</p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{contact.email || "jennifer.lee@email.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{contact.phone || "(206) 555-0103"}</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>456 Maple Drive</p>
              <p>Apt 12B</p>
              <p>Seattle, WA 98101-1234</p>
              <p>King County, USA</p>
            </div>

            <div className="flex gap-2 mt-4">
              <Badge className="bg-[#8bad71]/10 text-sapling border-[#8bad71]/30">Household</Badge>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200">Middle</Badge>
              <Badge className="bg-[#8bad71]/10 text-sapling border-[#8bad71]/30">Recurring</Badge>
            </div>
          </div>

          {/* Middle: Giving Stats */}
          <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Year Giving */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Current Year Giving</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Last Gift Amount</p>
                  <p className="text-lg font-semibold text-gray-900">$500.00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Gift Date</p>
                  <p className="text-lg font-semibold text-gray-900">October 31, 2024</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Year to Date Giving</p>
                  <p className="text-lg font-semibold text-gray-900">$2,400.00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500"># of Gifts this Year</p>
                  <p className="text-lg font-semibold text-gray-900">5</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Giving this Month</p>
                  <p className="text-lg font-semibold text-gray-900">$500.00</p>
                </div>
              </div>
            </div>

            {/* Lifetime Giving */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Lifetime Giving</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Life to Date Giving</p>
                  <p className="text-lg font-semibold text-gray-900">$8,500.00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Best Gift Year Amount</p>
                  <p className="text-lg font-semibold text-gray-900">$3,000.00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Best Gift Year Year</p>
                  <p className="text-lg font-semibold text-gray-900">2023</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Largest Gift Amount</p>
                  <p className="text-lg font-semibold text-gray-900">$1,000.00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Largest Gift Date</p>
                  <p className="text-lg font-semibold text-gray-900">December 14, 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: AI Insights */}
          <div className="w-72 flex-shrink-0 border-l border-gray-200 pl-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sapling" />
                <h3 className="font-semibold text-sapling">Orchid AI Insight</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => setEditOverlayOpen(true)}
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </Button>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-sapling mt-1.5 flex-shrink-0" />
                <span className="text-gray-700">Consistent quarterly donor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span className="text-gray-700">Year-end outreach recommended</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span className="text-gray-700">94% retention probability</span>
              </li>
            </ul>

            <div className="mt-6 space-y-3">
              <div>
                <p className="text-xs text-gray-500">Major Gifts Assigned Contact</p>
                <p className="text-sm font-medium text-gray-900">Alex Russo</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Asks</p>
                  <p className="text-sm font-medium text-gray-900">$5,000.00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pledges</p>
                  <p className="text-sm font-medium text-gray-900">$2,500.00</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Fulfilled</p>
                  <p className="text-sm font-medium text-gray-900">$7,000.00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Outstanding</p>
                  <p className="text-sm font-medium text-gray-900">$500.00</p>
                </div>
              </div>
            </div>

          </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Individuals */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Individuals</h3>
                  <Button variant="ghost" size="sm" className="gap-2 text-sapling hover:text-[#7a9d62] hover:bg-[#8bad71]/10">
                    <Plus className="w-4 h-4" />
                    Add Individual
                  </Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-500">Primary</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Pencil className="w-3.5 h-3.5 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span>{contact.email || "jennifer.lee@email.com"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{contact.phone || "(206) 555-0103"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>June 9, 1985</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">ID: 1a</p>
                </div>

                <Button variant="outline" className="w-full mt-4 gap-2 border-dashed bg-transparent">
                  <Sparkles className="w-4 h-4" />
                  Generate Potential Contact Information
                </Button>

                {/* Accordion Sections */}
                <Accordion type="multiple" className="mt-6">
                  <AccordionItem value="wealth">
                    <AccordionTrigger className="hover:no-underline">
                      Wealth
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-500">Wealth screening information will appear here.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="communication">
                    <AccordionTrigger className="hover:no-underline">
                      Communication Preferences
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-500">Communication preferences will appear here.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="workflows">
                    <AccordionTrigger className="hover:no-underline">
                      Workflows and Tags
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-500">Workflow and tag information will appear here.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="biography">
                    <AccordionTrigger className="hover:no-underline">
                      Biography and Research
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-500">Biography and research notes will appear here.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="relationships">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        Relationships
                        <Badge className="bg-[#8bad71]/20 text-sapling border-none text-xs">33</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-500">Relationship connections will appear here.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="email-lists">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        Email Lists
                        <Badge className="bg-[#8bad71]/20 text-sapling border-none text-xs">19</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-500">Email list subscriptions will appear here.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Right Column: Activity Timeline */}
              <div className="lg:col-span-2">
                <ActivityTimeline />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gifts" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Gift History</h3>
              <p className="text-gray-500">Gift history and donation records will appear here.</p>
            </div>
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
