"use client"

import { useState } from "react"
import {
  Menu,
  Calendar,
  Edit2,
  Trash2,
  Pin,
  Phone,
  Mail,
  FileText,
  Users as UsersIcon,
  Send,
  CheckCircle2,
  AlertCircle,
  Circle,
  Sparkles,
  TrendingUp,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion } from "@/components/ui/accordion"
import { IndividualsSection } from "../IndividualsSection"
import {
  WealthAccordion,
  CommunicationPreferencesAccordion,
  WorkflowsTagsAccordion,
  BiographyAccordion,
  RelationshipsAccordion,
  EmailListsAccordion,
} from "../accordions"
import type { Contact } from "../types"

interface NotesTasksTabProps {
  showSidebar: boolean
  onToggleSidebar: () => void
  contact: Contact
}

type TaskStatus = "open" | "overdue" | "resolved"
type ActivityType =
  | "call"
  | "email"
  | "meeting"
  | "general"
  | "branch"
  | "contact-info"
  | "wealth-info"
  | "workflow"
  | "data-enrichment"
  | "document"
  | "pledge"
  | "loi"
  | "overdue-task"
  | "open-task"

interface Task {
  id: string
  type: string
  title: string
  dueDate: string
  owner: string
  status: TaskStatus
}

interface ActivityItem {
  id: string
  type: ActivityType
  author: string
  title: string
  content: string
  outcome?: string
  nextSteps?: string
  timestamp: string
  isPinned?: boolean
  replies?: Reply[]
  metadata?: any
}

interface Reply {
  id: string
  author: string
  content: string
  timestamp: string
}

const mockTasks: Task[] = [
  {
    id: "t1",
    type: "Call",
    title: "Follow up on capital campaign discussion",
    dueDate: "Due: 11/14/2025",
    owner: "Maria Garcia",
    status: "open",
  },
  {
    id: "t2",
    type: "Email",
    title: "Send proposal for leadership gift naming opportunities",
    dueDate: "Due: 11/19/2025",
    owner: "Maria Garcia",
    status: "open",
  },
  {
    id: "t3",
    type: "Email",
    title: "Send annual report to major donors",
    dueDate: "Completed: 11/7/2024",
    owner: "Sarah Johnson",
    status: "resolved",
  },
  {
    id: "t4",
    type: "Visit",
    title: "Campus tour and lunch meeting",
    dueDate: "Completed: 11/4/2024",
    owner: "Maria Garcia",
    status: "resolved",
  },
  {
    id: "t5",
    type: "Meeting",
    title: "Schedule site visit for grant review",
    dueDate: "Due: 10/17/2024",
    owner: "Alex Russo",
    status: "overdue",
  },
  {
    id: "t6",
    type: "Call",
    title: "Thank you call for recent donation",
    dueDate: "Due: 10/24/2024",
    owner: "Maria Garcia",
    status: "overdue",
  },
]

const mockPinnedNotes: ActivityItem[] = [
  {
    id: "pn1",
    type: "general",
    author: "Maria Garcia",
    title: "",
    content:
      "Major donor prospect - previous $500K gift in 2022. Interested in naming opportunities for new science building.",
    timestamp: "November 4, 2024 at 4:20 PM",
    isPinned: true,
  },
  {
    id: "pn2",
    type: "general",
    author: "Sarah Johnson",
    title: "",
    content: "Prefers email communication. Best time to reach is weekday mornings 9-11am.",
    timestamp: "October 14, 2024 at 10:00 AM",
    isPinned: true,
  },
]

