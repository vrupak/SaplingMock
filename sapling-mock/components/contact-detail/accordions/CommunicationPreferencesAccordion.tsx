"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CommunicationPreferencesAccordionProps {
  optOuts?: string[]
  optIns?: string[]
  mailSchedule?: string
}

export function CommunicationPreferencesAccordion({
  optOuts = ["No Phone Calls", "No Text Messages"],
  optIns = ["Email Newsletter", "Annual Report", "Event Invitations"],
  mailSchedule = "quarterly",
}: CommunicationPreferencesAccordionProps) {
  return (
    <AccordionItem value="communication">
      <AccordionTrigger className="hover:no-underline">
        Communication Preferences
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Opt-Outs</p>
            <div className="flex flex-wrap gap-2">
              {optOuts.map((item, idx) => (
                <Badge key={idx} className="bg-red-50 text-red-700 border-red-200 gap-1">
                  {item}
                  <button className="ml-1 hover:text-red-900"><X className="w-3 h-3" /></button>
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Opt-Ins</p>
            <div className="flex flex-wrap gap-2">
              {optIns.map((item, idx) => (
                <Badge key={idx} className="bg-sapling-light/10 text-sapling border-sapling-light/30 gap-1">
                  {item}
                  <button className="ml-1 hover:text-sapling-dark"><X className="w-3 h-3" /></button>
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Mail Schedule</p>
            <Select defaultValue={mailSchedule}>
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
