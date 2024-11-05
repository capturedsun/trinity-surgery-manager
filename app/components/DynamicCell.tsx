"use client"
import Link from 'next/link';
import React from 'react';


interface DynamicCellProps extends React.ComponentPropsWithoutRef<"div"> {
	row: any;
}

const DynamicCell = React.forwardRef<HTMLDivElement, DynamicCellProps>(
	({ className, row, ...props }: DynamicCellProps, forwardedRef) => {
		const data = row?.original
		return (
			<>
				test
			</>
		);
	}
);

DynamicCell.displayName = "DynamicCell";

export { DynamicCell, type DynamicCellProps };

