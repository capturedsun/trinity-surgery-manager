import { Badge } from "@/components/Badge"
import { BarChart } from "@/components/Barchart"
import { cx } from "@/lib/utils"

import type { KpiEntryExtended } from "@/app/(main)/overview/page"

export type CardProps = {
  title: string
  change?: string
  value?: string
  valueDescription?: string
  subtitle?: string
  ctaDescription?: string
  ctaText?: string
  ctaLink?: string
  data?: KpiEntryExtended[]
  className?: string
}

const chartdata = [
  {
    status: "Pending Dr. Approval for Diagnosis",
    count: 0,
  },
  {
    status: "Pending Referral",
    count: 4,
  },
  {
    status: "Left Message 1",
    count: 12,
  },
  {
    status: "Left Message 2",
    count: 6,
  },
  {
    status: "Left Message 3",
    count: 2,
  },
  {
    status: "Accepted- Per Patient Request Follow Up to Schedule",
    count: 0,
  },
  {
    status: "Accepted- Patient will call back to schedule",
    count: 6,
  },
]

export function CategoryBarCard({
  title,
  change,
  value,
  valueDescription,
  subtitle,
  ctaDescription,
  ctaText,
  ctaLink,
  data,
  className,
}: CardProps) {
  return (
    <>
      <div className={cx("flex flex-col justify-between", className)}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 sm:text-sm dark:text-gray-50">
              {title}
            </h3>
            {change && <Badge variant="neutral">{change}</Badge>}
          </div>
          <BarChart
            className="h-80 mt-4"
            data={chartdata}
            index="status"
            layout="vertical"
            categories={["count"]}
            valueFormatter={(number: number) => number.toString()}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
    </>
  )
}
