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
  statusType: string; // Array of status types (e.g., ["communication", "insurance", "clearance/lab"])
}

const StatusManager = React.forwardRef<HTMLDivElement, StatusManagerProps>(
  ({ className, statusType, ...props }: StatusManagerProps, forwardedRef) => {
		const status = statuses.find(
			(item) => item.value === statusType,
		)

    return (
      <div ref={forwardedRef} className={cx(statusManagerVariants(), className)} {...props}>
				<Badge variant={(status?.variant as BadgeProps["variant"]) ?? ("default" as BadgeProps["variant"])}>
          {status?.label }
        </Badge>
      </div>
    );
  }
);

StatusManager.displayName = "StatusManager";

export { StatusManager, type StatusManagerProps };
