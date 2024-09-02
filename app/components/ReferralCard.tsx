"use client"
import Link from 'next/link';
import React from 'react';


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
				<Link href={`/patients/${data.referralNumber}`}>
					<span className="font-medium underline cursor-pointer">{data.name}</span>
				</Link>
			</div>
		);
	}
);

ReferralCard.displayName = "ReferralCard";

export { ReferralCard, type ReferralCardProps };

