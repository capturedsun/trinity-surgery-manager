// Trinity status manager cell

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Badge, BadgeProps } from "@/components/Badge";
import { statuses, actionItems } from "@/data/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"

import { cx, focusRing } from "@/lib/utils"

const statusManagerVariants = tv({
  base: "flex gap-2",
});

interface StatusManagerProps extends React.ComponentPropsWithoutRef<"div"> {
  statusID: string;
}

const StatusManager = React.forwardRef<HTMLDivElement, StatusManagerProps>(
  ({ className, statusID, ...props }: StatusManagerProps, forwardedRef) => {
    if (statusID == "") statusID = "none"
		const status = statuses.find(
			(item) => item.value === statusID,
		)
    const type = status?.type

    const [selectedStatus, setSelectedStatus] = React.useState<string>(statusID);
    return (
      <div ref={forwardedRef} className={cx(statusManagerVariants(), className)} {...props}>
        <Select
          value={selectedStatus}
          onValueChange={(value) => {
            setSelectedStatus(value);
            // Optionally, add additional logic here to handle the selected value change
          }}
        >
            <Badge className="relative cursor-pointer hover:ring-2 transition" variant={(status?.variant as BadgeProps["variant"]) ?? ("default" as BadgeProps["variant"])}>
              {status?.label}
              <SelectTrigger style={{all: "unset", position:"absolute", top: "0px", left: "0px", zIndex: "10", width: "100%", height: "100%", opacity: "0px"}} className="">
              </SelectTrigger>
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
  }
);

StatusManager.displayName = "StatusManager";

export { StatusManager, type StatusManagerProps };
