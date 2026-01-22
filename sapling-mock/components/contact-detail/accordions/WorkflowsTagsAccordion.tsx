"use client"

import { X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Workflow {
  name: string
  status: "Active" | "Pending"
  stage: string
}

interface WorkflowsTagsAccordionProps {
  workflows?: Workflow[]
  tags?: string[]
}

const defaultWorkflows: Workflow[] = [
  { name: "Major Donor Stewardship", status: "Active", stage: "Cultivation Meeting Scheduled" },
  { name: "Capital Campaign", status: "Pending", stage: "Initial Ask" },
]

const defaultTags = ["Board Member", "Annual Gala Attendee", "Major Donor", "Legacy Society"]

export function WorkflowsTagsAccordion({
  workflows = defaultWorkflows,
  tags = defaultTags,
}: WorkflowsTagsAccordionProps) {
  return (
    <AccordionItem value="workflows">
      <AccordionTrigger className="hover:no-underline">
        Workflows and Tags
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Active Workflows</p>
            <div className="space-y-2">
              {workflows.map((workflow, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg p-3 ${
                    workflow.status === "Active"
                      ? "bg-sapling-light/5 border-sapling-light/20"
                      : "bg-amber-50 border-amber-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm">{workflow.name}</p>
                    <Badge
                      className={`border-none text-xs ${
                        workflow.status === "Active"
                          ? "bg-sapling-light/20 text-sapling"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Stage: {workflow.stage}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <Badge key={idx} className="bg-gray-100 text-gray-700 border-gray-200 gap-1">
                  {tag}
                  <button className="ml-1 hover:text-gray-900"><X className="w-3 h-3" /></button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="h-6 text-xs gap-1 bg-transparent">
                <Plus className="w-3 h-3" />
                Add Tag
              </Button>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
