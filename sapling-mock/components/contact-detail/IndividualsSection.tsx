"use client"

import { useState } from "react"
import { Mail, Phone, Calendar, Pencil, Sparkles, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Contact } from "./types"

interface IndividualsSectionProps {
  contact: Contact
}

export function IndividualsSection({ contact }: IndividualsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <h3 className="font-semibold text-gray-900">Individuals</h3>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <>
          <Button variant="ghost" size="sm" className="gap-2 text-sapling hover:text-sapling-accent hover:bg-sapling-light/10 mb-4">
            <Plus className="w-4 h-4" />
            Add Individual
          </Button>

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
        </>
      )}
    </div>
  )
}
