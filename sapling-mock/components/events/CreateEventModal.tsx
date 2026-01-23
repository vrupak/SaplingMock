"use client"

import { useState } from "react"
import { CalendarIcon, Sparkles, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { EventFormData } from "./types"

interface CreateEventModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (event: EventFormData) => void
}

export function CreateEventModal({
  open,
  onOpenChange,
  onSave,
}: CreateEventModalProps) {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    type: "",
    status: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venueName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    capacity: "",
    ticketPrice: "",
    fundraisingGoal: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData)
    }
    handleReset()
    onOpenChange(false)
  }

  const handleReset = () => {
    setFormData({
      name: "",
      type: "",
      status: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      venueName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      capacity: "",
      ticketPrice: "",
      fundraisingGoal: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-xl sm:max-w-2xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-hidden p-0" showCloseButton={false}>
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Create Event</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Plan your next fundraiser, gala, or community event
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-164px)] px-6 py-6 space-y-6">
          {/* Event Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Event Details</h3>

            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-sm font-medium text-gray-700">
                Event Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="eventName"
                placeholder="Annual Gala Dinner"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventType" className="text-sm font-medium text-gray-700">
                  Event Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  required
                >
                  <SelectTrigger id="eventType" className="w-full">
                    <SelectValue placeholder="Gala" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gala">Gala</SelectItem>
                    <SelectItem value="Auction">Auction</SelectItem>
                    <SelectItem value="Fundraiser">Fundraiser</SelectItem>
                    <SelectItem value="Stewardship">Stewardship</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                  required
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Planning" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <textarea
                id="description"
                placeholder="Join us for an elegant evening of dinner, entertainment, and fundraising..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Date & Time Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Date & Time</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-sm font-medium text-gray-700">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Location</h3>

            <div className="space-y-2">
              <Label htmlFor="venueName" className="text-sm font-medium text-gray-700">
                Venue Name
              </Label>
              <Input
                id="venueName"
                placeholder="Grand Ballroom, Civic Center"
                value={formData.venueName}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Address
              </Label>
              <Input
                id="address"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="Springfield"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                  State/Province
                </Label>
                <Input
                  id="state"
                  placeholder="IL"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                Postal Code
              </Label>
              <Input
                id="postalCode"
                placeholder="62701"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
            </div>
          </div>

          {/* Event Details - Capacity & Goals */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Capacity & Goals</h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-sm font-medium text-gray-700">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="300"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticketPrice" className="text-sm font-medium text-gray-700">
                  Ticket Price ($)
                </Label>
                <Input
                  id="ticketPrice"
                  type="number"
                  step="0.01"
                  placeholder="250.00"
                  value={formData.ticketPrice}
                  onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundraisingGoal" className="text-sm font-medium text-gray-700">
                  Fundraising Goal ($)
                </Label>
                <Input
                  id="fundraisingGoal"
                  type="number"
                  step="0.01"
                  placeholder="150000.00"
                  value={formData.fundraisingGoal}
                  onChange={(e) => setFormData({ ...formData, fundraisingGoal: e.target.value })}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                handleReset()
                onOpenChange(false)
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-sapling-light hover:bg-sapling-dark text-white"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
