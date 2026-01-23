"use client"

import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface EmailListsAccordionProps {
  lists?: string[]
  totalCount?: number
}

const defaultLists = [
  "Monthly Newsletter",
  "Annual Report Recipients",
  "Event Invitations - Gala",
  "Major Donor Updates",
  "Capital Campaign Updates",
  "Board Communications",
  "Legacy Society Members",
]

export function EmailListsAccordion({
  lists = defaultLists,
  totalCount = 19,
}: EmailListsAccordionProps) {
  return (
    <AccordionItem value="email-lists">
      <AccordionTrigger className="hover:no-underline text-lg text-sapling font-semibold">
        <div className="flex items-center gap-2">
          Email Lists
          <Badge className="bg-sapling-light/20 text-sapling border-none text-xs">{totalCount}</Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          {lists.map((list, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-2 rounded ${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <p className="text-sm text-gray-700">{list}</p>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          ))}
          <Button variant="link" className="text-sapling hover:text-sapling-dark p-0 h-auto text-sm">
            View all {totalCount} lists →
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
