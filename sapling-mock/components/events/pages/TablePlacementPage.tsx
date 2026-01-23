"use client"

import { useState } from "react"
import {
  ArrowLeft,
  LayoutGrid,
  Users,
  Crown,
  MapPin,
  Grid3x3,
  Plus,
  Table,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SeatingSummary } from "../components/SeatingSummary"
import { VenueCanvas } from "../components/VenueCanvas"
import { SeatingGridView } from "../components/SeatingGridView"
import { VisualSeatingChart } from "../components/VisualSeatingChart"
import { SeatingMetricCards } from "../components/SeatingMetricCards"
import { sampleTables, calculateSeatingMetrics } from "../data/table-mock-data"
import {
  sampleSeatingRows,
  calculateVisualSeatingMetrics,
} from "../data/seating-mock-data"
import {
  AddTableModal,
  TableLayoutGeneratorModal,
  type AddTableFormData,
  type TableLayoutFormData,
} from "../modals"
import { useVenueLayout } from "../hooks/useVenueLayout"
import type { Event } from "../types"
import type { TableData, TableShape } from "../types/table-types"

type ViewMode = "tables" | "seats"

interface TablePlacementPageProps {
  event: Event
  onBack: () => void
}

type ContentView = "layout" | "grid"

export function TablePlacementPage({ event, onBack }: TablePlacementPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("tables")
  const [contentView, setContentView] = useState<ContentView>("layout")
  const [isAIActive, setIsAIActive] = useState(false)

  // Modal states
  const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false)
  const [isLayoutGeneratorModalOpen, setIsLayoutGeneratorModalOpen] = useState(false)

  // Use the venue layout hook for state management
  const {
    tables,
    setTables,
    snapToGrid,
    toggleSnapToGrid,
    updateTablePosition,
    updateTableName,
    updateTableLevel,
    deleteTable,
  } = useVenueLayout({
    initialTables: sampleTables,
    canvasBounds: { minX: 0, maxX: 900, minY: 0, maxY: 850 },
  })

  const metrics = calculateSeatingMetrics(tables)
  const seatingMetrics = calculateVisualSeatingMetrics(sampleSeatingRows)

  const handleTableClick = (table: TableData) => {
    console.log("Table clicked:", table)
    // Future: Open table detail/edit modal
  }

  const handleAddGuest = (tableId: string) => {
    console.log("Add guest to table:", tableId)
    // Future: Open add guest modal
  }

  const handleDeleteTable = (tableId: string) => {
    deleteTable(tableId)
  }

  // Convert modal shape to table shape type
  const mapShapeToTableShape = (shape: string): TableShape => {
    const shapeMap: Record<string, TableShape> = {
      Round: "round",
      Rectangle: "rectangular",
      Oval: "oval",
      Square: "square",
    }
    return shapeMap[shape] || "round"
  }

  // Handle adding a single table - positions at canvas center
  const handleAddTable = (data: AddTableFormData) => {
    const newTable: TableData = {
      id: `table-${Date.now()}`,
      name: data.tableName,
      shape: mapShapeToTableShape(data.shape),
      level: null,
      capacity: data.capacity,
      seats: Array.from({ length: data.capacity }, (_, i) => ({
        id: `seat-${Date.now()}-${i}`,
        position: i,
        isOccupied: false,
      })),
      position: {
        x: 450, // Center of 900px canvas
        y: 425, // Center of 850px canvas
      },
    }
    setTables((prev) => [...prev, newTable])
  }

  // Handle bulk table generation
  const handleGenerateLayout = (data: TableLayoutFormData) => {
    const newTables: TableData[] = []
    const shape = mapShapeToTableShape(data.shape)

    for (let i = 0; i < data.numberOfTables; i++) {
      const col = i % data.gridColumns
      const row = Math.floor(i / data.gridColumns)

      newTables.push({
        id: `table-${Date.now()}-${i}`,
        name: `Table ${tables.length + i + 1}`,
        shape,
        level: null,
        capacity: data.capacityPerTable,
        seats: Array.from({ length: data.capacityPerTable }, (_, j) => ({
          id: `seat-${Date.now()}-${i}-${j}`,
          position: j,
          isOccupied: false,
        })),
        position: {
          x: 100 + col * data.spacing,
          y: 100 + row * data.spacing,
        },
      })
    }
    setTables((prev) => [...prev, ...newTables])
  }

  const handleImportBlueprint = () => {
    console.log("Import Blueprint clicked")
    // Future: Open file picker for blueprint import
  }

  const handleAIBuilder = () => {
    console.log("AI Builder clicked")
    // Future: Open AI builder interface
  }

  return (
    <div className="py-6 px-24">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Event</span>
      </button>

      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Table Placement/Seating
          </h1>
          <p className="text-gray-500 mt-1">
            {event.name} (Sample table placement event)
          </p>
        </div>

        {/* View Toggle - Tables / Seats */}
        <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white">
          <button
            onClick={() => setViewMode("tables")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "tables"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Tables
          </button>
          <button
            onClick={() => setViewMode("seats")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "seats"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Users className="w-4 h-4" />
            Seats
          </button>
        </div>
      </div>

      {/* Unified Action Bar - Only show for Tables view */}
      {viewMode === "tables" && (
        <div className="flex items-center justify-end gap-3 mb-6">
          {/* AI Button (Yellow Crown) */}
          <button
            onClick={() => setIsAIActive(!isAIActive)}
            className={`p-2.5 rounded-lg border transition-colors ${
              isAIActive
                ? "bg-yellow-50 border-yellow-400 text-yellow-500"
                : "bg-white border-gray-200 text-yellow-400 hover:border-yellow-300 hover:bg-yellow-50/50"
            }`}
            title="Orchid AI"
          >
            <Crown className="w-5 h-5" />
          </button>

          {/* View Selector Group */}
          <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white">
            {/* Venue Layout View (Map Pin) */}
            <button
              onClick={() => setContentView("layout")}
              className={`p-2 rounded-md transition-colors ${
                contentView === "layout"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-blue-500 hover:bg-gray-50"
              }`}
              title="Table Layout"
            >
              <MapPin className="w-5 h-5" />
            </button>

            {/* Grid View (Table Grid) */}
            <button
              onClick={() => setContentView("grid")}
              className={`p-2 rounded-md transition-colors ${
                contentView === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-blue-500 hover:bg-gray-50"
              }`}
              title="Grid View"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Action Buttons */}
          <Button
            onClick={() => setIsAddTableModalOpen(true)}
            className="bg-sapling-light hover:bg-sapling-dark text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Table/Seating
          </Button>
          <Button
            onClick={() => setIsLayoutGeneratorModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Table className="w-4 h-4" />
            Create Table Layout
          </Button>
        </div>
      )}

      {/* Summary Cards - Show different cards based on view mode */}
      {viewMode === "seats" ? (
        <SeatingMetricCards metrics={seatingMetrics} />
      ) : (
        <SeatingSummary metrics={metrics} />
      )}

      {/* Content Area - Show Visual Seating Chart for seats view, Grid/Canvas for tables view */}
      {viewMode === "seats" ? (
        <VisualSeatingChart
          rows={sampleSeatingRows}
          onSeatClick={(seat, row) => {
            console.log("Seat clicked:", seat, "in row:", row)
          }}
        />
      ) : contentView === "grid" ? (
        <SeatingGridView
          tables={tables}
          onAddGuest={(table) => handleAddGuest(table.id)}
          onDeleteTable={(table) => handleDeleteTable(table.id)}
        />
      ) : (
        <VenueCanvas
          tables={tables}
          snapToGrid={snapToGrid}
          onSnapToGridChange={toggleSnapToGrid}
          onTablePositionChange={updateTablePosition}
          onTableNameChange={updateTableName}
          onTableLevelChange={updateTableLevel}
          onTableDelete={handleDeleteTable}
          onTableAddGuest={handleAddGuest}
          onTableClick={handleTableClick}
        />
      )}

      {/* Add Table Modal */}
      <AddTableModal
        open={isAddTableModalOpen}
        onOpenChange={setIsAddTableModalOpen}
        onSave={handleAddTable}
        nextTableNumber={tables.length + 1}
      />

      {/* Table Layout Generator Modal */}
      <TableLayoutGeneratorModal
        open={isLayoutGeneratorModalOpen}
        onOpenChange={setIsLayoutGeneratorModalOpen}
        onGenerate={handleGenerateLayout}
        onImportBlueprint={handleImportBlueprint}
        onAIBuilder={handleAIBuilder}
      />
    </div>
  )
}
