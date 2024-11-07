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
import { SurgeryOrder } from "@/src/entities/models/surgery-order"
import { CategorizedStatuses, Status } from "@/src/entities/models/status";

const statusManagerVariants = tv({
  base: "flex gap-2",
});

interface StatusManagerProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  statusID: bigint;
	statuses: Status[];
  statusCategory: string;
}

const StatusManager = ({ className, statusID, statuses, statusCategory }: StatusManagerProps) => {
	const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
		statuses.find(s => s.id === statusID) || null
	)
	const statusesForCategory = statuses.filter(s => s.category === statusCategory && s.label !== "none")

	const updateSurgeryOrder = useUpdateSurgeryOrder({
		onSuccess: () => {
		},
		onError: () => {
		}
	})
	
	const onStatusChange = async (value: string) => {
		try {
			updateSurgeryOrder({[statusCategory]: value} as Partial<SurgeryOrder>)
		} catch (error) {
			console.error(error)
		}
	}

    return (
		<div className={cx(statusManagerVariants(), className)}>
			<Select
				value={selectedStatus?.id.toString() ?? ""}
				onValueChange={(value: string) => {
					setSelectedStatus(statuses.find(s => s.id.toString() === value) || null);
			}}
			>
			<Badge
				className="relative cursor-pointer hover:ring-2 transition inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium gap-2"
				showSquare={selectedStatus?.style_variant !== "default"}
				variant={(selectedStatus?.style_variant as BadgeProps["variant"]) ?? "default"}
			>
				{selectedStatus?.label}
				<SelectTrigger style={{ all: "unset", position: "absolute", inset: 0, zIndex: 10, opacity: 0 }} />
			</Badge>
			<SelectContent>
				{statusesForCategory
					.map((s) => (
						<SelectItem key={s.id.toString()} value={s.id.toString()}>
							{s.label}
						</SelectItem>
					))}
			</SelectContent>
			</Select>
		</div>
    );
};

export { StatusManager, type StatusManagerProps };
