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
	const [open, setOpen] = React.useState(false)
	const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null)
	const [statusesForCategory, setStatusesForCategory] = React.useState<Status[] | null>(null)

    React.useEffect(() => {
        const categoryStatuses = statuses[statusCategory as keyof typeof statuses]        
        setStatusesForCategory(Array.isArray(categoryStatuses) ? categoryStatuses.filter((s: Status) => s.label !== "none") : [])
        setSelectedStatus(Array.isArray(categoryStatuses) ? categoryStatuses.find((s: Status) => BigInt(s.id) === BigInt(statusID)) || null : null)
    }, [statusID, statuses, statusCategory])

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
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                    onClick={(e) => {
                        e.preventDefault()
                    }}
                >
                    {selectedStatus && (
                        <Badge
                            className="relative cursor-pointer hover:ring-2 transition inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium gap-2"
                            showSquare={selectedStatus?.style_variant !== "default"}
                            variant={(selectedStatus?.style_variant as BadgeProps["variant"]) ?? "default"}
                        >
                            {selectedStatus?.label}
                        </Badge>
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                        {Array.isArray(statusesForCategory) && statusesForCategory.length > 0 && statusesForCategory.map((s) => (
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
