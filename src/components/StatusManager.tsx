// Trinity status manager cell

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Badge, BadgeProps } from "@/components/Badge";
import { statuses, actionItems } from "@/data/data"

import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Popover"

import { cx, focusRing } from "@/lib/utils"

const statusManagerVariants = tv({
  base: "flex gap-2",
});

interface StatusManagerProps extends React.ComponentPropsWithoutRef<"div"> {
  statusID: string; // Array of status types (e.g., ["communication", "insurance", "clearance/lab"])
}

const StatusManager = React.forwardRef<HTMLDivElement, StatusManagerProps>(
  ({ className, statusID, ...props }: StatusManagerProps, forwardedRef) => {
    if (statusID == "") statusID = "none"
		const status = statuses.find(
			(item) => item.value === statusID,
		)
    const type = status?.type
    return (
      <div ref={forwardedRef} className={cx(statusManagerVariants(), className)} {...props}>
        <Popover>
          <PopoverTrigger asChild>
            <Badge className="cursor-pointer hover:ring-2 transition" variant={(status?.variant as BadgeProps["variant"]) ?? ("default" as BadgeProps["variant"])}>
              {status?.label}
            </Badge>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2 flex flex-col gap-2">
              {statuses
                .filter((item) => item.type === type && item.value !== "none")
                .map((filteredStatus, index) => (
                  <Label key={index}>
                    <Checkbox />
                    {filteredStatus.label}
                  </Label>
                ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

StatusManager.displayName = "StatusManager";

export { StatusManager, type StatusManagerProps };
