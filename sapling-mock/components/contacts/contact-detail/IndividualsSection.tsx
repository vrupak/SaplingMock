"use client"

import { Mail, Phone, Calendar, Pencil, Trash2, Plus, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Contact } from "./types"

interface IndividualsSectionProps {
  contact: Contact
}

export function IndividualsSection({ contact }: IndividualsSectionProps) {
  return (
    <div>
      {/* Header with Add Individual button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-sapling">Individuals</h3>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-sapling hover:text-sapling-accent hover:bg-sapling-light/10 h-8 px-3"
        >
          <Plus className="w-4 h-4" />
          Add Individual
        </Button>
      </div>

      {/* Individual Card - Always visible */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="border-l-4 border-sapling p-4">
          {/* Name and Actions Row */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="font-semibold text-gray-900">{contact.name || "Jennifer Lee"}</p>
              <p className="text-sm text-sapling font-medium">Primary</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <Pencil className="w-4 h-4 text-sapling" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{contact.email || "jennifer.lee@email.com"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{contact.phone || "(206) 555-0103"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>June 9, 1985</span>
            </div>
          </div>

          {/* ID */}
          <p className="text-sm text-gray-400 mt-3">ID: 1a</p>
        </div>
      </div>

      {/* Generate Contact Information Button */}
      <button className="w-full mt-4 py-2.5 px-4 flex items-center justify-center gap-2 text-sm text-sapling font-medium bg-sapling-light/10 hover:bg-sapling-light/20 border border-sapling-light/30 rounded-lg transition-colors">
        <Wand2 className="w-3.5 h-3.5" />
        Generate Potential Contact Information
      </button>
    </div>
  )
}
