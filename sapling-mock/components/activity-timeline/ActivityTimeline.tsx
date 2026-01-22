"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { timelineStyles } from "./config/timeline-styles"
import { mockTimelineItems } from "./config/mock-timeline-items"
import {
  TaskTimelineItem,
  GiftTimelineItem,
  AskTimelineItem,
  PledgeTimelineItem,
  AIGeneratedTimelineItem,
  DocumentTimelineItem,
  LegacyGivingTimelineItem,
  EventTimelineItem,
  FulfillmentTimelineItem,
  MembershipTimelineItem,
  CallNoteTimelineItem,
} from "./items"
import type { TimelineItem } from "./types"

interface ActivityTimelineProps {
  items?: TimelineItem[]
}

// Determine if item should be full width (pinned-note, overdue-task)
function isFullWidthItem(type: TimelineItem["type"]): boolean {
  return ["pinned-note", "overdue-task"].includes(type)
}

// Determine alignment based on index (alternating left/right)
function getItemAlignment(index: number, type: TimelineItem["type"]): "left" | "right" {
  // Full-width items don't have alignment
  if (isFullWidthItem(type)) return "left"

  // Alternate: even index = left, odd index = right
  return index % 2 === 0 ? "left" : "right"
}

function renderTimelineItem(item: TimelineItem, index: number) {
  const styles = timelineStyles[item.type]
  if (!styles) return null

  const alignment = getItemAlignment(index, item.type)
  const fullWidth = isFullWidthItem(item.type)
  const isLast = false // Will be set by parent component

  // Task-type items (pinned-note, overdue-task, open-task)
  if (["pinned-note", "overdue-task", "open-task"].includes(item.type)) {
    return <TaskTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
  }

  // Specific item types
  switch (item.type) {
    case "gift":
      return <GiftTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    case "ask":
      return <AskTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    case "pledge":
      return <PledgeTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    case "contact-info-generated":
    case "wealth-info-generated":
    case "workflow-change":
    case "data-enrichment":
      return <AIGeneratedTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    case "document":
      return <DocumentTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    case "legacy-giving":
      return <LegacyGivingTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    case "event":
      return <EventTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    case "fulfillment":
      return <FulfillmentTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    case "membership":
      return <MembershipTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    case "call-note":
      return <CallNoteTimelineItem key={item.id} item={item} styles={styles} alignment={alignment} isLast={isLast} fullWidth={fullWidth} />
    default:
      return null
  }
}

export function ActivityTimeline({ items = mockTimelineItems }: ActivityTimelineProps) {
  const [noteText, setNoteText] = useState("")

  return (
    <div className="h-auto">
      <h3 className="font-semibold text-sapling-dark text-lg mb-4">Activity Timeline</h3>

      {/* Add Note Input */}
      <div className="flex items-center gap-3 mb-6">
        <Input
          placeholder="Add a note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="flex-1"
        />
        <Button className="bg-sapling hover:bg-sapling-accent text-white gap-2">
          <span className="text-lg">=</span>
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

      {/* Timeline Items - Single Column Flex Layout */}
      <div className="relative pl-12">
        {/* Timeline Items - Single Column with Alternating Alignment */}
        <div className="flex flex-col gap-6 relative z-10">
          {items.map((item, index) => renderTimelineItem(item, index))}
        </div>
      </div>
    </div>
  )
}
