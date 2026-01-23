"use client"

import { useState } from "react"
import { Mail, Send, Sparkles, AlertTriangle, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
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
import type { Event } from "../types"

interface EmailAttendeesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: Event
  attendeeCount: number
  onSendEmail?: (data: EmailData) => void
}

interface EmailData {
  recipients: string
  subject: string
  message: string
}

export function EmailAttendeesModal({
  open,
  onOpenChange,
  event,
  attendeeCount,
  onSendEmail,
}: EmailAttendeesModalProps) {
  const [formData, setFormData] = useState<EmailData>({
    recipients: "all",
    subject: `Update: ${event.name}`,
    message: `Dear [Attendee Name],

We're excited to see you at ${event.name}!

[Your message here...]

Best regards,
[Organization Name]`,
  })

  const handleSendEmail = () => {
    if (onSendEmail) {
      onSendEmail(formData)
    }
    handleClose()
  }

  const handlePreviewEmail = () => {
    // In a real implementation, this would open a preview modal
    console.log("Preview email:", formData)
  }

  const handleClose = () => {
    setFormData({
      recipients: "all",
      subject: `Update: ${event.name}`,
      message: `Dear [Attendee Name],

We're excited to see you at ${event.name}!

[Your message here...]

Best regards,
[Organization Name]`,
    })
    onOpenChange(false)
  }

  const getRecipientCount = () => {
    switch (formData.recipients) {
      case "all":
        return attendeeCount
      case "confirmed":
        return Math.floor(attendeeCount * 0.8) // Mock calculation
      case "pending":
        return Math.floor(attendeeCount * 0.2) // Mock calculation
      case "not_checked_in":
        return attendeeCount // Before event, no one checked in
      default:
        return attendeeCount
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] overflow-hidden p-0"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">Email Attendees</DialogTitle>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Email Attendees
                </h2>
                <p className="text-sm text-gray-500">
                  Send a message to event participants
                </p>
              </div>
            </div>
            <button
              type="button"
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-4 space-y-4 overflow-y-auto max-h-[calc(90vh-220px)]">
          {/* Recipients Info Box */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Recipients</p>
              <p className="text-sm text-blue-700">
                This email will be sent to {getRecipientCount()} attendees
              </p>
            </div>
          </div>

          {/* Send To Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="recipients" className="text-sm font-medium text-gray-700">
              Send To <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.recipients}
              onValueChange={(value) =>
                setFormData({ ...formData, recipients: value })
              }
            >
              <SelectTrigger id="recipients" className="w-full">
                <SelectValue placeholder="Select recipients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Attendees ({attendeeCount})</SelectItem>
                <SelectItem value="confirmed">
                  Confirmed Only ({Math.floor(attendeeCount * 0.8)})
                </SelectItem>
                <SelectItem value="pending">
                  Pending Only ({Math.floor(attendeeCount * 0.2)})
                </SelectItem>
                <SelectItem value="not_checked_in">
                  Not Checked In ({attendeeCount})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject Line */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
              Subject Line <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Enter email subject"
            />
          </div>

          {/* Message Body */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter your message..."
            />
            <p className="text-xs text-gray-500">
              Tip: Use [Attendee Name] to personalize each email
            </p>
          </div>

          {/* Preview Warning - Yellow-tinted box */}
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">
                Preview Before Sending
              </h4>
              <p className="text-sm text-yellow-700 mt-0.5">
                This action will send emails to all selected recipients. Make sure to
                review your message carefully.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handlePreviewEmail}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <Eye className="w-4 h-4" />
            Preview Email
          </button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={!formData.subject.trim() || !formData.message.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Send className="w-4 h-4" />
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
