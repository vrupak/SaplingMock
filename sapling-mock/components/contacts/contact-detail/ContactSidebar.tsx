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
    <div className="w-[380px] flex-shrink-0 p-6 border-r border-sapling-light/20">
      <IndividualsSection contact={contact} />

      {/* Accordion Sections - All Collapsed by Default */}
      <Accordion
        type="multiple"
        defaultValue={[]}
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