const mockActivityFeed: ActivityItem[] = [
  {
    id: "a1",
    type: "loi",
    author: "Maria Garcia",
    title: "LOI for capital campaign leadership gift",
    content:
      "Received signed Letter of Intent from Jennifer indicating interest in a $100,000-$150,000 leadership gift to capital campaign, pending final proposal review. This represents a significant commitment and leadership role.",
    outcome: "Received",
    nextSteps: "Develop detailed proposal with naming opportunities",
    timestamp: "February 19, 2024 • 11:00",
  },
  {
    id: "a2",
    type: "pledge",
    author: "Maria Garcia",
    title: "$15,000 Active",
    content: "Pledge for building expansion, 3 annual payments of $5,000",
    timestamp: "Maria Garcia • November 10, 2025 • 9:00 AM",
    metadata: {
      fund: "Capital Campaign",
      installments: "3 (Annual)",
      balance: "$10,000",
      nextPayment: "December 10, 2025",
    },
  },
  {
    id: "a3",
    type: "contact-info",
    author: "Sapling AI",
    title: "CONTACT INFORMATION GENERATED",
    content: "Email: jennifer.lee@techcorp.com, Phone: (555) 123-4567, Address: 123 Main St, San Francisco, CA 94102",
    timestamp: "Sapling AI • November 10, 2025 at 11:30 AM",
  },
  {
    id: "a4",
    type: "wealth-info",
    author: "Sapling AI",
    title: "WEALTH INFORMATION GENERATED",
    content:
      "Estimated Capacity: $100K-$250K, Real Estate Value: $1.2M, Business Affiliations: Tech Executive, Wealth Rating: High",
    timestamp: "Sapling AI • November 10, 2025 at 11:45 AM",
  },
  {
    id: "a5",
    type: "workflow",
    author: "Orchid AI",
    title: "ORCHID AI WORKFLOW CHANGE",
    content:
      'Workflow "Major Donor Stewardship" changed from "Initial Outreach" to "Cultivation Meeting Scheduled". Next action: Schedule in-person meeting within 2 weeks.',
    timestamp: "Orchid AI • November 10, 2025 at 12:00 PM",
  },
  {
    id: "a6",
    type: "data-enrichment",
    author: "Sapling System",
    title: "DATA ENRICHMENT",
    content: "Wealth screening, contact info, and social profiles updated",
    timestamp: "Sapling System • November 10, 2025 at 10:15 PM",
  },
  {
    id: "a7",
    type: "document",
    author: "Maria Garcia",
    title: "Gift Agreement",
    content: "Signed gift agreement for $15,000 capital campaign pledge",
    timestamp: "Maria Garcia • November 10, 2025 at 10:00 AM",
    metadata: {
      filename: "Capital Campaign Gift Agreement 2024.pdf",
      notes: "Three-year commitment with annual payments",
    },
  },
  {
    id: "a8",
    type: "meeting",
    author: "Maria Garcia",
    title: "Capital Campaign Presentation",
    content:
      "Scheduled in-person meeting at her office to present capital campaign details and discuss naming opportunities.",
    outcome: "Scheduled",
    nextSteps: "Prepare custom presentation deck",
    timestamp: "November 14, 2024 • 11:00",
  },
  {
    id: "a9",
    type: "general",
    author: "Maria Garcia",
    title: "Prepare campaign materials",
    content:
      "Create custom capital campaign packet for Jennifer including impact projections, naming opportunities, and multi-year pledge options.",
    outcome: "Pending",
    nextSteps: "Complete by Nov 14",
    timestamp: "November 11, 2024 • 09:00",
  },
  {
    id: "a10",
    type: "email",
    author: "Alex Russo",
    title: "Monthly impact report sent",
    content:
      "Sent November impact report highlighting scholarship fund successes. Included personalized note thanking her for DAF contributions.",
    outcome: "Sent",
    nextSteps: "Monitor for response",
    timestamp: "November 6, 2024 • 14:20",
  },
  {
    id: "a11",
    type: "general",
    author: "Maria Garcia",
    title: "Conversation at Gala",
    content:
      "Had excellent conversation with Jennifer at annual gala. She mentioned her interest in expanding scholarship programs and asked about building project timelines. Very engaged and enthusiastic.",
    outcome: "Informational",
    nextSteps: "Follow up with campaign information",
    timestamp: "November 4, 2024 • 15:30",
  },
  {
    id: "a12",
    type: "branch",
    author: "Maria Garcia",
    title: "Campaign Materials Coordination",
    content:
      "@Alex Russo Can you help pull together Jennifer's impact history for the capital campaign materials? Need her lifetime giving and program involvement for the custom deck.",
    outcome: "Branch sent to Alex Russo",
    nextSteps: "Incorporate into presentation",
    timestamp: "November 9, 2025 • 14:15",
    replies: [
      {
        id: "r1",
        author: "Alex Russo",
        content:
          "Done! Jennifer has given $125K lifetime across 3 years, primarily to scholarships. She's attended 8 events and volunteers quarterly. Full breakdown in the shared folder!",
        timestamp: "Nov 10, 2025 at 8:45 AM",
      },
    ],
  },
  {
    id: "a13",
    type: "branch",
    author: "Sarah Johnson",
    title: "Campaign Groundbreaking Invitation",
    content:
      "@Emily Chen Jennifer is a leadership donor in our capital campaign. Can you coordinate with events to ensure she receives VIP treatment at the groundbreaking ceremony?",
    outcome: "Branch sent to Emily Chen",
    nextSteps: "Confirm invitation details",
    timestamp: "November 19, 2024 • 09:00",
    replies: [
      {
        id: "r2",
        author: "Emily Chen",
        content:
          "VIP invitation sent! Reserved front row seating and arranged for Executive Director to personally greet her. Also added private donor reception before ceremony.",
        timestamp: "Nov 20, 2024 at 3:15 AM",
      },
    ],
  },
  {
    id: "a14",
    type: "call",
    author: "Maria Garcia",
    title: "Follow-up on Capital Campaign",
    content:
      "Called Jennifer to discuss her potential participation in the capital campaign. She expressed interest in learning more about the building expansion.",
    outcome: "Positive",
    nextSteps: "Send detailed campaign materials and schedule in-person meeting",
    timestamp: "November 9, 2025 • 10:30",
  },
  {
    id: "a15",
    type: "overdue-task",
    author: "Alex Russo",
    title: "Schedule site visit for grant review",
    content: "Due: October 17, 2024 at 10:00 AM • Owner: Alex Russo",
    timestamp: "Due: October 17, 2024 at 10:00 AM",
  },
  {
    id: "a16",
    type: "overdue-task",
    author: "Maria Garcia",
    title: "Thank you call for recent donation",
    content: "Due: October 24, 2024 at 3:30 PM • Owner: Maria Garcia",
    timestamp: "Due: October 24, 2024 at 3:30 PM",
  },
  {
    id: "a17",
    type: "open-task",
    author: "Maria Garcia",
    title: "Follow up on capital campaign discussion",
    content: "Created: November 10, 2025 at 10:30 AM\nDue: November 14, 2025 at 2:00 PM\nOwner: Maria Garcia",
    timestamp: "Created: November 10, 2025 at 10:30 AM",
  },
]

