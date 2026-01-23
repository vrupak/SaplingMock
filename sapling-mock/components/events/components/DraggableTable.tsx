"use client"

import { useState, useRef, useEffect } from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Trash2, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { TableData, TableLevel, Seat } from "../types/table-types"
import { levelColors, getTableBackgroundColor } from "../types/table-types"

interface DraggableTableProps {
  table: TableData
  isEditing: boolean
  editingField: "name" | "level" | null
  onNameChange?: (name: string) => void
  onLevelChange?: (level: TableLevel) => void
  onStartEditing?: (field: "name" | "level") => void
  onStopEditing?: () => void
  onDelete?: () => void
  onAddGuest?: () => void
}

const LEVELS: TableLevel[] = ["Diamond", "Platinum", "Gold", "Silver", "Bronze", null]

// Seat component with tooltip for occupied seats (for round/oval tables)
function SeatWithTooltip({
  seat,
  angle,
  distance,
  seatNumber,
}: {
  seat: Seat
  angle: number
  distance: number
  seatNumber: number
}) {
  const x = Math.cos(angle) * distance
  const y = Math.sin(angle) * distance

  const seatElement = (
    <div
      className={cn(
        "absolute w-4 h-4 rounded-sm transform -translate-x-1/2 -translate-y-1/2 border transition-colors",
        seat.isOccupied
          ? "bg-blue-500 border-blue-600"
          : "bg-gray-100 border-gray-300"
      )}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
    />
  )

  if (seat.isOccupied && seat.guestName) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{seatElement}</TooltipTrigger>
        <TooltipContent>
          Seat {seatNumber}: {seat.guestName}
        </TooltipContent>
      </Tooltip>
    )
  }

  return seatElement
}

// Rectangular seat component with tooltip
function RectangularSeatWithTooltip({
  seat,
  seatNumber,
}: {
  seat: Seat
  seatNumber: number
}) {
  const seatElement = (
    <div
      className={cn(
        "w-4 h-4 rounded-sm border transition-colors",
        seat.isOccupied
          ? "bg-blue-500 border-blue-600"
          : "bg-gray-100 border-gray-300"
      )}
    />
  )

  if (seat.isOccupied && seat.guestName) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{seatElement}</TooltipTrigger>
        <TooltipContent>
          Seat {seatNumber}: {seat.guestName}
        </TooltipContent>
      </Tooltip>
    )
  }

  return seatElement
}

// Editable name input
function EditableName({
  value,
  onChange,
  onBlur,
}: {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter") onBlur()
        if (e.key === "Escape") onBlur()
      }}
      className="text-xs font-semibold text-gray-800 text-center bg-transparent border-none outline-none w-full px-1"
      onClick={(e) => e.stopPropagation()}
    />
  )
}

