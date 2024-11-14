"use client"

import { Button } from "@/app/components/Button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogFooter, DialogClose } from "@/app/components/Dialog"
import { useState, useRef } from "react"
import { useStatuses } from "@/app/hooks/useStatuses"
import { Label } from "@/app/components/Label"
import { Input } from "@/app/components/Input"
import { useCreateSurgeryOrder } from "@/app/hooks/useSurgeryOrders"
import { CategorizedStatuses } from "@/src/entities/models/status"
import mammoth from "mammoth"

export function SurgeryOrderMenu() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: organizationStatuses } = useStatuses(true) as { data: CategorizedStatuses | undefined }
  const communicationStatuses = organizationStatuses?.["communication"]
  const clearanceStatuses = organizationStatuses?.["clearance"] 
  const insuranceStatuses = organizationStatuses?.["insurance"]
  const [file, setFile] = useState<File | null>(null);
  const [surgeryOrderFields, setSurgeryOrderFields] = useState<Array<{ name: string, value: string, type: string }>>([])

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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          
          const extractedData = extractFormData(result.value);
          console.log(extractedData)

          setSurgeryOrderFields(extractedData)
        } catch (error) {
          console.error("Error extracting text from file:", error);
        }
      } else {
        console.warn("Unsupported file type");
      }
    }
  };

  // Function to extract data into an array of objects
  function extractFormData(formText: string) {
    return formText.split('\n').reduce((acc, line) => {
      // Check if the line contains a colon followed by some text
      const match = line.match(/^(.+?):\s*(.*)/);
      if (match) {
        const name = match[1].trim();
        let value = match[2].trim();
        let type = "text"

        // Only keep the entry if the name contains allowed characters (alphanumeric, spaces, hyphens, underscores, apostrophes, and slashes)
        if (/^[a-zA-Z0-9\s\-_'/\\]+$/.test(name)) {
          // Limit the value to only the portion before any excessive spaces
          value = value.split(/\s{2,}/)[0].trim(); // Split by 2 or more consecutive spaces and take the first part

          acc.push({
            name,
            value,
            type
          });
        }
      }
      return acc;
    }, [] as { name: string; value: string; type: string }[]);
  }

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
          <div className="flex-1 flex flex-col gap-2">
            <div className="border border-1 border-dashed border-gray-300 outline-none transition rounded-lg bg-gray-50">
              <Label
                htmlFor="file-upload"
                className={`flex flex-col cursor-pointer items-center justify-center w-full transition rounded-lg bg-gray-50 ${surgeryOrderFields.length > 0 ? "h-auto" : "h-64"}`}
              >
                <Input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none ">
                  {file ? (
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">{file.name}</span>
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click anywhere</span> or drag and drop
                  </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                         DOC, DOCX (Max. 10MB)
                      </p>
                    </>
                  )}
                </div>
              </Label>
            </div>
            {surgeryOrderFields.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {surgeryOrderFields.map(({name, value}) => (
                  <div key={name} className="flex flex-col gap-0.5">
                    <Label className="text-xs font-semibold">{name}</Label>
                    <Input type="text" name={name} value={value} className="text-xs" />
                  </div>
                ))}
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
