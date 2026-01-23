"use client"

import { Mail, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Contact } from "./types"

interface ContactProfileHeaderProps {
  contact: Contact
}

export function ContactProfileHeader({ contact }: ContactProfileHeaderProps) {
  return (
    <div className="col-span-3 px-8 pb-8 border-r border-slate-100">
      {/* Avatar - reduced size */}
      <div className="w-24 h-24 bg-sapling-light/20 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl font-semibold text-sapling">{contact.initials}</span>
      </div>

      {/* Name */}
      <h1 className="text-xl font-bold text-gray-900 mb-1">{contact.name}</h1>
      <p className="text-sm text-sapling mb-4">The Jennifer Lee Charitable Fund</p>

      {/* Contact Info */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-slate-400" />
          <span>{contact.email || "jennifer.lee@email.com"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-slate-400" />
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
        <Badge className="bg-green-50 text-green-700 border border-green-100 font-normal">Household</Badge>
        <Badge className="bg-[#f0f4e8] text-[#5c6b4a] border border-[#d4dfc4] font-normal">Middle</Badge>
        <Badge className="bg-blue-50 text-blue-700 border border-blue-100 font-normal">Recurring</Badge>
      </div>
    </div>
  )
}
