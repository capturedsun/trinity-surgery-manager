import { Badge, BadgeProps } from "@/app/components/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/Dropdown"
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
	const [validStatuses] = React.useState(Array.isArray(statuses) ? statuses : [])
	const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
		validStatuses && validStatuses.find(s => s.id === statusID) || null
	)
	const [statusesForCategory] = React.useState(
		validStatuses.filter(s => s.category === statusCategory && s.label !== "none")
	)

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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Badge
                        className="relative cursor-pointer hover:ring-2 transition inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium gap-2"
                        showSquare={selectedStatus?.style_variant !== "default"}
                        variant={(selectedStatus?.style_variant as BadgeProps["variant"]) ?? "default"}
                    >
                        {selectedStatus?.label}
                    </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                        {statusesForCategory.map((s) => (
                            <DropdownMenuItem
                                key={s.id.toString()}
                                onClick={() => {
                                    setSelectedStatus(s)
                                    onStatusChange(s.id.toString())
                                }}
                            >
                                {s.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export { StatusManager, type StatusManagerProps };
