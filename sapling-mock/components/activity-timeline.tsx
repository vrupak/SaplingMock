"use client"

import { useState } from "react"
import { Pin, AlertCircle, CheckSquare, Filter, Pencil, Trash2, Square } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: string
  type: "pinned-note" | "overdue-task" | "open-task"
  title: string
  description?: string
  addedBy?: string
  date: string
  dueDate?: string
  owner?: string
  createdDate?: string
}

const timelineItems: TimelineItem[] = [
  {
    id: "1",
    type: "pinned-note",
    title: "PINNED NOTE",
    description: "Major donor prospect - previous $500K gift in 2022. Interested in naming opportunities for new science building.",
    addedBy: "Maria Garcia",
    date: "November 4, 2024 at 4:20 PM",
  },
  {
    id: "2",
    type: "pinned-note",
    title: "PINNED NOTE",
    description: "Prefers email communication. Best time to reach is weekday mornings 9-11am.",
    addedBy: "Sarah Johnson",
    date: "October 14, 2024 at 10:00 AM",
  },
  {
    id: "3",
    type: "overdue-task",
    title: "OVERDUE TASK",
    description: "Schedule site visit for grant review",
    dueDate: "October 17, 2024 at 10:00 AM",
    owner: "Alex Russo",
    date: "",
  },
  {
    id: "4",
    type: "overdue-task",
    title: "OVERDUE TASK",
    description: "Thank you call for recent donation",
    dueDate: "October 24, 2024 at 3:30 PM",
    owner: "Maria Garcia",
    date: "",
  },
  {
    id: "5",
    type: "open-task",
    title: "TASK: OPEN",
    description: "Follow up on capital campaign discussion",
    createdDate: "November 10, 2025 at 10:30 AM",
    dueDate: "November 14, 2025 at 2:00 PM",
    owner: "Maria Garcia",
    date: "",
  },
]

const typeStyles = {
  "pinned-note": {
    borderColor: "border-l-amber-400",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-100 text-amber-700",
    Icon: Pin,
  },
  "overdue-task": {
    borderColor: "border-l-red-400",
    bgColor: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    badgeColor: "bg-red-100 text-red-700",
    Icon: AlertCircle,
  },
  "open-task": {
    borderColor: "border-l-[#8bad71]",
    bgColor: "bg-[#8bad71]/10",
    iconBg: "bg-[#8bad71]/20",
    iconColor: "text-sapling",
    badgeColor: "bg-[#8bad71]/20 text-sapling",
    Icon: CheckSquare,
  },
}

export function ActivityTimeline() {
  const [noteText, setNoteText] = useState("")

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 text-lg mb-4">Activity Timeline</h3>

      {/* Add Note Input */}
      <div className="flex items-center gap-3 mb-6">
        <Input
          placeholder="Add a note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="flex-1"
        />
        <Button className="bg-sapling hover:bg-[#7a9d62] text-white gap-2">
          <span className="text-lg">+</span>
          Note
        </Button>
        <Button variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-700">
          SAVE
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          FILTER
        </Button>
      </div>

      {/* Timeline Items */}
      <div className="space-y-4">
        {timelineItems.map((item) => {
          const styles = typeStyles[item.type]
          const { Icon } = styles

          return (
            <div key={item.id} className="flex gap-4">
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                styles.iconBg
              )}>
                <Icon className={cn("w-5 h-5", styles.iconColor)} />
              </div>

              {/* Card */}
              <div className={cn(
                "flex-1 rounded-lg border-l-4 p-4",
                styles.borderColor,
                styles.bgColor
              )}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className={cn(
                      "inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2",
                      styles.badgeColor
                    )}>
                      {item.title}
                    </span>
                    
                    {item.description && (
                      <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                    )}

                    {item.type === "pinned-note" && item.addedBy && (
                      <p className="text-xs text-gray-500">
                        Added by: <span className="text-gray-700">{item.addedBy}</span>
                        {" "}&bull;{" "}
                        {item.date}
                      </p>
                    )}

                    {item.type === "overdue-task" && (
                      <p className="text-xs">
                        <span className="text-red-600">Due: {item.dueDate}</span>
                        {" "}&bull;{" "}
                        <span className="text-gray-500">Owner: {item.owner}</span>
                      </p>
                    )}

                    {item.type === "open-task" && (
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <p>Created: {item.createdDate}</p>
                        <p>Due: {item.dueDate}</p>
                        <p>Owner: {item.owner}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 ml-4">
                    {item.type !== "pinned-note" && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Square className="w-4 h-4 text-gray-400" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Pencil className="w-4 h-4 text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
