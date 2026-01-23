"use client"

import { useState, useCallback } from "react"
import type { TableData, TableLevel, TableShape } from "../types/table-types"
import { TABLE_DIMENSIONS } from "../types/table-types"

const GRID_SIZE = 20 // 20px grid for snap-to-grid

interface CanvasBounds {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

interface UseVenueLayoutOptions {
  initialTables?: TableData[]
  canvasBounds?: CanvasBounds
}

export function useVenueLayout(options: UseVenueLayoutOptions = {}) {
  const {
    initialTables = [],
    canvasBounds = { minX: 0, maxX: 900, minY: 0, maxY: 850 },
  } = options

  const [tables, setTables] = useState<TableData[]>(initialTables)
  const [editingTableId, setEditingTableId] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<"name" | "level" | null>(null)
  const [snapToGrid, setSnapToGrid] = useState(false)

  // Snap value to grid
  const snapValue = useCallback((value: number): number => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE
  }, [])

  // Constrain position within canvas bounds
  const constrainPosition = useCallback(
    (
      position: { x: number; y: number },
      tableShape: TableShape
    ): { x: number; y: number } => {
      const dims = TABLE_DIMENSIONS[tableShape] || TABLE_DIMENSIONS.round
      const halfWidth = dims.width / 2
      const halfHeight = dims.height / 2

      let x = position.x
      let y = position.y

      // Apply snap to grid if enabled
      if (snapToGrid) {
        x = snapValue(x)
        y = snapValue(y)
      }

      // Constrain to bounds
      x = Math.max(halfWidth, Math.min(canvasBounds.maxX - halfWidth, x))
      y = Math.max(halfHeight, Math.min(canvasBounds.maxY - halfHeight, y))

      return { x, y }
    },
    [canvasBounds, snapToGrid, snapValue]
  )

  const updateTablePosition = useCallback(
    (tableId: string, position: { x: number; y: number }) => {
      setTables((prev) =>
        prev.map((table) => {
          if (table.id === tableId) {
            const constrainedPos = constrainPosition(position, table.shape)
            return { ...table, position: constrainedPos }
          }
          return table
        })
      )
    },
    [constrainPosition]
  )

  const updateTableName = useCallback((tableId: string, name: string) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId ? { ...table, name } : table
      )
    )
  }, [])

  const updateTableLevel = useCallback((tableId: string, level: TableLevel) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId ? { ...table, level } : table
      )
    )
  }, [])

  const addTable = useCallback(
    (table: TableData) => {
      // Position new tables at canvas center
      const centerX = canvasBounds.maxX / 2
      const centerY = canvasBounds.maxY / 2
      const centeredTable = {
        ...table,
        position: constrainPosition({ x: centerX, y: centerY }, table.shape),
      }
      setTables((prev) => [...prev, centeredTable])
    },
    [canvasBounds, constrainPosition]
  )

  const deleteTable = useCallback((tableId: string) => {
    setTables((prev) => prev.filter((table) => table.id !== tableId))
    // Clear editing state if deleting the table being edited
    setEditingTableId((current) => (current === tableId ? null : current))
    setEditingField((current) =>
      editingTableId === tableId ? null : current
    )
  }, [editingTableId])

  const startEditing = useCallback((tableId: string, field: "name" | "level") => {
    setEditingTableId(tableId)
    setEditingField(field)
  }, [])

  const stopEditing = useCallback(() => {
    setEditingTableId(null)
    setEditingField(null)
  }, [])

  const toggleSnapToGrid = useCallback(() => {
    setSnapToGrid((prev) => !prev)
  }, [])

  const getTableById = useCallback(
    (tableId: string) => {
      return tables.find((t) => t.id === tableId)
    },
    [tables]
  )

  return {
    // State
    tables,
    editingTableId,
    editingField,
    snapToGrid,
    // Actions
    setTables,
    updateTablePosition,
    updateTableName,
    updateTableLevel,
    addTable,
    deleteTable,
    startEditing,
    stopEditing,
    toggleSnapToGrid,
    // Computed
    getTableById,
    constrainPosition,
  }
}
