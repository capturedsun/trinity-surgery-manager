// Tremor Raw TabNavigation [v0.0.0]
"use client"
import * as NavigationMenuPrimitives from "@radix-ui/react-navigation-menu";
import * as React from 'react'
import { usePathname } from "next/navigation"
import { cx, focusRing } from "@/app/lib/utils";

function getSubtree(
  options: { asChild: boolean | undefined; children: React.ReactNode },
  content: React.ReactNode | ((children: React.ReactNode) => React.ReactNode),
) {
  const { asChild, children } = options
  if (!asChild)
    return typeof content === "function" ? content(children) : content

  const firstChild = React.Children.only(children) as React.ReactElement
  return React.cloneElement(firstChild, {
    children:
      typeof content === "function"
        ? content(firstChild.props.children)
        : content,
  })
}

const TabNavigation = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Root>,
    "orientation" | "defaultValue" | "dir"
  >
>(({ className, children, ...props }, forwardedRef) => (
  <NavigationMenuPrimitives.Root ref={forwardedRef} {...props} asChild={false}>
    <NavigationMenuPrimitives.List
      className={cx(
        // base
        "flex items-center justify-start gap-4 whitespace-nowrap border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        // border color
        "border-gray-200 dark:border-gray-800",
        className,
      )}
    >
      {children}
    </NavigationMenuPrimitives.List>
  </NavigationMenuPrimitives.Root>
))
TabNavigation.displayName = "TabNavigation"

const TabNavigationLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Link>,
  Omit<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Link>,
    "onSelect"
  > & { disabled?: boolean }
>(({ asChild, disabled, href, className, children, ...props }, forwardedRef) => {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <NavigationMenuPrimitives.Item className="flex">
      <NavigationMenuPrimitives.Link
        aria-disabled={disabled}
        className={cx(
          "group relative flex shrink-0 select-none items-center justify-center",
          disabled ? "pointer-events-none" : "",
        )}
        ref={forwardedRef}
        asChild={asChild}
        {...props}
      >
        {getSubtree({ asChild, children }, (children) => (
          <span
            className={cx(
              // base
              "-mb-px flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 pb-2 text-sm font-medium transition-all",
              // text color
              "text-gray-500 dark:text-gray-500",
              // hover
              "group-hover:text-gray-700 group-hover:dark:text-gray-400",
              // border hover
              "group-hover:border-gray-300 group-hover:dark:border-gray-400",
              // selected
              isActive ? 
              "group-data-[active]:border-emerald-600 group-data-[active]:text-emerald-600" : "",
              // disabled
              disabled
                ? "pointer-events-none text-gray-300 dark:text-gray-700"
                : "",
              focusRing,
              className,
            )}
          >
            {children}
          </span>
        ))}
        </NavigationMenuPrimitives.Link>
      </NavigationMenuPrimitives.Item>
  )
})

TabNavigationLink.displayName = "TabNavigationLink"

export { TabNavigation, TabNavigationLink };

