"use client"

import { useState, useMemo } from "react"
import { X, Upload, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type BulkTableShape = "Round" | "Rectangle"

export interface TableLayoutFormData {
  numberOfTables: number
  capacityPerTable: number
  shape: BulkTableShape
  gridColumns: number
  spacing: number
}

interface TableLayoutGeneratorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate?: (data: TableLayoutFormData) => void
  onImportBlueprint?: () => void
  onAIBuilder?: () => void
}

export function TableLayoutGeneratorModal({
  open,
  onOpenChange,
  onGenerate,
  onImportBlueprint,
  onAIBuilder,
}: TableLayoutGeneratorModalProps) {
  const [formData, setFormData] = useState<TableLayoutFormData>({
    numberOfTables: 10,
    capacityPerTable: 10,
    shape: "Round",
    gridColumns: 4,
    spacing: 350,
  })

  // Calculate preview info
  const previewInfo = useMemo(() => {
    const rows = Math.ceil(formData.numberOfTables / formData.gridColumns)
    const shapeLabel = formData.shape.toLowerCase()
    return `Creating ${formData.numberOfTables} ${shapeLabel} tables with ${formData.capacityPerTable} seats each, arranged in ${rows} rows × ${formData.gridColumns} columns`
  }, [formData.numberOfTables, formData.capacityPerTable, formData.shape, formData.gridColumns])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onGenerate) {
      onGenerate(formData)
    }
    handleReset()
    onOpenChange(false)
  }

  const handleReset = () => {
    setFormData({
      numberOfTables: 10,
      capacityPerTable: 10,
      shape: "Round",
      gridColumns: 4,
      spacing: 350,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl p-0 gap-0"
        showCloseButton={false}
      >
        {/* Visually Hidden Title for Accessibility */}
        <DialogTitle className="sr-only">Create Table Layout</DialogTitle>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Create Table Layout
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Set up multiple tables at once in a grid layout
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
          {/* Row 1: Number of Tables & Capacity per Table */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="numberOfTables"
                className="text-sm font-medium text-gray-700"
              >
                Number of Tables
              </Label>
              <Input
                id="numberOfTables"
                type="number"
                min={1}
                max={100}
                value={formData.numberOfTables}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfTables: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full border-slate-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="capacityPerTable"
                className="text-sm font-medium text-gray-700"
              >
                Capacity per Table
              </Label>
              <Input
                id="capacityPerTable"
                type="number"
                min={1}
                max={20}
                value={formData.capacityPerTable}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacityPerTable: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full border-slate-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Table Shape Toggle */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Table Shape
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, shape: "Round" })}
                className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-all ${
                  formData.shape === "Round"
                    ? "border-sapling-light bg-sapling-light/5 text-sapling-light"
                    : "border-slate-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                Round
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, shape: "Rectangle" })}
                className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-all ${
                  formData.shape === "Rectangle"
                    ? "border-sapling-light bg-sapling-light/5 text-sapling-light"
                    : "border-slate-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                Rectangle
              </button>
            </div>
          </div>

          {/* Row 2: Grid Columns & Spacing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="gridColumns"
                className="text-sm font-medium text-gray-700"
              >
                Grid Columns
              </Label>
              <Input
                id="gridColumns"
                type="number"
                min={1}
                max={10}
                value={formData.gridColumns}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gridColumns: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full border-slate-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="spacing"
                className="text-sm font-medium text-gray-700"
              >
                Spacing (px)
              </Label>
              <Input
                id="spacing"
                type="number"
                min={50}
                max={1000}
                step={10}
                value={formData.spacing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    spacing: parseInt(e.target.value) || 100,
                  })
                }
                className="w-full border-slate-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Preview Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Preview:</span> {previewInfo}
            </p>
          </div>

          {/* Advanced Options Section */}
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Or use advanced options:</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onImportBlueprint}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-blue-200 bg-white text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Import Blueprint
              </button>
              <button
                type="button"
                onClick={onAIBuilder}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-purple-200 bg-white text-purple-600 text-sm font-medium hover:bg-purple-50 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                AI Builder
              </button>
            </div>
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
              Create {formData.numberOfTables} Tables
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
