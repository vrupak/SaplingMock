"use client"

import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Relationship {
  name: string
  type: string
  id: string
}

interface RelationshipsAccordionProps {
  relationships?: Relationship[]
  totalCount?: number
}

const defaultRelationships: Relationship[] = [
  { name: "Michael Lee", type: "Spouse", id: "c-102" },
  { name: "David Lee", type: "Child", id: "c-103" },
  { name: "Sarah Lee", type: "Child", id: "c-104" },
  { name: "Robert Chen", type: "Business Partner", id: "c-105" },
  { name: "Emily Watson", type: "Friend", id: "c-106" },
  { name: "James Wilson", type: "Colleague", id: "c-107" },
  { name: "Susan Park", type: "Sibling", id: "c-108" },
]

export function RelationshipsAccordion({
  relationships = defaultRelationships,
  totalCount = 33,
}: RelationshipsAccordionProps) {
  return (
    <AccordionItem value="relationships">
      <AccordionTrigger className="hover:no-underline text-lg text-sapling font-semibold">
        <div className="flex items-center gap-2">
          Relationships
          <Badge className="bg-orange-500 text-white border-none text-xs">{totalCount}</Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          {relationships.map((rel, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-2 rounded ${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sapling-light/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-sapling" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{rel.name}</p>
                  <p className="text-xs text-gray-500">ID: {rel.id}</p>
                </div>
              </div>
              <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">{rel.type}</Badge>
            </div>
          ))}
          <Button variant="link" className="text-sapling hover:text-sapling-dark p-0 h-auto text-sm">
            View all {totalCount} relationships →
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
