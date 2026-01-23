"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
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

export type TableShapeOption = "Round" | "Rectangle" | "Oval" | "Square"

export interface AddTableFormData {
  tableNumber: number
  tableName: string
  capacity: number
  shape: TableShapeOption
  notes: string
}

interface AddTableModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: AddTableFormData) => void
  nextTableNumber?: number
}

export function AddTableModal({
  open,
  onOpenChange,
  onSave,
  nextTableNumber = 1,
}: AddTableModalProps) {
  const [formData, setFormData] = useState<AddTableFormData>({
    tableNumber: nextTableNumber,
    tableName: `Table ${nextTableNumber}`,
    capacity: 8,
    shape: "Round",
    notes: "",
  })

  // Update form when nextTableNumber changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      tableNumber: nextTableNumber,
      tableName: `Table ${nextTableNumber}`,
    }))
  }, [nextTableNumber])

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
      tableNumber: nextTableNumber,
      tableName: `Table ${nextTableNumber}`,
      capacity: 8,
      shape: "Round",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[95vw] max-w-md sm:max-w-lg p-0 gap-0"
        showCloseButton={false}
      >
        {/* Visually Hidden Title for Accessibility */}
        <DialogTitle className="sr-only">Add Table</DialogTitle>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Table</h2>
              <p className="text-sm text-gray-500 mt-1">
                Configure the table settings
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors -mt-1 -mr-1"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
          {/* Table Number */}
          <div className="space-y-2">
            <Label htmlFor="tableNumber" className="text-sm font-medium text-gray-700">
              Table Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="tableNumber"
              type="number"
              min={1}
              value={formData.tableNumber}
              onChange={(e) =>
                setFormData({ ...formData, tableNumber: parseInt(e.target.value) || 1 })
              }
              required
              className="w-full border-slate-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Table Name */}
          <div className="space-y-2">
            <Label htmlFor="tableName" className="text-sm font-medium text-gray-700">
              Table Name
            </Label>
            <Input
              id="tableName"
              type="text"
              placeholder="e.g., VIP Table, Sponsors Table"
              value={formData.tableName}
              onChange={(e) =>
                setFormData({ ...formData, tableName: e.target.value })
              }
              className="w-full border-slate-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Capacity (Seats) */}
          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-sm font-medium text-gray-700">
              Capacity (Seats) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="capacity"
              type="number"
              min={1}
              max={20}
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: parseInt(e.target.value) || 1 })
              }
              required
              className="w-full border-slate-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Table Shape */}
          <div className="space-y-2">
            <Label htmlFor="tableShape" className="text-sm font-medium text-gray-700">
              Table Shape <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.shape}
              onValueChange={(value: TableShapeOption) =>
                setFormData({ ...formData, shape: value })
              }
              required
            >
              <SelectTrigger
                id="tableShape"
                className="w-full border-slate-200 focus:ring-blue-500 focus:border-blue-500"
              >
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Round">Round</SelectItem>
                <SelectItem value="Rectangle">Rectangle</SelectItem>
                <SelectItem value="Oval">Oval</SelectItem>
                <SelectItem value="Square">Square</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes
            </Label>
            <textarea
              id="notes"
              placeholder="Any special notes about this table..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                handleReset()
                onOpenChange(false)
              }}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-sapling-light hover:bg-sapling-dark text-white px-6"
            >
              Add Table
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
