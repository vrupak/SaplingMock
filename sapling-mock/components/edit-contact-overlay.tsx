"use client"

import { useState } from "react"
import { X, ChevronDown, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Contact } from "./contacts-table"

interface EditContactOverlayProps {
  open: boolean
  onClose: () => void
  contact: Contact
  onSave: (data: Partial<Contact>) => void
}

export function EditContactOverlay({ open, onClose, contact, onSave }: EditContactOverlayProps) {
  const [contactType, setContactType] = useState(contact.type)
  const [familyName, setFamilyName] = useState(contact.name.split(" ").pop() || "")
  const [prefix, setPrefix] = useState("")
  const [suffix, setSuffix] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [nickname, setNickname] = useState("")
  const [informalName, setInformalName] = useState(contact.name.split(" ")[0] || "")
  const [formalName, setFormalName] = useState(contact.name)
  const [streetAddress, setStreetAddress] = useState("456 Maple Drive")
  const [addressLine2, setAddressLine2] = useState("Apt 12B")
  const [city, setCity] = useState(contact.location?.split(", ")[0] || "Seattle")
  const [state, setState] = useState(contact.location?.split(", ")[1] || "WA")
  const [zipCode, setZipCode] = useState("98101-1234")
  const [tags, setTags] = useState<string[]>(["Board Member", "Annual Gala Attendee"])

  if (!open) return null

  const handleSave = () => {
    onSave({
      name: formalName,
      type: contactType,
      location: `${city}, ${state}`,
    })
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Overlay Panel */}
      <div className={cn(
        "fixed top-0 right-0 z-50 w-[480px] h-full bg-white shadow-xl transform transition-transform duration-300 overflow-y-auto",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Edit Contact</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Type
            </label>
            <Select value={contactType} onValueChange={(value: "Household" | "Foundation" | "Business") => setContactType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Household">Household</SelectItem>
                <SelectItem value="Foundation">Foundation</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Name Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Name Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Prefix</label>
                <Input
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="Mr., Mrs., Dr."
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Family Name</label>
                <Input
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Suffix</label>
                <Input
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  placeholder="Jr., Sr., III"
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Middle Name</label>
                <Input
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Nickname</label>
                <Input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Informal Name</label>
                <Input
                  value={informalName}
                  onChange={(e) => setInformalName(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Formal Name</label>
                <Input
                  value={formalName}
                  onChange={(e) => setFormalName(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Street Address</label>
                <Input
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Address Line 2</label>
                <Input
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Apt, Suite, Unit"
                  className="bg-gray-50"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">City</label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">State</label>
                  <Input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Zip Code</label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Individual Selector */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Individual</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#8bad71]/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-sapling">{contact.initials}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <Badge className="bg-[#8bad71]/10 text-sapling border-[#8bad71]/30 text-xs mt-1">
                      Primary
                    </Badge>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 cursor-pointer"
                >
                  {tag}
                  <button
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="ml-1 hover:text-gray-900"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="gap-1 h-6 text-xs bg-transparent"
                onClick={() => setTags([...tags, "New Tag"])}
              >
                <Plus className="w-3 h-3" />
                Add Tag
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-sapling hover:bg-sapling-dark text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </>
  )
}
