"use client"

import { useToast } from "@/app/lib/useToast"

import { Toast, ToastProvider, ToastViewport } from "@/app/components/Toast"

export const Toaster = () => {
  const { toasts } = useToast()

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, ...props }) => {
        return <Toast key={id} {...props} />
      })}
      <ToastViewport />
    </ToastProvider>
  )
}