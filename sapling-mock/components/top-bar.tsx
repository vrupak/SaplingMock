"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Bell, Sparkles, Plus, User, UserPlus, Gift, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TopBarProps {
  onAddContact: () => void
  onProfileClick: () => void
}

export function TopBar({ onAddContact, onProfileClick }: TopBarProps) {
  const [showAddMenu, setShowAddMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAddMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search contacts, gifts, activities..."
          className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-6">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* AI Button */}
        <button className="p-2 text-sapling hover:text-[#7a9d62] hover:bg-[#8bad71]/10 rounded-full transition-colors">
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Add Button with Dropdown */}
        <div className="relative" ref={menuRef}>
          <Button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="bg-sapling hover:bg-[#7a9d62] text-white w-9 h-9 p-0 rounded-full"
            size="icon"
          >
            <Plus className="w-5 h-5" />
          </Button>

          {/* Dropdown Menu */}
          {showAddMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={() => {
                  onAddContact()
                  setShowAddMenu(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <UserPlus className="w-5 h-5 text-gray-400" />
                Create New Contact
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Gift className="w-5 h-5 text-gray-400" />
                Add New Gift
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Download className="w-5 h-5 text-gray-400" />
                Download
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-5 h-5 text-gray-400" />
                Start Report
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <button
          onClick={onProfileClick}
          className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  )
}
