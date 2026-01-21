"use client"

import { X, User, Mail, Phone, Building2, Briefcase, Calendar, Clock, Users, LogOut, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface UserProfileOverlayProps {
  open: boolean
  onClose: () => void
}

export function UserProfileOverlay({ open, onClose }: UserProfileOverlayProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Overlay Panel */}
      <div className={cn(
        "fixed top-0 right-0 z-50 w-96 h-full bg-white shadow-xl transform transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Profile Header */}
        <div className="bg-sapling pt-8 pb-6 px-6 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">aidan</h2>
          <p className="text-white/80 text-sm">System Administrator</p>
          <Badge className="mt-2 bg-orange-500 text-white border-none hover:bg-orange-600">
            Admin
          </Badge>
        </div>

        {/* Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Profile</h3>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Pencil className="w-3.5 h-3.5" />
              Edit Profile
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm text-gray-900">aidan</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="text-sm text-gray-900">aidan@thesaplinggroup.co</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="text-sm text-gray-900">(555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Organization</p>
                <p className="text-sm text-gray-900">Sample Charity</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Role/Title</p>
                <p className="text-sm text-gray-900">System Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm text-gray-900">December 13, 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Last Sign In</p>
                <p className="text-sm text-gray-900">January 20, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Access Level Details */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Access Level Details</h3>
          <div className="bg-[#8bad71]/10 rounded-lg p-4">
            <p className="text-sm">
              <span className="font-medium text-gray-900">Current Access:</span>{" "}
              <span className="text-sapling">Admin</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Full system access with ability to manage users, settings, and all data.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-3">
          <Button variant="outline" className="w-full gap-2 justify-center bg-transparent">
            <Users className="w-4 h-4" />
            Manage System Users
          </Button>
          <Button 
            variant="outline" 
            className="w-full gap-2 justify-center text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  )
}
