import { startSpan } from "@sentry/nextjs"

export async function surgeryOrderActivityController() {
  return await startSpan({ name: "surgeryOrderActivityController" }, async () => {
    
  })
}