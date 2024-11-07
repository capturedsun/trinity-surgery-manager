"use client"
import Link from 'next/link';
import React from 'react';
import { SurgeryOrder } from '@/app/data/schema';

interface DynamicCellProps extends React.ComponentPropsWithoutRef<"div"> {
	row: any;
}

const DynamicCell = React.forwardRef<HTMLDivElement, DynamicCellProps>(
	({ className, row, ...props }: DynamicCellProps, forwardedRef) => {
		const data = row?.original as SurgeryOrder
		return (
			<Link href={`${window.location.pathname}/${data.id}`}>
				<div className={className} {...props} ref={forwardedRef}>
					{data.patient_name}
					{data.date_scheduled?.toLocaleDateString()}
				</div>
			</Link>
		)
	}
)

DynamicCell.displayName = "DynamicCell"

export { DynamicCell, type DynamicCellProps }