// Level dropdown selector
function LevelSelector({
  currentLevel,
  onSelect,
  onClose,
}: {
  currentLevel: TableLevel
  onSelect: (level: TableLevel) => void
  onClose: () => void
}) {
  return (
    <DropdownMenu open onOpenChange={(open) => !open && onClose()}>
      <DropdownMenuTrigger asChild>
        <span className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-32">
        {LEVELS.map((level) => (
          <DropdownMenuItem
            key={level ?? "none"}
            onClick={() => {
              onSelect(level)
              onClose()
            }}
            className={cn(currentLevel === level && "bg-gray-100")}
          >
            {level ?? "No Level"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Table content (name, level, occupancy, actions) - shared across all shapes
function TableContent({
  table,
  isEditing,
  editingField,
  localName,
  setLocalName,
  handleNameClick,
  handleNameBlur,
  handleLevelClick,
  onLevelChange,
  onStopEditing,
  onDelete,
  onAddGuest,
  filledCount,
  levelColor,
  bgColor,
  shapeClass,
}: {
  table: TableData
  isEditing: boolean
  editingField: "name" | "level" | null
  localName: string
  setLocalName: (name: string) => void
  handleNameClick: (e: React.MouseEvent) => void
  handleNameBlur: () => void
  handleLevelClick: (e: React.MouseEvent) => void
  onLevelChange?: (level: TableLevel) => void
  onStopEditing?: () => void
  onDelete?: () => void
  onAddGuest?: () => void
  filledCount: number
  levelColor: { bg: string; text: string; border: string }
  bgColor: string
  shapeClass: string
}) {
  return (
    <div
      className={cn(
        "absolute inset-4 border-2 border-gray-300 flex flex-col items-center justify-center transition-shadow",
        bgColor,
        shapeClass,
        "group-hover:shadow-lg"
      )}
    >
      {/* Table name - clickable for editing */}
      {isEditing && editingField === "name" ? (
        <EditableName
          value={localName}
          onChange={setLocalName}
          onBlur={handleNameBlur}
        />
      ) : (
        <span
          className="text-xs font-semibold text-gray-800 text-center px-2 leading-tight cursor-text hover:bg-gray-200/50 rounded"
          onClick={handleNameClick}
        >
          {table.name}
        </span>
      )}

      {/* Level badge - clickable for dropdown */}
      {isEditing && editingField === "level" ? (
        <LevelSelector
          currentLevel={table.level}
          onSelect={(level) => onLevelChange?.(level)}
          onClose={() => onStopEditing?.()}
        />
      ) : table.level ? (
        <span
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 cursor-pointer hover:opacity-80",
            levelColor.bg,
            levelColor.text
          )}
          onClick={handleLevelClick}
        >
          {table.level}
        </span>
      ) : (
        <button
          className="text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 text-orange-600 hover:bg-orange-50"
          onClick={handleLevelClick}
        >
          + Add Level
        </button>
      )}

      {/* Occupancy */}
      <span className="text-xs text-gray-600 mt-1">
        {filledCount}/{table.capacity}
      </span>

      {/* Action icons */}
      <div className="flex items-center gap-1 mt-1">
        <button
          className="p-0.5 text-red-500 hover:text-red-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onDelete?.()
          }}
        >
          <Trash2 className="w-3 h-3" />
        </button>
        <button
          className="p-0.5 text-blue-600 hover:text-blue-800 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onAddGuest?.()
          }}
        >
          <Users className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

export function DraggableTable({
  table,
  isEditing,
  editingField,
  onNameChange,
  onLevelChange,
  onStartEditing,
  onStopEditing,
  onDelete,
  onAddGuest,
}: DraggableTableProps) {
  const [localName, setLocalName] = useState(table.name)

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: table.id,
      data: { table },
    })

  const filledCount = table.seats.filter((s) => s.isOccupied).length
  const levelColor = levelColors[table.level ?? "default"]
  const bgColor = getTableBackgroundColor(filledCount, table.capacity)

  // Build tooltip content for table hover
  const tableTooltipContent = `${table.name} | Capacity: ${table.capacity} seats | Filled: ${filledCount}/${table.capacity}${table.level ? ` | ${table.level}` : ""}`

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onStartEditing?.("name")
    setLocalName(table.name)
  }

  const handleNameBlur = () => {
    onNameChange?.(localName)
    onStopEditing?.()
  }

  const handleLevelClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onStartEditing?.("level")
  }

  // Get dimensions based on shape
  const getDimensions = () => {
    switch (table.shape) {
      case "round":
        return { width: 160, height: 160, seatDistance: 75 }
      case "oval":
        return { width: 180, height: 140, seatDistance: 80 }
      case "square":
        return { width: 160, height: 160, seatDistance: 75 }
      case "rectangular":
      default:
        return { width: 200, height: 160, seatDistance: 0 }
    }
  }

  const dims = getDimensions()

  // Style for positioning - center the table at its position
  const style = {
    left: table.position.x - dims.width / 2,
    top: table.position.y - dims.height / 2,
    width: dims.width,
    height: dims.height,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 1000 : 1,
  }

  // Common props for TableContent
  const contentProps = {
    table,
    isEditing,
    editingField,
    localName,
    setLocalName,
    handleNameClick,
    handleNameBlur,
    handleLevelClick,
    onLevelChange,
    onStopEditing,
    onDelete,
    onAddGuest,
    filledCount,
    levelColor,
    bgColor,
  }

  // Round table rendering
  if (table.shape === "round") {
    const seatAngles = table.seats.map(
      (_, i) => (i / table.capacity) * 2 * Math.PI - Math.PI / 2
    )

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={setNodeRef}
            className={cn(
              "absolute cursor-grab group",
              isDragging && "cursor-grabbing opacity-80"
            )}
            style={style}
            {...listeners}
            {...attributes}
          >
            <div className="relative w-full h-full">
              {/* Seats around the table */}
              {table.seats.map((seat, i) => (
                <SeatWithTooltip
                  key={seat.id}
                  seat={seat}
                  angle={seatAngles[i]}
                  distance={dims.seatDistance}
                  seatNumber={i + 1}
                />
              ))}

              {/* Table circle */}
              <TableContent {...contentProps} shapeClass="rounded-full" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" sideOffset={12} className="max-w-xs text-center">
          {tableTooltipContent}
        </TooltipContent>
      </Tooltip>
    )
  }

  // Oval table rendering
  if (table.shape === "oval") {
    const seatAngles = table.seats.map(
      (_, i) => (i / table.capacity) * 2 * Math.PI - Math.PI / 2
    )
    // Adjust seat positions for oval shape (elliptical distribution) - seats outside the table
    const getOvalSeatPosition = (angle: number) => {
      // Place seats outside the oval border (dims.width/2 is the edge, add offset for seats)
      const radiusX = dims.width / 2 - 8  // Seats at the outer edge
      const radiusY = dims.height / 2 - 8
      return {
        x: Math.cos(angle) * radiusX,
        y: Math.sin(angle) * radiusY,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={setNodeRef}
            className={cn(
              "absolute cursor-grab group",
              isDragging && "cursor-grabbing opacity-80"
            )}
            style={style}
            {...listeners}
            {...attributes}
          >
            <div className="relative w-full h-full">
              {/* Seats around the oval */}
              {table.seats.map((seat, i) => {
                const pos = getOvalSeatPosition(seatAngles[i])
                return (
                  <div
                    key={seat.id}
                    className={cn(
                      "absolute w-4 h-4 rounded-sm transform -translate-x-1/2 -translate-y-1/2 border transition-colors",
                      seat.isOccupied
                        ? "bg-blue-500 border-blue-600"
                        : "bg-gray-100 border-gray-300"
                    )}
                    style={{
                      left: `calc(50% + ${pos.x}px)`,
                      top: `calc(50% + ${pos.y}px)`,
                    }}
                  />
                )
              })}

              {/* Table oval */}
              <TableContent {...contentProps} shapeClass="rounded-[50%]" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" sideOffset={12} className="max-w-xs text-center">
          {tableTooltipContent}
        </TooltipContent>
      </Tooltip>
    )
  }

  // Square table rendering
  if (table.shape === "square") {
    const seatsPerSide = Math.ceil(table.capacity / 4)
    const topSeats = seatsPerSide
    const rightSeats = seatsPerSide
    const bottomSeats = seatsPerSide
    const leftSeats = table.capacity - topSeats - rightSeats - bottomSeats

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={setNodeRef}
            className={cn(
              "absolute cursor-grab group",
              isDragging && "cursor-grabbing opacity-80"
            )}
            style={style}
            {...listeners}
            {...attributes}
          >
            <div className="relative w-full h-full">
              {/* Top seats */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                {Array.from({ length: topSeats }).map((_, i) => (
                  <RectangularSeatWithTooltip
                    key={`top-${i}`}
                    seat={table.seats[i] || { id: `empty-${i}`, position: i, isOccupied: false }}
                    seatNumber={i + 1}
                  />
                ))}
              </div>

              {/* Right seats */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                {Array.from({ length: rightSeats }).map((_, i) => (
                  <RectangularSeatWithTooltip
                    key={`right-${i}`}
                    seat={table.seats[topSeats + i] || { id: `empty-r-${i}`, position: topSeats + i, isOccupied: false }}
                    seatNumber={topSeats + i + 1}
                  />
                ))}
              </div>

              {/* Bottom seats */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                {Array.from({ length: bottomSeats }).map((_, i) => (
                  <RectangularSeatWithTooltip
                    key={`bottom-${i}`}
                    seat={table.seats[topSeats + rightSeats + i] || { id: `empty-b-${i}`, position: topSeats + rightSeats + i, isOccupied: false }}
                    seatNumber={topSeats + rightSeats + i + 1}
                  />
                ))}
              </div>

              {/* Left seats */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                {Array.from({ length: Math.max(0, leftSeats) }).map((_, i) => (
                  <RectangularSeatWithTooltip
                    key={`left-${i}`}
                    seat={table.seats[topSeats + rightSeats + bottomSeats + i] || { id: `empty-l-${i}`, position: topSeats + rightSeats + bottomSeats + i, isOccupied: false }}
                    seatNumber={topSeats + rightSeats + bottomSeats + i + 1}
                  />
                ))}
              </div>

              {/* Table square */}
              <TableContent {...contentProps} shapeClass="rounded-lg" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" sideOffset={12} className="max-w-xs text-center">
          {tableTooltipContent}
        </TooltipContent>
      </Tooltip>
    )
  }

  // Rectangular table rendering (default)
  const topSeats = Math.ceil(table.capacity / 3)
  const bottomSeats = Math.ceil(table.capacity / 3)
  const leftSeats = Math.floor((table.capacity - topSeats - bottomSeats) / 2)
  const rightSeats = table.capacity - topSeats - bottomSeats - leftSeats

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={setNodeRef}
          className={cn(
            "absolute cursor-grab group",
            isDragging && "cursor-grabbing opacity-80"
          )}
          style={style}
          {...listeners}
          {...attributes}
        >
          <div className="relative w-full h-full">
            {/* Top seats */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex gap-2">
              {Array.from({ length: topSeats }).map((_, i) => (
                <RectangularSeatWithTooltip
                  key={`top-${i}`}
                  seat={table.seats[i] || { id: `empty-${i}`, position: i, isOccupied: false }}
                  seatNumber={i + 1}
                />
              ))}
            </div>

            {/* Left seats */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
              {Array.from({ length: leftSeats }).map((_, i) => (
                <RectangularSeatWithTooltip
                  key={`left-${i}`}
                  seat={table.seats[topSeats + i] || { id: `empty-l-${i}`, position: topSeats + i, isOccupied: false }}
                  seatNumber={topSeats + i + 1}
                />
              ))}
            </div>

            {/* Right seats */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
              {Array.from({ length: rightSeats }).map((_, i) => (
                <RectangularSeatWithTooltip
                  key={`right-${i}`}
                  seat={table.seats[topSeats + leftSeats + i] || { id: `empty-r-${i}`, position: topSeats + leftSeats + i, isOccupied: false }}
                  seatNumber={topSeats + leftSeats + i + 1}
                />
              ))}
            </div>

            {/* Bottom seats */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
              {Array.from({ length: bottomSeats }).map((_, i) => (
                <RectangularSeatWithTooltip
                  key={`bottom-${i}`}
                  seat={table.seats[topSeats + leftSeats + rightSeats + i] || { id: `empty-b-${i}`, position: topSeats + leftSeats + rightSeats + i, isOccupied: false }}
                  seatNumber={topSeats + leftSeats + rightSeats + i + 1}
                />
              ))}
            </div>

            {/* Table rectangle */}
            <TableContent {...contentProps} shapeClass="rounded-lg" />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" sideOffset={12} className="max-w-xs text-center">
        {tableTooltipContent}
      </TooltipContent>
    </Tooltip>
  )
}
