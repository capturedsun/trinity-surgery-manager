// Tremor Toast [v0.0.4]

import React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiLoader2Fill,
  RiCloseLine,
} from "@remixicon/react"

import { cx } from "@/app/lib/utils"

const ToastProvider = ToastPrimitives.Provider
ToastProvider.displayName = "ToastProvider"

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, forwardedRef) => (
  <ToastPrimitives.Viewport
    ref={forwardedRef}
    className={cx(
      "fixed right-0 top-0 z-[9999] m-0 flex w-full max-w-[100vw] list-none flex-col gap-2 p-[var(--viewport-padding)] [--viewport-padding:_15px] sm:max-w-md sm:gap-4",
      className,
    )}
    {...props}
  />
))

ToastViewport.displayName = "ToastViewport"

interface ActionProps {
  label: string
  altText: string
  onClick: () => void | Promise<void>
}

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  variant?: "info" | "success" | "warning" | "error" | "loading"
  title?: string
  description?: string
  action?: ActionProps
  disableDismiss?: boolean
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(
  (
    {
      className,
      variant,
      title,
      description,
      action,
      disableDismiss = false,
      ...props
    }: ToastProps,
    forwardedRef,
  ) => {
    let Icon: React.ReactNode

    switch (variant) {
      case "success":
        Icon = (
          <RiCheckboxCircleFill
            className="size-5 shrink-0 text-emerald-600 dark:text-emerald-500"
            aria-hidden="true"
          />
        )
        break
      case "warning":
        Icon = (
          <RiErrorWarningFill
            className="size-5 shrink-0 text-amber-500 dark:text-amber-500"
            aria-hidden="true"
          />
        )
        break
      case "error":
        Icon = (
          <RiCloseCircleFill
            className="size-5 shrink-0 text-red-600 dark:text-red-500"
            aria-hidden="true"
          />
        )
        break
      case "loading":
        Icon = (
          <RiLoader2Fill
            className="size-5 shrink-0 animate-spin text-gray-600 dark:text-gray-500"
            aria-hidden="true"
          />
        )
        break
      default:
        Icon = (
          <RiInformationFill
            className="size-5 shrink-0 text-blue-500 dark:text-blue-500"
            aria-hidden="true"
          />
        )
        break
    }

    return (
      <ToastPrimitives.Root
        ref={forwardedRef}
        className={cx(
          "flex flex-col gap-4 justify-center items-center cursor-default select-none text-sm",
          "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
          "data-[state=open]:animate-slideLeftAndFade",
          "data-[state=closed]:animate-hide",
          className
        )}
        tremor-id="tremor-raw"
        {...props}
      >
        <div className={cx(
          "relative z-10 h-fit p-[1px] w-full  rounded-[1.3rem] bg-neutral-300 flex justify-center items-center shadow-lg transition-all duration-300"
        )}>
          <div className="relative z-30 h-full w-full p-[1px] rounded-[1.25rem] bg-gradient-to-b from-indigo-50 to-indigo-100">
            <div className={cx("relative z-40 h-full w-full rounded-[1.2rem] bg-indigo-100 p-4 flex flex-col")}>
              <div className="flex flex-col gap-2">
                {!disableDismiss && (
                  <ToastPrimitives.Close
                    className={cx(
                      "absolute top-2 right-2 p-2 flex h-fit flex-1 items-center justify-center  text-sm transition-opacity",
                      "w-fit opacity-60 hover:opacity-100",
                      "text-gray-600 dark:text-gray-400",
                    )}
                    aria-label="Close"
                  >
                    <RiCloseLine className="size-5 h-fit p-0 shrink-0 text-indigo-900 dark:text-gray-50" aria-hidden="true" />
                  </ToastPrimitives.Close>
                )}
                {title && (
                  <ToastPrimitives.Title className="font-semibold text-indigo-900 dark:text-gray-50">
                    {title}
                  </ToastPrimitives.Title>
                )}
                {description && (
                  <ToastPrimitives.Description className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                  </ToastPrimitives.Description>
                )}
              </div>
              <div className="flex flex-col">
                {action && (
                  <>
                    {/* <ToastPrimitives.Action
                      altText={action.altText}
                      className={cx(
                        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive"
                      )}
                      onClick={(event) => {
                        event.preventDefault()
                        action.onClick()
                      }}
                      type="button"
                    >
                      {action.label}
                    </ToastPrimitives.Action>
                    <div className="h-px w-full bg-gray-200 dark:bg-gray-800" /> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </ToastPrimitives.Root>
    )
  },
)
Toast.displayName = "Toast"

type ToastActionElement = ActionProps

export {
  Toast,
  ToastProvider,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
}