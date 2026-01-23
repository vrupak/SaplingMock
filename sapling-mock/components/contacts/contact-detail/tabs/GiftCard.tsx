"use client"

import {
  Gift,
  Calendar,
  Clock,
  Pencil,
  RefreshCw,
  CreditCard,
  Leaf,
  Building2,
  Receipt,
  Flag,
  FileCheck,
  Lock,
  StickyNote,
  FileText,
  MoreVertical,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface GiftData {
  id: string
  amount: string
  donorName: string
  status: "Received" | "Pending" | "Declined"
  isRecurring?: boolean
  paymentMethod: string
  source: string
  fund: string
  receiptType: string
  date: string
  time: string
  lastEditedBy: string
  lastEditedDate: string
  passthrough?: { name: string; id: string } | null
  campaign?: string
  segment?: string
  tributes?: string
  taxDeductible: string
  nonTaxDeductible: string
  receipted: string
  restrictions: string
  notes: string
  bgColor?: "white" | "gray"
}

interface GiftCardProps {
  gift: GiftData
}

export function GiftCard({ gift }: GiftCardProps) {
  const bgClass = gift.bgColor === "gray" ? "bg-gray-50" : "bg-white"

  return (
    <div className="relative flex">
      <div className="absolute left-0 top-8 w-3 h-3 bg-sapling-light rounded-full z-10" />
      <div className={`ml-6 flex-1 ${bgClass} border border-gray-200 rounded-lg p-5`}>
        {/* Gift Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Gift className="w-5 h-5 text-sapling" />
            <span className="text-xl font-bold text-gray-900">{gift.amount}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-700">{gift.donorName}</span>
            <Badge className="bg-green-50 text-green-700 border-green-200">{gift.status}</Badge>
            {gift.isRecurring && (
              <Badge className="bg-sapling-light/10 text-sapling border-sapling-light/30 gap-1">
                <RefreshCw className="w-3 h-3" />
                Recurring
              </Badge>
            )}
            <Badge className="bg-gray-100 text-gray-700 border-gray-200 gap-1">
              <CreditCard className="w-3 h-3" />
              {gift.paymentMethod}
            </Badge>
            <Badge className="bg-gray-100 text-gray-700 border-gray-200 gap-1">
              <Leaf className="w-3 h-3" />
              {gift.source}
            </Badge>
            <Badge className="bg-gray-100 text-gray-700 border-gray-200 gap-1">
              <Building2 className="w-3 h-3" />
              {gift.fund}
            </Badge>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-sm text-sapling flex items-center gap-1">
              <Receipt className="w-4 h-4" />
              Receipt type: {gift.receiptType}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Flag className="w-4 h-4" />
              Gift ID: {gift.id}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Gift Details Row 1 */}
        <div className="flex items-center gap-6 text-sm text-gray-600 mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            Date: {gift.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-400" />
            Time: {gift.time}
          </span>
        </div>

        {/* Gift Details Row 2 */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Pencil className="w-4 h-4 text-gray-400" />
              Last edited by: {gift.lastEditedBy}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              Last edited: {gift.lastEditedDate}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <FileCheck className="w-4 h-4 text-gray-400" />
            Passthrough:{" "}
            {gift.passthrough ? (
              <>
                <span className="text-sapling hover:underline cursor-pointer ml-1">
                  {gift.passthrough.name}
                </span>{" "}
                <span className="text-gray-400">(ID: {gift.passthrough.id})</span>
              </>
            ) : (
              <span className="font-medium ml-1">None</span>
            )}
          </span>
        </div>

        {/* Gift Details Box */}
        <div className={`${gift.bgColor === "gray" ? "bg-white" : "bg-gray-50"} border-l-4 border-gray-200 p-4 mb-4`}>
          <div className="flex justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <FileText className="w-4 h-4 text-gray-400" />
                Campaign: <span className="font-medium ml-1">{gift.campaign || "None"}</span>
                {gift.segment && (
                  <>
                    <span className="mx-1">•</span> Segment:{" "}
                    <span className="text-gray-500 ml-1">{gift.segment}</span>
                  </>
                )}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Flag className="w-4 h-4 text-gray-400" />
                Tributes: <span className="font-medium ml-1">{gift.tributes || "None"}</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <CreditCard className="w-4 h-4 text-gray-400" />
                Tax deductible amount: <span className="font-medium ml-1">{gift.taxDeductible}</span>{" "}
                <span className="mx-2">•</span> Non-tax-deductible amount:{" "}
                <span className="font-medium ml-1">{gift.nonTaxDeductible}</span>
              </p>
            </div>
            <div className="text-right space-y-2">
              <p className="text-sm text-gray-600 flex items-center justify-end gap-1">
                <FileCheck className="w-4 h-4 text-gray-400" />
                Receipted: <span className="font-medium ml-1">{gift.receipted}</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center justify-end gap-1">
                <Lock className="w-4 h-4 text-gray-400" />
                Restrictions: <span className="font-medium ml-1">{gift.restrictions}</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center justify-end gap-1">
                <StickyNote className="w-4 h-4 text-gray-400" />
                Notes: <span className="font-medium ml-1">{gift.notes}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Manage Recurring Gift Button */}
        {gift.isRecurring && (
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="w-4 h-4" />
            Manage Recurring Gift
          </Button>
        )}
      </div>
    </div>
  )
}
