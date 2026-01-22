"use client"

import { Mail, Phone, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Contact } from "./types"

interface ContactProfileHeaderProps {
  contact: Contact
  onEditClick: () => void
}

export function ContactProfileHeader({ contact, onEditClick }: ContactProfileHeaderProps) {
  return (
    <div className="flex-shrink-0 min-w-[220px] pr-12 border-r border-gray-200">
      {/* Top Row: Sample Charity + Contact ID */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-sapling font-medium">Sample Charity</p>
          <p className="text-xs text-gray-400">Contact ID: {contact.contactId}</p>
        </div>
        <button
          onClick={onEditClick}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Pencil className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Avatar */}
      <div className="w-28 h-28 bg-sapling-light/20 rounded-full flex items-center justify-center mb-5">
        <span className="text-4xl font-semibold text-sapling">{contact.initials}</span>
      </div>

      {/* Name */}
      <h1 className="text-xl font-bold text-gray-900 mb-1">{contact.name}</h1>
      <p className="text-sm text-sapling mb-4">The Jennifer Lee Charitable Fund</p>

      {/* Contact Info */}
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

      {/* Address */}
      <div className="mt-5 text-sm text-gray-600 leading-relaxed">
        <p>456 Maple Drive</p>
        <p>Apt 12B</p>
        <p>Seattle, WA 98101-1234</p>
        <p>King County, USA</p>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mt-5">
        <Badge className="bg-sapling-light/10 text-sapling border-sapling-light/30 font-normal">Household</Badge>
        <Badge className="bg-amber-50 text-amber-700 border-amber-200 font-normal">Middle</Badge>
        <Badge className="bg-sapling-light/10 text-sapling border-sapling-light/30 font-normal">Recurring</Badge>
      </div>
    </div>
  )
}