function TaskCard({ task }: { task: Task }) {
  const statusStyles = {
    open: "bg-sapling-light/10 border-sapling-light/30",
    overdue: "bg-red-50 border-red-200",
    resolved: "bg-green-50 border-green-200",
  }

  const statusIcons = {
    open: <Circle className="w-4 h-4 text-sapling" />,
    overdue: <AlertCircle className="w-4 h-4 text-red-600" />,
    resolved: <CheckCircle2 className="w-4 h-4 text-green-600" />,
  }

  return (
    <div className={`border rounded-lg p-3 ${statusStyles[task.status]}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{statusIcons[task.status]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-700">{task.type}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-600">{task.dueDate}</span>
          </div>
          <h4 className="text-sm font-semibold text-gray-900 mb-1">{task.title}</h4>
          <p className="text-xs text-gray-600">Owner: {task.owner}</p>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Edit2 className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>
    </div>
  )
}

function PinnedNoteCard({ note }: { note: ActivityItem }) {
  return (
    <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 relative">
      <div className="flex items-start gap-3 mb-3">
        <Pin className="w-4 h-4 text-orange-600 flex-shrink-0 mt-1" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Pinned Note</span>
      </div>
      <p className="text-sm text-gray-900 mb-3">{note.content}</p>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>Added by: {note.author}</span>
        <span>•</span>
        <span>{note.timestamp}</span>
      </div>
      <div className="absolute top-3 right-3 flex gap-2">
        <button className="p-1.5 hover:bg-orange-100 rounded">
          <Edit2 className="w-3.5 h-3.5 text-orange-600" />
        </button>
        <button className="p-1.5 hover:bg-orange-100 rounded">
          <Trash2 className="w-3.5 h-3.5 text-orange-600" />
        </button>
      </div>
    </div>
  )
}

function ActivityCard({ activity }: { activity: ActivityItem }) {
  const activityConfig = {
    call: {
      icon: <Phone className="w-4 h-4 text-blue-600" />,
      border: "border-blue-200",
      bg: "bg-white",
      label: "Call",
      labelColor: "text-blue-700",
    },
    email: {
      icon: <Mail className="w-4 h-4 text-purple-600" />,
      border: "border-purple-200",
      bg: "bg-white",
      label: "Email",
      labelColor: "text-purple-700",
    },
    meeting: {
      icon: <Calendar className="w-4 h-4 text-purple-600" />,
      border: "border-purple-200",
      bg: "bg-white",
      label: "Meeting",
      labelColor: "text-purple-700",
    },
    general: {
      icon: <FileText className="w-4 h-4 text-gray-600" />,
      border: "border-gray-200",
      bg: "bg-white",
      label: "General",
      labelColor: "text-gray-700",
    },
    branch: {
      icon: <UsersIcon className="w-4 h-4 text-sapling" />,
      border: "border-sapling-light/40",
      bg: "bg-white",
      label: "Branch",
      labelColor: "text-sapling-dark",
    },
    "contact-info": {
      icon: <Sparkles className="w-4 h-4 text-sapling" />,
      border: "border-sapling-light/40",
      bg: "bg-white",
      label: "CONTACT INFORMATION GENERATED",
      labelColor: "text-sapling-dark",
    },
    "wealth-info": {
      icon: <TrendingUp className="w-4 h-4 text-green-600" />,
      border: "border-green-300",
      bg: "bg-green-50",
      label: "WEALTH INFORMATION GENERATED",
      labelColor: "text-green-700",
    },
    workflow: {
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      border: "border-purple-300",
      bg: "bg-purple-50",
      label: "ORCHID AI WORKFLOW CHANGE",
      labelColor: "text-purple-700",
    },
    "data-enrichment": {
      icon: <Database className="w-4 h-4 text-orange-600" />,
      border: "border-orange-300",
      bg: "bg-orange-50",
      label: "DATA ENRICHMENT",
      labelColor: "text-orange-700",
    },
    document: {
      icon: <FileText className="w-4 h-4 text-blue-600" />,
      border: "border-blue-300",
      bg: "bg-blue-50",
      label: "DOCUMENT",
      labelColor: "text-blue-700",
    },
    pledge: {
      icon: <TrendingUp className="w-4 h-4 text-sapling" />,
      border: "border-sapling-light/40",
      bg: "bg-sapling-light/10",
      label: "PLEDGE",
      labelColor: "text-sapling-dark",
    },
    loi: {
      icon: <FileText className="w-4 h-4 text-orange-600" />,
      border: "border-orange-300",
      bg: "bg-white",
      label: "LOI",
      labelColor: "text-orange-700",
    },
    "overdue-task": {
      icon: <AlertCircle className="w-4 h-4 text-red-600" />,
      border: "border-red-300",
      bg: "bg-red-50",
      label: "OVERDUE TASK",
      labelColor: "text-red-700",
    },
    "open-task": {
      icon: <Circle className="w-4 h-4 text-sapling" />,
      border: "border-sapling-light/40",
      bg: "bg-sapling-light/10",
      label: "TASK: OPEN",
      labelColor: "text-sapling-dark",
    },
  }

  const config = activityConfig[activity.type]

  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{config.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold uppercase ${config.labelColor}`}>{config.label}</span>
            {activity.type !== "contact-info" &&
              activity.type !== "wealth-info" &&
              activity.type !== "workflow" &&
              activity.type !== "data-enrichment" && (
                <>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-600">{activity.author} added a note</span>
                </>
              )}
          </div>
          {activity.title && <h4 className="text-sm font-bold text-gray-900 mb-2">{activity.title}</h4>}
          <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{activity.content}</p>
          {activity.metadata && (
            <div className="bg-gray-50 rounded p-3 mb-3 text-xs text-gray-700 space-y-1">
              {activity.metadata.fund && <p><strong>Fund:</strong> {activity.metadata.fund}</p>}
              {activity.metadata.installments && (
                <p>
                  <strong>Installments:</strong> {activity.metadata.installments}{" "}
                  <strong className="ml-4">Balance:</strong> {activity.metadata.balance}
                </p>
              )}
              {activity.metadata.nextPayment && <p><strong>Next Payment:</strong> {activity.metadata.nextPayment}</p>}
              {activity.metadata.filename && <p className="font-semibold">{activity.metadata.filename}</p>}
              {activity.metadata.notes && <p><strong>Notes:</strong> {activity.metadata.notes}</p>}
            </div>
          )}
          {activity.outcome && (
            <p className="text-xs text-gray-600 mb-1">
              <span className="font-semibold">Outcome:</span> {activity.outcome}
            </p>
          )}
          {activity.nextSteps && (
            <p className="text-xs text-gray-600 mb-2">
              <span className="font-semibold">Next Steps:</span> {activity.nextSteps}
            </p>
          )}
          <p className="text-xs text-gray-500">{activity.timestamp}</p>

          {/* Threaded Replies */}
          {activity.replies && activity.replies.length > 0 && (
            <div className="mt-4 ml-6 border-l-2 border-gray-200 pl-4 space-y-3">
              {activity.replies.map((reply) => (
                <div key={reply.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <UsersIcon className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs font-semibold text-gray-700">{reply.author}</span>
                    <span className="text-xs text-gray-500">• replied</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
                  <p className="text-xs text-gray-500">{reply.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Edit2 className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Trash2 className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function NotesTasksTab({ showSidebar, onToggleSidebar, contact }: NotesTasksTabProps) {
  const [selectedTaskStatus, setSelectedTaskStatus] = useState<TaskStatus>("open")
  const [taskTitle, setTaskTitle] = useState("")
  const [noteSubject, setNoteSubject] = useState("")
  const [branchMessage, setBranchMessage] = useState("")

  const filteredTasks = mockTasks.filter((task) => task.status === selectedTaskStatus)
  const taskCounts = {
    open: mockTasks.filter((t) => t.status === "open").length,
    overdue: mockTasks.filter((t) => t.status === "overdue").length,
    resolved: mockTasks.filter((t) => t.status === "resolved").length,
  }

  return (
    <div className="flex items-start h-auto">
      {/* Left Column: Sidebar (Fixed Width) - Conditionally Rendered */}
      {showSidebar && (
        <div className="w-[380px] flex-shrink-0 p-6 border-r border-sapling-light/20">
          <IndividualsSection contact={contact} />

          {/* Accordion Sections - All Collapsed by Default */}
          <Accordion type="multiple" defaultValue={[]} className="mt-6">
            <WealthAccordion />
            <CommunicationPreferencesAccordion />
            <WorkflowsTagsAccordion />
            <BiographyAccordion />
            <RelationshipsAccordion />
            <EmailListsAccordion />
          </Accordion>
        </div>
      )}

      {/* Main Content Area (Flexible Width) */}
      <div className={`flex-1 min-w-0 ${showSidebar ? 'pl-6' : 'p-6'} h-auto`}>
        {/* Header with Menu Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onToggleSidebar}
            className={`p-2 hover:bg-gray-100 rounded transition-colors ${showSidebar ? 'bg-gray-100' : ''}`}
            title={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-xl font-semibold text-sapling-dark">Notes & Tasks</h2>
        </div>

        {/* Top Three-Column Grid: Add Task, Add Note, Task Status/Grow Branch */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Column 1: Add a Task */}
          <div className="bg-white border border-sapling-light/20 rounded-lg p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Add a Task</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Task Type *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                  <option>General</option>
                  <option>Call</option>
                  <option>Email</option>
                  <option>Meeting</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Task *</label>
                <Input
                  placeholder="Task title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Description</label>
                <textarea
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Due Date *</label>
                <Input type="date" className="text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="recurring" className="w-4 h-4" />
                <label htmlFor="recurring" className="text-sm text-gray-700">
                  RECURRING
                </label>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Individual</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                  <option>Select individual</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Owner *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                  <option>Maria Garcia</option>
                </select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">ADD TASK</Button>
            </div>
          </div>

          {/* Column 2: Add a Note */}
          <div className="bg-white border border-sapling-light/20 rounded-lg p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Add a Note</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Note Type *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                  <option>General</option>
                  <option>Call</option>
                  <option>Email</option>
                  <option>Meeting</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Date *</label>
                <Input type="date" className="text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Time</label>
                <Input type="time" placeholder="--:-- --" className="text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Subject *</label>
                <Input
                  placeholder="Note subject"
                  value={noteSubject}
                  onChange={(e) => setNoteSubject(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Description</label>
                <textarea
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Outcome</label>
                <Input placeholder="Outcome" className="text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Next Steps</label>
                <Input placeholder="Next steps" className="text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Individual</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                  <option>Select individual</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pin-important" className="w-4 h-4" />
                <label htmlFor="pin-important" className="text-sm text-gray-700">
                  PIN AS IMPORTANT
                </label>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">ADD NOTE</Button>
            </div>
          </div>

          {/* Column 3: Task Status Filter + Task List + Grow Branch */}
          <div className="space-y-4">
            {/* Task Status Filters */}
            <div className="bg-white border border-sapling-light/20 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => setSelectedTaskStatus("open")}
                  className={`px-2 py-2 rounded text-xs font-semibold transition-colors ${
                    selectedTaskStatus === "open"
                      ? "bg-sapling-light/20 text-sapling-dark border-2 border-sapling-dark"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  Open Tasks ({taskCounts.open})
                </button>
                <button
                  onClick={() => setSelectedTaskStatus("overdue")}
                  className={`px-2 py-2 rounded text-xs font-semibold transition-colors ${
                    selectedTaskStatus === "overdue"
                      ? "bg-red-50 text-red-700 border-2 border-red-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  Overdue ({taskCounts.overdue})
                </button>
                <button
                  onClick={() => setSelectedTaskStatus("resolved")}
                  className={`px-2 py-2 rounded text-xs font-semibold transition-colors ${
                    selectedTaskStatus === "resolved"
                      ? "bg-green-100 text-green-800 border-2 border-green-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  Resolved ({taskCounts.resolved})
                </button>
              </div>

              {/* Task List - No scrollbar, natural expansion */}
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Grow a Branch Card */}
            <div className="bg-green-50 border-2 border-sapling-light rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <UsersIcon className="w-5 h-5 text-sapling" />
                <h3 className="text-base font-semibold text-gray-900">Grow a Branch</h3>
              </div>
              <p className="text-xs text-gray-600 mb-4">Branch Messaging</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Send To *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white">
                    <option>Select team member...</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Category *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white">
                    <option>General</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white">
                    <option>Normal</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase">Message *</label>
                  <textarea
                    placeholder="Type your message about this donor..."
                    value={branchMessage}
                    onChange={(e) => setBranchMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">This will appear as a note on this contact's record</p>
                </div>
                <Button className="w-full bg-sapling hover:bg-sapling-dark text-white gap-2">
                  <Send className="w-4 h-4" />
                  SEND BRANCH MESSAGE
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Notes Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-sapling-dark mb-4">Pinned Notes</h3>
          <div className="space-y-4">
            {mockPinnedNotes.map((note) => (
              <PinnedNoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>

        {/* Comprehensive Activity Feed Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-sapling-dark mb-4">Notes</h3>
          <div className="space-y-4">
            {mockActivityFeed.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
