"use client"
import { Button } from "@/app/components/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/Dialog"
import { Checkbox } from "@/app/components/Checkbox"
import { Input } from "@/app/components/Input"
import { Label } from "@/app/components/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/Select"
import { useState } from "react"
import { useStatuses } from "@/app/hooks/useStatuses"
import { useCreateSurgeryOrder } from "@/app/hooks/useSurgeryOrders"
import { Status, CategorizedStatuses } from "@/src/entities/models/status"
export type ModalAddSurgeryOrderProps = {
  children: React.ReactNode
  className?: string
}

export function ModalAddSurgeryOrder({ children, className }: ModalAddSurgeryOrderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: organizationStatuses } = useStatuses(true) as { data: CategorizedStatuses | undefined }
  const communicationStatuses = organizationStatuses?.["communication"]
  const clearanceStatuses = organizationStatuses?.["clearance"] 
  const insuranceStatuses = organizationStatuses?.["insurance"]
  const [file, setFile] = useState<File | null>(null);

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
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
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
      <DialogTrigger 
        className={className}
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl min-h-[95vh] flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1"
        >
          <DialogHeader>
            <DialogTitle className="text-lg">Add a new surgery order</DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
              Add a new surgery order to the system.
            </DialogDescription>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">File Upload</h2>
            <div className="border border-dashed border-1 border-grey-200 rounded-md py-4 px-1.5 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer text-indigo-500">
                Drag and drop or <span className="underline">choose file</span> to upload
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Recommended max. size: 10 MB, Accepted file types: PDF, PNG
              </p>
            </div>
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
            <div className="mt-4 flex justify-end space-x-2">
              <Button 
                variant="solid"
                className="w-full"
              >
                Upload
              </Button>
            </div>
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
