"use client"

import { useState } from "react"
import { Copy, Check, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Event } from "../types"

interface EventInviteLinkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: Event
}

export function EventInviteLinkModal({
  open,
  onOpenChange,
  event,
}: EventInviteLinkModalProps) {
  const [copied, setCopied] = useState(false)

  // Generate the registration URL based on event ID
  const registrationUrl = `https://fromsapling.com/events/${event.id}/register`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(registrationUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={true}>
        <DialogTitle className="sr-only">Event Invite Link</DialogTitle>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Event Invite Link</h2>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          Share this link to invite people to register for {event.name}
        </p>

        {/* URL Copy Field */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="text-sm text-gray-700 break-all">{registrationUrl}</span>
          </div>
          <Button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        {/* How to use this link - Blue-tinted info box */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">How to use this link:</h4>
          <ul className="text-sm text-blue-800 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              Share via email, social media, or text message
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              Add to your website or event page
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              Include in printed materials with a QR code
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              Track registrations in real-time
            </li>
          </ul>
        </div>

        {/* Registration Page Active Status - Green-tinted box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-green-900">Registration Page Active</h4>
            <p className="text-sm text-green-700 mt-0.5">
              This link will take registrants to a dedicated page where they can sign up for your event
            </p>
          </div>
        </div>

        {/* Done Button */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
