import { Badge, BadgeProps } from "@/app/components/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/app/components/Select";
import { statuses } from "@/app/data/data";
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
  statusID: string;
  statusCode: string;
}

const StatusManager = ({ className, statusID, statusCode, ...props }: StatusManagerProps) => {
	if (statusID === "") statusID = "none";
    const [selectedStatus, setSelectedStatus] = React.useState<string>(statusID);
    const status = statuses.find((item) => item.value === selectedStatus);
    const type = status?.type;

	const updateSurgeryOrder = useUpdateSurgeryOrder({
		onSuccess: () => {
		},
		onError: () => {
		}
	})
	
	const onStatusChange = async (value: string) => {
		try {
			console.log(statusCode, value)
			await updateSurgeryOrder({[statusCode]: value} as Partial<SurgeryOrder>)
		} catch (error) {
			console.error(error)
		}
	}

    return (
		<div className={cx(statusManagerVariants(), className)} {...props}>
			<Select
			value={selectedStatus}
			onValueChange={(value: string) => {
				setSelectedStatus(value);
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
					.filter((item) => item.type === type && item.value !== "none")
					.map((filteredStatus) => (
						<SelectItem key={filteredStatus.value || ""} value={filteredStatus.value || ""}>
						{filteredStatus.label}
						</SelectItem>
					))}
			</SelectContent>
			</Select>
		</div>
    );
};

export { StatusManager, type StatusManagerProps };
