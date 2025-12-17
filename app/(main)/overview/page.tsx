"use client"
import { Button } from "@/app/components/Button"
import { overviews } from "@/app/data/overview-data"
import { OverviewData } from "@/app/data/schema"
import { RiCloseLine, RiUploadLine } from "@remixicon/react"
import { subDays, toDate } from "date-fns"
import React from "react"
import { DateRange } from "react-day-picker"

import { Toaster } from "@/app/components/Toaster"
import { useToast } from "@/app/lib/useToast"



export type PeriodValue = "previous-period" | "last-year" | "no-comparison"

const categories: {
  title: keyof OverviewData
  type: "currency" | "unit"
}[] = [
    {
      title: "Rows read",
      type: "unit",
    },
    {
      title: "Rows written",
      type: "unit",
    },
    {
      title: "Queries",
      type: "unit",
    },
    {
      title: "Payments completed",
      type: "currency",
    },
    {
      title: "Sign ups",
      type: "unit",
    },
    {
      title: "Logins",
      type: "unit",
    },
    {
      title: "Sign outs",
      type: "unit",
    },
    {
      title: "Support calls",
      type: "unit",
    },
  ]

export type KpiEntry = {
  title: string
  percentage: number
  current: number
  allowed: number
  unit?: string
}

const data: KpiEntry[] = [
  {
    title: "Rows read",
    percentage: 48.1,
    current: 48.1,
    allowed: 100,
    unit: "M",
  },
  {
    title: "Rows written",
    percentage: 78.3,
    current: 78.3,
    allowed: 100,
    unit: "M",
  },
  {
    title: "Storage",
    percentage: 26,
    current: 5.2,
    allowed: 20,
    unit: "GB",
  },
]

const data2: KpiEntry[] = [
  {
    title: "Weekly active users",
    percentage: 21.7,
    current: 21.7,
    allowed: 100,
    unit: "%",
  },
  {
    title: "Total users",
    percentage: 70,
    current: 28,
    allowed: 40,
  },
  {
    title: "Uptime",
    percentage: 98.3,
    current: 98.3,
    allowed: 100,
    unit: "%",
  },
]

export type KpiEntryExtended = Omit<
  KpiEntry,
  "current" | "allowed" | "unit"
> & {
  value: string
  color: string
}

const data3: KpiEntryExtended[] = [
  {
    title: "Base tier",
    percentage: 68.1,
    value: "$200",
    color: "bg-indigo-600 ",
  },
  {
    title: "On-demand charges",
    percentage: 20.8,
    value: "$61.1",
    color: "bg-purple-600 ",
  },
  {
    title: "Caching",
    percentage: 11.1,
    value: "$31.9",
    color: "bg-gray-400 ",
  },
]

const donutChartData = [
  {
    name: "Not in RTA Status",
    amount: 39,
  },
  {
    name: "In RTA Status",
    amount: 179,
  },
]

const overviewsDates = overviews.map((item) => toDate(item.date).getTime())
const maxDate = toDate(Math.max(...overviewsDates))

export default function Overview() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [selectedDates, setSelectedDates] = React.useState<
    DateRange | undefined
  >({
    from: subDays(maxDate, 30),
    to: maxDate,
  })
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<PeriodValue>("last-year")

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    categories.map((category) => category.title),
  )

  const handleFiles = React.useCallback((fileList: FileList | null) => {
    if (!fileList) return

    const file = fileList[0] // Only take the first file
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (file.size > maxSize) {
      toast({
        variant: "error",
        title: "File rejected",
        description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" - File too large (max 5MB)`,
        duration: 4000,
      })
      return
    }

    setFiles([file]) // Only allow 1 file
  }, [toast])

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleFileInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [handleFiles])

  const handleRemoveFile = React.useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleUpload = React.useCallback(async () => {
    if (files.length === 0) {
      toast({
        variant: "error",
        title: "No file selected",
        description: "Please choose a file to upload.",
        duration: 4000,
      })
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('name', `File Upload - ${files[0].name}`)

      const response = await fetch('/api/airtable', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      toast({
        variant: "success",
        title: "File Uploaded",
        description: `File "${files[0].name}" uploaded to Airtable successfully.`,
        duration: 5000,
      })
      setFiles([])
    } catch (error) {
      toast({
        variant: "error",
        title: "Upload Failed",
        description: error instanceof Error ? error.message : 'Failed to upload file',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }, [files, toast])

  return (
    <>
      <section aria-labelledby="file-upload-section">
        <h1
          id="file-upload-section"
          className="title"
        >
          Surgery letter upload
        </h1>
        <div className="mt-4 w-full max-w-md">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6
              transition-colors
              ${isDragging ? "border-emerald-700 bg-emerald-50/30" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50/50"}
              ${isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"}
            `}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              disabled={isLoading}
            />
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <RiUploadLine className="size-6 text-gray-500" />
              </div>
              <p className="font-medium text-sm">Drag & drop file here</p>
              <p className="text-gray-500 text-xs">
                Or click to browse (max 5MB)
              </p>
            </div>
            <Button
              variant="secondary"
              className="mt-2 w-fit"
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
              disabled={isLoading}
            >
              Browse files
            </Button>
          </div>

          {files.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-2.5 rounded-md border p-3"
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium text-sm">
                      {file.name}
                    </span>
                    <span className="truncate text-gray-500 text-xs">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="size-7 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile(index)
                    }}
                    disabled={isLoading}
                  >
                    <RiCloseLine className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <Button
              type="button"
              onClick={handleUpload}
              isLoading={isLoading}
              className="mt-4 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload File"}
            </Button>
          )}

          <Toaster />
        </div>
      </section>
    </>
  )
}
