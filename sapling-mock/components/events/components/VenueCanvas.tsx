"use client"

import { useRef, useState, useCallback } from "react"
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core"
import { MapPin, Grid3x3 } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { TableData, TableLevel, TableShape } from "../types/table-types"
import { TABLE_DIMENSIONS } from "../types/table-types"
import { DraggableTable } from "./DraggableTable"

interface VenueCanvasProps {
  tables: TableData[]
  snapToGrid?: boolean
  onSnapToGridChange?: (enabled: boolean) => void
  onTablePositionChange?: (tableId: string, position: { x: number; y: number }) => void
  onTableNameChange?: (tableId: string, name: string) => void
  onTableLevelChange?: (tableId: string, level: TableLevel) => void
  onTableDelete?: (tableId: string) => void
  onTableAddGuest?: (tableId: string) => void
  onTableClick?: (table: TableData) => void
}

export function VenueCanvas({
  tables,
  snapToGrid = false,
  onSnapToGridChange,
  onTablePositionChange,
  onTableNameChange,
  onTableLevelChange,
  onTableDelete,
  onTableAddGuest,
  onTableClick,
}: VenueCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [editingTableId, setEditingTableId] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<"name" | "level" | null>(null)

  // Configure pointer sensor with activation constraint to distinguish click from drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    })
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, delta } = event
      const tableId = active.id as string
      const table = tables.find((t) => t.id === tableId)

      if (table && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect()

        // Calculate new position
        let newX = table.position.x + delta.x
        let newY = table.position.y + delta.y

        // Get table dimensions for constraint
        const dims = TABLE_DIMENSIONS[table.shape as keyof typeof TABLE_DIMENSIONS] || TABLE_DIMENSIONS.round
        const halfWidth = dims.width / 2
        const halfHeight = dims.height / 2

        // Constrain to canvas bounds
        newX = Math.max(halfWidth, Math.min(canvasRect.width - halfWidth, newX))
        newY = Math.max(halfHeight, Math.min(canvasRect.height - halfHeight, newY))

        onTablePositionChange?.(tableId, { x: newX, y: newY })
      }
    },
    [tables, onTablePositionChange]
  )

  const handleStartEditing = (tableId: string, field: "name" | "level") => {
    setEditingTableId(tableId)
    setEditingField(field)
  }

  const handleStopEditing = () => {
    setEditingTableId(null)
    setEditingField(null)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Canvas Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-dashed border-gray-300">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin className="w-4 h-4" />
          <span>Drag tables to arrange your venue layout</span>
        </div>

        {/* Snap to Grid Toggle */}
        <button
          onClick={() => onSnapToGridChange?.(!snapToGrid)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            snapToGrid
              ? "bg-blue-100 text-blue-700 border border-blue-300"
              : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
          )}
        >
          <Grid3x3 className="w-4 h-4" />
          Snap to Grid
        </button>
      </div>

      {/* Canvas Area - Updated background color with scroll support */}
      <div className="overflow-auto bg-slate-50 py-8">
        <div className="flex justify-center min-w-[920px]">
          <TooltipProvider delayDuration={300}>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <div
                ref={canvasRef}
                className="relative w-[900px] flex-shrink-0"
                style={{ height: "850px" }}
              >
              {tables.map((table) => (
                <DraggableTable
                  key={table.id}
                  table={table}
                  isEditing={editingTableId === table.id}
                  editingField={editingTableId === table.id ? editingField : null}
                  onNameChange={(name) => onTableNameChange?.(table.id, name)}
                  onLevelChange={(level) => onTableLevelChange?.(table.id, level)}
                  onStartEditing={(field) => handleStartEditing(table.id, field)}
                  onStopEditing={handleStopEditing}
                  onDelete={() => onTableDelete?.(table.id)}
                  onAddGuest={() => onTableAddGuest?.(table.id)}
                />
              ))}
              </div>
            </DndContext>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
