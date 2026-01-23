"use client"

import { useState, useRef } from "react"
import { Upload, CloudUpload, List, Tag, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Event } from "../types"

interface ImportContactsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: Event
  onImportContacts?: (file?: File, method?: string) => void
}

export function ImportContactsModal({
  open,
  onOpenChange,
  event,
  onImportContacts,
}: ImportContactsModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (
        file.type === "text/csv" ||
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setSelectedFile(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  const handleImport = () => {
    if (onImportContacts && selectedFile) {
      onImportContacts(selectedFile, "file")
    }
    handleClose()
  }

  const handleSelectList = () => {
    if (onImportContacts) {
      onImportContacts(undefined, "list")
    }
    // In a real implementation, this would open a list selector
  }

  const handleSelectTags = () => {
    if (onImportContacts) {
      onImportContacts(undefined, "tags")
    }
    // In a real implementation, this would open a tag selector
  }

  const handleDownloadTemplate = () => {
    // In a real implementation, this would download a CSV template
    const csvContent =
      "Name,Email,Phone,Ticket Type,Amount\nJohn Doe,john@example.com,(555) 123-4567,Individual,250\n"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "event_contacts_template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleClose = () => {
    setSelectedFile(null)
    setDragActive(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] overflow-hidden p-0"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">Import Contacts to Event</DialogTitle>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Import Contacts to Event
              </h2>
            </div>
          </div>
        </div>

        {/* Bulk Import Header */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Bulk Import Contacts</span>
          </div>
          <p className="text-sm text-gray-500">
            Upload a CSV or Excel file to add multiple contacts to this event at once
          </p>
        </div>

        {/* Select Import Method label */}
        <div className="px-6 pt-4">
          <h3 className="text-sm font-medium text-gray-700">Select Import Method</h3>
        </div>

        {/* File Upload Zone */}
        <div className="px-6 pt-3">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : selectedFile
                ? "border-green-400 bg-green-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <CloudUpload
              className={`w-10 h-10 mx-auto mb-3 ${
                selectedFile ? "text-green-500" : "text-gray-400"
              }`}
            />
            {selectedFile ? (
              <>
                <p className="text-sm font-medium text-green-700">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-green-600 mt-1">File ready to import</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700">
                  Upload CSV or Excel File
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Drag and drop or click to browse
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              onClick={handleChooseFile}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              Choose File
            </Button>
          </div>
        </div>

        {/* Alternative Import Methods */}
        <div className="px-6 pt-4 space-y-3">
          {/* Import from Existing List */}
          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <List className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Import from Existing List
                </p>
                <p className="text-xs text-gray-500">
                  Select contacts from your saved lists
                </p>
              </div>
            </div>
            <Button
              onClick={handleSelectList}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              Select List
            </Button>
          </div>

          {/* Import by Tag */}
          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Tag className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Import by Tag</p>
                <p className="text-xs text-gray-500">
                  Add all contacts with specific tags
                </p>
              </div>
            </div>
            <Button
              onClick={handleSelectTags}
              className="bg-sapling-light hover:bg-sapling-dark text-white"
              size="sm"
            >
              Select Tags
            </Button>
          </div>
        </div>

        {/* CSV Format Requirements - Gray-tinted box */}
        <div className="px-6 pt-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              CSV Format Requirements:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                Required columns: Name, Email
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                Optional columns: Phone, Ticket Type, Amount
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                First row should contain column headers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                Maximum 1,000 contacts per import
              </li>
            </ul>
            <button
              onClick={handleDownloadTemplate}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-3 flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Download Sample CSV Template
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 mt-4 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!selectedFile}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Import Contacts
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
