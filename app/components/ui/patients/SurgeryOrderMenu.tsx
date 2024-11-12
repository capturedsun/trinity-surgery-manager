"use client"

import { Button } from "@/app/components/Button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogFooter, DialogClose } from "@/app/components/Dialog"
import { ModalAddSurgeryOrder } from "@/app/components/ui/patients/ModalAddSurgeryOrder"
import { useState, useRef } from "react"
import { useStatuses } from "@/app/hooks/useStatuses"
import { Label } from "@/app/components/Label"
import { Input } from "@/app/components/Input"
import { useCreateSurgeryOrder } from "@/app/hooks/useSurgeryOrders"
import { Status, CategorizedStatuses } from "@/src/entities/models/status"

export function SurgeryOrderMenu() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: organizationStatuses } = useStatuses(true) as { data: CategorizedStatuses | undefined }
  const communicationStatuses = organizationStatuses?.["communication"]
  const clearanceStatuses = organizationStatuses?.["clearance"] 
  const insuranceStatuses = organizationStatuses?.["insurance"]
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const createSurgeryOrderInfo = useCreateSurgeryOrder({
    onSuccess: (data) => {
      setIsLoading(false)
      console.log(data)
    },
    onError: (error) => {
      setIsLoading(false)
      console.error(error)
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (event.target.files) {
    //   setFile(event.target.files[0]);
    // }
    console.log(event.target.files)
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const surgeryOrderData = Object.fromEntries(formData.entries())
    createSurgeryOrderInfo(surgeryOrderData)
  }
  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-1">
            Add Surgery Order
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M6 6.5L8.5 4L11 6.5" 
                stroke="white" 
                strokeWidth="1.25" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M11 9.5L8.5 12L6 9.5" 
                stroke="white" 
                strokeWidth="1.25" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl min-h-[95vh] flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1"
          encType="multipart/form-data"
          method="post"
        >
          <DialogTitle className="hidden">
          </DialogTitle>
          <h2>
            File Upload
          </h2>
          <div className="flex-1">
          <Label
            htmlFor="file-upload"
            className="flex flex-col cursor-pointer items-center justify-center w-full h-64 border border-1 border-dashed border-gray-300 transition rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <Input
              type="file"
              id="file-upload"
              name="file"
              accept=".doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click anywhere</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF, PNG, DOC, DOCX (Max. 10MB)
              </p>
            </div>
          </Label>
            {file && (
              <div className="mt-4 flex items-center justify-between p-2 border rounded bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-300">{file.name}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
                <button onClick={handleRemoveFile} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  X
                </button>
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button className="mt-1 w-full sm:mt-0 sm:w-fit" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!file}
                className="w-full sm:w-fit"
              >
                Add Surgery Order
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
        </DialogContent>
      </Dialog>
  )
}
