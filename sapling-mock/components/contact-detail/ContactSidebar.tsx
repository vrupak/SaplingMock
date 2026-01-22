"use client"

import { Accordion } from "@/components/ui/accordion"
import { IndividualsSection } from "./IndividualsSection"
import {
  WealthAccordion,
  CommunicationPreferencesAccordion,
  WorkflowsTagsAccordion,
  BiographyAccordion,
  RelationshipsAccordion,
  EmailListsAccordion,
} from "./accordions"
import type { Contact } from "./types"

interface ContactSidebarProps {
  contact: Contact
}

export function ContactSidebar({ contact }: ContactSidebarProps) {
  return (
    <div className="w-[380px] flex-shrink-0 p-6 border-r border-gray-200">
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
  )
}
