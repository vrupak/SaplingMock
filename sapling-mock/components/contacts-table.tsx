"use client"

import { useState } from "react"
import { Search, Filter, Sparkles, Map, Mail, Phone, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface Contact {
  id: string
  initials: string
  name: string
  subtitle?: string
  email?: string
  phone?: string
  status: "Active" | "Recurring" | "Prospect"
  type: "Household" | "Foundation" | "Business"
  lifetimeGiving: number
  location?: string
  contactId: string
}

interface ContactsTableProps {
  contacts: Contact[]
  onContactClick: (contact: Contact) => void
}

const statusColors = {
  Active: "bg-[#8bad71]/10 text-sapling border-[#8bad71]/30",
  Recurring: "bg-amber-50 text-amber-700 border-amber-200",
  Prospect: "bg-orange-50 text-orange-700 border-orange-200",
}

const typeColors = {
  Household: "bg-[#8bad71]/10 text-sapling border-[#8bad71]/30",
  Foundation: "bg-blue-50 text-blue-700 border-blue-200",
  Business: "bg-purple-50 text-purple-700 border-purple-200",
}

export function ContactsTable({ contacts, onContactClick }: ContactsTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const allSelected = contacts.length > 0 && selectedIds.size === contacts.length
  const someSelected = selectedIds.size > 0 && selectedIds.size < contacts.length

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(contacts.map(c => c.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSet = new Set(selectedIds)
    if (checked) {
      newSet.add(id)
    } else {
      newSet.delete(id)
    }
    setSelectedIds(newSet)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Search and Filter Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search contacts by name or email..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="recurring">Recurring</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
            <Button variant="outline" className="gap-2 border-[#8bad71]/30 text-sapling hover:bg-[#8bad71]/10 bg-transparent">
              <Sparkles className="w-4 h-4" />
              Orchid AI Filter
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Map className="w-4 h-4" />
              Maps
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 py-3 text-sm text-gray-500 border-b border-gray-100">
        Showing {contacts.length} of {contacts.length} contacts
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => handleSelectAll(checked === true)}
                  className={someSelected ? "data-[state=unchecked]:bg-gray-300" : ""}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lifetime Giving
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact ID
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onContactClick(contact)}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.has(contact.id)}
                    onCheckedChange={(checked) => handleSelectOne(contact.id, checked === true)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0",
                      contact.status === "Active" ? "bg-[#8bad71]/20 text-sapling" :
                      contact.status === "Recurring" ? "bg-amber-100 text-amber-700" :
                      "bg-orange-100 text-orange-700"
                    )}>
                      {contact.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        {contact.subtitle && (
                          <span className="text-xs text-gray-400">({contact.subtitle})</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {contact.email}
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {contact.phone}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Badge className={cn("font-normal", statusColors[contact.status])}>
                    {contact.status}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <Badge className={cn("font-normal", typeColors[contact.type])}>
                    {contact.type}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-gray-900">
                    <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-medium">${contact.lifetimeGiving.toLocaleString()}.00</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-600">
                  {contact.location || "-"}
                </td>
                <td className="px-4 py-4 text-gray-500">
                  {contact.contactId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
