"use client"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface BiographyData {
  biography: string
  occupation: string
  employer: string
  industry: string
  education: string
  interests: string
  boardAffiliations: string
}

interface BiographyAccordionProps {
  data?: BiographyData
}

const defaultData: BiographyData = {
  biography: "Jennifer Lee is a successful entrepreneur and philanthropist based in Seattle. She founded TechCorp Inc. in 2010 and has been actively involved in various charitable causes, particularly in education and healthcare.",
  occupation: "CEO / Entrepreneur",
  employer: "TechCorp Inc.",
  industry: "Technology",
  education: "MBA, Stanford University",
  interests: "Education, Healthcare, Arts",
  boardAffiliations: "Seattle Children's Hospital",
}

export function BiographyAccordion({ data = defaultData }: BiographyAccordionProps) {
  return (
    <AccordionItem value="biography">
      <AccordionTrigger className="hover:no-underline text-lg text-sapling font-semibold">
        Biography and Research
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Biography</p>
            <p className="text-sm text-gray-700">{data.biography}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <p className="text-gray-500">Occupation</p>
              <p className="font-medium text-gray-900">{data.occupation}</p>
            </div>
            <div>
              <p className="text-gray-500">Employer</p>
              <p className="font-medium text-gray-900">{data.employer}</p>
            </div>
            <div>
              <p className="text-gray-500">Industry</p>
              <p className="font-medium text-gray-900">{data.industry}</p>
            </div>
            <div>
              <p className="text-gray-500">Education</p>
              <p className="font-medium text-gray-900">{data.education}</p>
            </div>
            <div>
              <p className="text-gray-500">Interests</p>
              <p className="font-medium text-gray-900">{data.interests}</p>
            </div>
            <div>
              <p className="text-gray-500">Board Affiliations</p>
              <p className="font-medium text-gray-900">{data.boardAffiliations}</p>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
