"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface WealthData {
  estimatedNetWorth: string
  annualIncome: string
  realEstate: string
  stockHoldings: string
  businessInterests: string
  philanthropyScore: string
  givingCapacity: string
  lastScreened: string
}

interface WealthAccordionProps {
  data?: WealthData
}

const defaultData: WealthData = {
  estimatedNetWorth: "$5M - $10M",
  annualIncome: "$500K - $1M",
  realEstate: "$2.5M (3 properties)",
  stockHoldings: "$1.2M (est.)",
  businessInterests: "TechCorp Inc. (Founder)",
  philanthropyScore: "High (8/10)",
  givingCapacity: "$50K - $100K",
  lastScreened: "October 15, 2024",
}

export function WealthAccordion({ data = defaultData }: WealthAccordionProps) {
  return (
    <AccordionItem value="wealth">
      <AccordionTrigger className="hover:no-underline text-lg text-sapling font-semibold">
        Wealth
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <p className="text-gray-500">Estimated Net Worth</p>
            <p className="font-medium text-gray-900">{data.estimatedNetWorth}</p>
          </div>
          <div>
            <p className="text-gray-500">Annual Income</p>
            <p className="font-medium text-gray-900">{data.annualIncome}</p>
          </div>
          <div>
            <p className="text-gray-500">Real Estate</p>
            <p className="font-medium text-gray-900">{data.realEstate}</p>
          </div>
          <div>
            <p className="text-gray-500">Stock Holdings</p>
            <p className="font-medium text-gray-900">{data.stockHoldings}</p>
          </div>
          <div>
            <p className="text-gray-500">Business Interests</p>
            <p className="font-medium text-gray-900">{data.businessInterests}</p>
          </div>
          <div>
            <p className="text-gray-500">Philanthropy Score</p>
            <p className="font-medium text-sapling">{data.philanthropyScore}</p>
          </div>
          <div>
            <p className="text-gray-500">Giving Capacity</p>
            <p className="font-medium text-sapling">{data.givingCapacity}</p>
          </div>
          <div>
            <p className="text-gray-500">Last Screened</p>
            <p className="font-medium text-gray-900">{data.lastScreened}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4 gap-2 border-dashed bg-transparent text-sm">
          <Sparkles className="w-4 h-4" />
          Generate Wealth Information
        </Button>
      </AccordionContent>
    </AccordionItem>
  )
}
