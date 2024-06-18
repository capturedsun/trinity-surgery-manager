// Trinity status manager cell

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Badge, BadgeProps } from "@/components/Badge";
import { statuses, actionItems } from "@/data/data"

import { cx, focusRing } from "@/lib/utils"

const statusManagerVariants = tv({
  base: "flex gap-2",
});

interface StatusManagerProps extends React.ComponentPropsWithoutRef<"div"> {
  row: any; // Array of status types (e.g., ["communication", "insurance", "clearance/lab"])
}

const StatusManager = React.forwardRef<HTMLDivElement, StatusManagerProps>(
  ({ className, row, ...props }: StatusManagerProps, forwardedRef) => {
    const getStatus = (type: string) => {
		}
		const communicationStatus = statuses.find(
        (item) => item.value === row.getValue("status").communication,
		)
		const insuranceStatus = statuses.find(
        (item) => item.value === row.getValue("status").insurance,
		)
		const clearanceStatus = statuses.find(
        (item) => item.value === row.getValue("status").clearance,
		)

    return (
      <div ref={forwardedRef} className={cx(statusManagerVariants(), className)} {...props}>
				<Badge variant={(communicationStatus?.variant as BadgeProps["variant"]) ?? ("default" as BadgeProps["variant"])}>
          {communicationStatus?.label }
        </Badge>
				<Badge variant={(insuranceStatus?.variant as BadgeProps["variant"]) ?? ("default" as BadgeProps["variant"])}>
          {insuranceStatus?.label }
        </Badge>
				<Badge variant={(clearanceStatus?.variant as BadgeProps["variant"]) ?? ("default" as BadgeProps["variant"])}>
          {clearanceStatus?.label }
        </Badge>

      </div>
    );
  }
);

StatusManager.displayName = "StatusManager";

export { StatusManager, type StatusManagerProps };
