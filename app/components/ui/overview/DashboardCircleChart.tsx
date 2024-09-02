import { Badge } from "@/app/components/Badge"
import { DonutChart } from "@/app/components/DonutChart"


export type CardProps = {
  title: string
  change: string
  value: string
  valueDescription: string
  subtitle?: string
  ctaDescription: string
  ctaText: string
  ctaLink: string
  data: any[]
}

export function CircleChartCard({
  title,
  change,
  value,
  valueDescription,
  subtitle,
  data,
}: CardProps) {
  return (
    <>
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 sm:text-sm dark:text-gray-50">
              {title}
            </h3>
            <Badge variant="success">{change}</Badge>
          </div>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-xl text-gray-900 dark:text-gray-50">
              {value}
            </span>
            <span className="text-sm text-gray-500">{valueDescription}</span>
          </p>
          <div className="mt-4">
            {subtitle && (
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                {subtitle}
              </p>
            )}
            <div className="mt-2 flex items-center justify-center gap-0.5">
              <DonutChart
                data={data}
                category="name"
                value="amount"
                showLabel={true}
              />
            </div>
          </div>
          <ul role="list" className="mt-5 flex space-x-4">
            <li className="flex items-center gap-2 text-xs">
              <span
                className="bg-green-500 size-2.5 rounded-sm"
                aria-hidden="true"
              />
              <span className="text-gray-900 dark:text-gray-50">
                In RTA Status
              </span>
            </li>
            <li className="flex items-center gap-2 text-xs">
              <span
                className="bg-blue-500 size-2.5 rounded-sm"
                aria-hidden="true"
              />
              <span className="text-gray-900 dark:text-gray-50">
                Not in RTA Status
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
