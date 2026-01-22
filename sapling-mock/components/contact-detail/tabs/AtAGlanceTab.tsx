"use client"

import { Accordion } from "@/components/ui/accordion"
import { ActivityTimeline } from "../../activity-timeline/ActivityTimeline"
import { IndividualsSection } from "../IndividualsSection"
import {
  WealthAccordion,
  CommunicationPreferencesAccordion,
  WorkflowsTagsAccordion,
  BiographyAccordion,
  RelationshipsAccordion,
  EmailListsAccordion,
} from "../accordions"
import type { Contact } from "../types"

interface AtAGlanceTabProps {
  contact: Contact
}

export function AtAGlanceTab({ contact }: AtAGlanceTabProps) {
  return (
    <div className="flex gap-6">
      {/* Left Column: Individuals */}
      <div className="w-[380px] flex-shrink-0 bg-white rounded-lg border border-gray-200 p-6 h-fit max-h-[calc(100vh-280px)] overflow-y-auto">
        <IndividualsSection contact={contact} />

        {/* Accordion Sections */}
        <Accordion
          type="multiple"
          defaultValue={["wealth", "communication", "workflows", "biography", "relationships", "email-lists"]}
          className="mt-6"
        >
          <WealthAccordion />
          <CommunicationPreferencesAccordion />
          <WorkflowsTagsAccordion />
          <BiographyAccordion />
          <RelationshipsAccordion />
          <EmailListsAccordion />
        </Accordion>
      </div>

      {/* Right Column: Activity Timeline */}
      <div className="flex-1 min-w-0">
        <ActivityTimeline />
      </div>
    </div>
  )
}
