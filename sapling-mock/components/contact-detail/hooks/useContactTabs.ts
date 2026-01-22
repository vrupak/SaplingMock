import { useState } from "react"

export type ContactTab =
  | "at-a-glance"
  | "gifts"
  | "journey"
  | "notes"
  | "events"
  | "orchid"
  | "more"

export function useContactTabs(defaultTab: ContactTab = "at-a-glance") {
  const [activeTab, setActiveTab] = useState<ContactTab>(defaultTab)

  return {
    activeTab,
    setActiveTab,
  }
}
