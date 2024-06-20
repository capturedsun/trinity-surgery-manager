"use client"
import React from 'react';
import { tv, type VariantProps } from "tailwind-variants";

import { cx, focusRing } from "@/lib/utils"

interface ReferralCardProps extends React.ComponentPropsWithoutRef<"div"> {
	row: any;
}

const ReferralCard = React.forwardRef<HTMLDivElement, ReferralCardProps>(
  ({ className, row, ...props }: ReferralCardProps, forwardedRef) => {
		const data = row?.original
		return (
			<div>
				{data.referralNumber}
				<br />
				{data.fromOrganization}
				<br />
				{data.toProvider}
				<br />
				<span className={`font-medium underline cursor-pointer`}>{data.name}</span>
			</div>
		);
	}
);

ReferralCard.displayName = "ReferralCard";

export { ReferralCard, type ReferralCardProps };
