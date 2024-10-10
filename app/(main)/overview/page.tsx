"use client"
import { CategoryBarCard } from "@/app/components/ui/overview/DashboardCategoryBarCard"
import { CircleChartCard } from "@/app/components/ui/overview/DashboardCircleChart"
import { overviews } from "@/app/data/overview-data"
import { OverviewData } from "@/app/data/schema"
import { subDays, toDate } from "date-fns"
import React from "react"
import { DateRange } from "react-day-picker"
import { Button } from "@/app/components/Button"

import { useToast } from "@/app/lib/useToast"
import { Toaster } from "@/app/components/Toaster"



export type PeriodValue = "previous-period" | "last-year" | "no-comparison"

const categories: {
  title: keyof OverviewData
  type: "currency" | "unit"
}[] = [
    {
      title: "Rows read",
      type: "unit",
    },
    {
      title: "Rows written",
      type: "unit",
    },
    {
      title: "Queries",
      type: "unit",
    },
    {
      title: "Payments completed",
      type: "currency",
    },
    {
      title: "Sign ups",
      type: "unit",
    },
    {
      title: "Logins",
      type: "unit",
    },
    {
      title: "Sign outs",
      type: "unit",
    },
    {
      title: "Support calls",
      type: "unit",
    },
  ]

export type KpiEntry = {
  title: string
  percentage: number
  current: number
  allowed: number
  unit?: string
}

const data: KpiEntry[] = [
  {
    title: "Rows read",
    percentage: 48.1,
    current: 48.1,
    allowed: 100,
    unit: "M",
  },
  {
    title: "Rows written",
    percentage: 78.3,
    current: 78.3,
    allowed: 100,
    unit: "M",
  },
  {
    title: "Storage",
    percentage: 26,
    current: 5.2,
    allowed: 20,
    unit: "GB",
  },
]

const data2: KpiEntry[] = [
  {
    title: "Weekly active users",
    percentage: 21.7,
    current: 21.7,
    allowed: 100,
    unit: "%",
  },
  {
    title: "Total users",
    percentage: 70,
    current: 28,
    allowed: 40,
  },
  {
    title: "Uptime",
    percentage: 98.3,
    current: 98.3,
    allowed: 100,
    unit: "%",
  },
]

export type KpiEntryExtended = Omit<
  KpiEntry,
  "current" | "allowed" | "unit"
> & {
  value: string
  color: string
}

const data3: KpiEntryExtended[] = [
  {
    title: "Base tier",
    percentage: 68.1,
    value: "$200",
    color: "bg-indigo-600 ",
  },
  {
    title: "On-demand charges",
    percentage: 20.8,
    value: "$61.1",
    color: "bg-purple-600 ",
  },
  {
    title: "Caching",
    percentage: 11.1,
    value: "$31.9",
    color: "bg-gray-400 ",
  },
]

const donutChartData = [
  {
    name: "Not in RTA Status",
    amount: 39,
  },
  {
    name: "In RTA Status",
    amount: 179,
  },
]

const overviewsDates = overviews.map((item) => toDate(item.date).getTime())
const maxDate = toDate(Math.max(...overviewsDates))

export default function Overview() {
  const { toast } = useToast()  
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedDates, setSelectedDates] = React.useState<
    DateRange | undefined
  >({
    from: subDays(maxDate, 30),
    to: maxDate,
  })
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<PeriodValue>("last-year")

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    categories.map((category) => category.title),
  )

  return (
    <>
      <section aria-labelledby="current-billing-cycle">
        <h1
          id="current-billing-cycle"
          className="title"
        >
          Referrals
        </h1>
        <div className="mt-4 gap-14 sm:mt-8 sm:grid-cols-2 lg:mt-10">
          <Button
            isLoading={isLoading}
            className={`my-4`}
            onClick={() => {
              setIsLoading(true)
              setTimeout(() => {
                toast({
                  variant: "success",
                  title: "Updated Status",
                  description: "Go to overview to see how toast is used",
                  duration: 5000,
                })
                setIsLoading(false)
              }, 2000)
            }}
          >
            Test Toast Trigger
          </Button>
          <Toaster />
          {/* <ProgressBarCard
            title="Usage"
            change="+0.2%"
            value="68.1%"
            valueDescription="of allowed capacity"
            ctaDescription="Monthly usage resets in 12 days."
            ctaText="Manage plan."
            ctaLink="#"
            data={data}
          /> */}
          {/* <ProgressBarCard
            title="Workspace"
            change="+2.9%"
            value="21.7%"
            valueDescription="weekly active users"
            ctaDescription="Add up to 20 members in free plan."
            ctaText="Invite users."
            ctaLink="#"
            data={data2}
          /> */}
          <CategoryBarCard
            title="Status Bottlenecks"
            className="sm:col-span-1 xl:col-span-1 mb-8"
          />
          <CircleChartCard
            title="Referral-to-Appointment"
            change="4.4%"
            value="79%"
            valueDescription="current quarter"
            ctaDescription="Set hard caps in"
            ctaText="cost spend management."
            ctaLink="#"
            data={donutChartData}
          />
        </div>
      </section>
      {/* <section aria-labelledby="usage-overview">
        <h1
          id="usage-overview"
          className="mt-16 scroll-mt-8 text-lg font-semibold text-gray-900 sm:text-xl "
        >
          Overview
        </h1>
        <div className="sticky top-16 z-20 flex items-center justify-between border-b border-gray-200 bg-white pb-4 pt-4 sm:pt-6 lg:top-0 lg:mx-0 lg:px-0 lg:pt-8  ">
          <Filterbar
            maxDate={maxDate}
            minDate={new Date(2024, 0, 1)}
            selectedDates={selectedDates}
            onDatesChange={(dates) => setSelectedDates(dates)}
            selectedPeriod={selectedPeriod}
            onPeriodChange={(period) => setSelectedPeriod(period)}
            categories={categories}
            setSelectedCategories={setSelectedCategories}
            selectedCategories={selectedCategories}
          />
        </div>
        <dl
          className={cx(
            "mt-10 grid grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
          )}
        >
          {categories
            .filter((category) => selectedCategories.includes(category.title))
            .map((category) => {
              return (
                <ChartCard
                  key={category.title}
                  title={category.title}
                  type={category.type}
                  selectedDates={selectedDates}
                  selectedPeriod={selectedPeriod}
                />
              )
            })}
        </dl>
      </section> */}
    </>
  )
}
