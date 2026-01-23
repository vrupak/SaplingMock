"use client"

import { Users, Trash2 } from "lucide-react"
import type { TableData } from "../types/table-types"

interface SeatingGridViewProps {
  tables: TableData[]
  onAddGuest?: (table: TableData) => void
  onDeleteTable?: (table: TableData) => void
}

export function SeatingGridView({
  tables,
  onAddGuest,
  onDeleteTable,
}: SeatingGridViewProps) {
  const getAssignedCount = (table: TableData) => {
    return table.seats.filter((seat) => seat.isOccupied).length
  }

  const getAvailableCount = (table: TableData) => {
    return table.capacity - getAssignedCount(table)
  }

  const formatShape = (shape: string) => {
    return shape.charAt(0).toUpperCase() + shape.slice(1)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[80px_1fr_120px_100px_100px_100px_100px] gap-4 px-6 py-3 bg-gray-50/50 border-b border-gray-100">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Table
        </div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Name
        </div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Shape
        </div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
          Capacity
        </div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
          Assigned
        </div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
          Available
        </div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
          Actions
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {tables.map((table, index) => {
          const assigned = getAssignedCount(table)
          const available = getAvailableCount(table)
          const tableNumber = index + 1

          return (
            <div
              key={table.id}
              className="grid grid-cols-[80px_1fr_120px_100px_100px_100px_100px] gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors"
            >
              {/* Table Number */}
              <div className="text-sm font-medium text-gray-900">
                {tableNumber}
              </div>

              {/* Name */}
              <div className="text-sm font-semibold text-gray-900">
                {table.name}
              </div>

              {/* Shape */}
              <div className="text-sm text-gray-600">
                {formatShape(table.shape)}
              </div>

              {/* Capacity */}
              <div className="text-sm font-semibold text-gray-900 text-center">
                {table.capacity}
              </div>

              {/* Assigned */}
              <div className="text-sm font-medium text-blue-600 text-center">
                {assigned}
              </div>

              {/* Available */}
              <div className="text-sm font-medium text-green-600 text-center">
                {available}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => onAddGuest?.(table)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Add Guest"
                >
                  <Users className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteTable?.(table)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete Table"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
