import { FC } from 'react'
import { SurgeryOrder } from '@/src/entities/models/surgery-order'
import { useSurgeryOrder } from '@/app/hooks/useSurgeryOrders'
import { useParams } from 'next/navigation'
import { cx } from '@/app/lib/utils'


interface ActivityBlockProps {
  className?: string
  children?: React.ReactNode
}

export const ActivityBlock: FC<ActivityBlockProps> = ({ children, className }) => {

  return (
    <div className={cx("mt-4 sm:mt-6 lg:mt-10 text-[0.8125rem] font-medium leading-[1.38462] w-full px-2 py-3 bg-stone-50 rounded-lg flex flex-col text-stone-500", className)}>
      {children}
    </div>
  )
}
