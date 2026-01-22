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

function renderTimelineItem(item: TimelineItem) {
  const styles = timelineStyles[item.type]
  if (!styles) return null

  // Task-type items (pinned-note, overdue-task, open-task)
  if (["pinned-note", "overdue-task", "open-task"].includes(item.type)) {
    return <TaskTimelineItem key={item.id} item={item} styles={styles} />
  }

  // Specific item types
  switch (item.type) {
    case "gift":
      return <GiftTimelineItem key={item.id} item={item} styles={styles} />
    case "ask":
      return <AskTimelineItem key={item.id} item={item} styles={styles} />
    case "pledge":
      return <PledgeTimelineItem key={item.id} item={item} styles={styles} />
    case "contact-info-generated":
    case "wealth-info-generated":
    case "workflow-change":
    case "data-enrichment":
      return <AIGeneratedTimelineItem key={item.id} item={item} styles={styles} />
    case "document":
      return <DocumentTimelineItem key={item.id} item={item} styles={styles} />
    case "legacy-giving":
      return <LegacyGivingTimelineItem key={item.id} item={item} styles={styles} />
    case "event":
      return <EventTimelineItem key={item.id} item={item} styles={styles} />
    case "fulfillment":
      return <FulfillmentTimelineItem key={item.id} item={item} styles={styles} />
    case "membership":
      return <MembershipTimelineItem key={item.id} item={item} styles={styles} />
    case "call-note":
      return <CallNoteTimelineItem key={item.id} item={item} styles={styles} />
    default:
      return null
  }
}

export function ActivityTimeline({ items = mockTimelineItems }: ActivityTimelineProps) {
  const [noteText, setNoteText] = useState("")

  return (
    <div className="h-full">
      <h3 className="font-semibold text-gray-900 text-lg italic mb-4">Activity Timeline</h3>

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

      {/* Timeline Items */}
      <div className="space-y-4 max-h-[800px] overflow-y-auto">
        {items.map(renderTimelineItem)}
      </div>
    </div>
  )
}
