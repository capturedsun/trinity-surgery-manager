import { Badge, BadgeProps } from "@/app/components/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/app/components/Select";
import React from "react";
import { tv } from "tailwind-variants";
import { cx } from "@/app/lib/utils";
import { useUpdateSurgeryOrder } from "@/app/hooks/useSurgeryOrders"
import { SurgeryOrder } from "@/src/entities/models/surgeryOrder";

const statusManagerVariants = tv({
  base: "flex gap-2",
});

interface StatusManagerProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  statusID: number;
  statusCode: string;
  statuses: [string];
}

const StatusManager = ({ className, statusID, statusCode, statuses, ...props }: StatusManagerProps) => {
	if (statusID === 0) statusID = 0;
    const [selectedStatusID, setSelectedStatusID] = React.useState<number>(statusID);
    const status = statuses.find((item) => item.id === selectedStatusID);
    const type = status?.type;

	const updateSurgeryOrder = useUpdateSurgeryOrder({
		onSuccess: () => {
		},
		onError: () => {
		}
	})
	
	const onStatusChange = async (value: string) => {
		try {
			updateSurgeryOrder({[statusCode]: value} as Partial<SurgeryOrder>)
		} catch (error) {
			console.error(error)
		}
	}

    return (
		<div className={cx(statusManagerVariants(), className)} {...props}>
			<Select
			value={selectedStatusID}
			onValueChange={(value: string) => {
				setSelectedStatusID(value);
				onStatusChange(value);
			}}
			>
			<Badge
				className="relative cursor-pointer hover:ring-2 transition inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium gap-2"
				showSquare={status?.variant !== "default"}
				variant={(status?.variant as BadgeProps["variant"]) ?? "default"}
			>
				{status?.label}
				<SelectTrigger style={{ all: "unset", position: "absolute", inset: 0, zIndex: 10, opacity: 0 }} />
			</Badge>
			<SelectContent>
			{statuses
				.filter((item) => item.type === type && item.value !== "")
				.map((filteredStatus) => (
				<SelectItem key={filteredStatus.value} value={filteredStatus.value}>
					{filteredStatus.label}
				</SelectItem>
				))}
			</SelectContent>
			</Select>
		</div>
    );
};

export { StatusManager, type StatusManagerProps };
