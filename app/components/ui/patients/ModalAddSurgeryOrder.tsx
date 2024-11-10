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
      <DialogContent className="max-w-3xl p-6">
        <form
          onSubmit={handleSubmit}
        >
          <DialogHeader>
            <DialogTitle className="text-lg">Add a new surgery order</DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
              Add a new surgery order to the system.
            </DialogDescription>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="patient-name" className="text-sm font-medium">Patient Name</Label>
                  <Input id="patient-name" name="patient_name" placeholder="Enter patient name..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="provider" className="text-sm font-medium">Provider</Label>
                  <Input id="provider" name="provider" placeholder="Enter provider..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="facility" className="text-sm font-medium">Facility</Label>
                  <Input id="facility" name="facility" placeholder="Enter facility..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="surgery-date" className="text-sm font-medium">Surgery Date</Label>
                  <Input id="surgery-date" name="surgery_date" type="date" className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="procedure" className="text-sm font-medium">Procedure</Label>
                  <Input id="procedure" name="procedure" placeholder="Enter procedure..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="first-assist" className="text-sm font-medium">First Assist</Label>
                  <Input id="first-assist" name="first_assist" placeholder="Enter first assist..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="surgical-assistant" className="text-sm font-medium">Surgical Assistant</Label>
                  <Input id="surgical-assistant" name="surgical_assistant" placeholder="Enter surgical assistant..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="surgery-instructions" className="text-sm font-medium">Surgery Instructions</Label>
                  <Input id="surgery-instructions" name="surgery_instructions" placeholder="Enter surgery instructions..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="length" className="text-sm font-medium">Surgery Length</Label>
                  <Input id="length" name="length" placeholder="Enter length..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="vendor" className="text-sm font-medium">Vendor</Label>
                  <Input id="vendor" name="vendor" placeholder="Enter vendor..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="supplies" className="text-sm font-medium">Supplies and Special Equipment</Label>
                  <Input id="supplies" name="supplies" placeholder="Enter supplies..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="classification" className="text-sm font-medium">Classification</Label>
                  <Input id="classification" name="classification" placeholder="Enter classification..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="clearance" className="text-sm font-medium">Clearance</Label>
                  <Input id="clearance" name="clearance" placeholder="Enter clearance..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="anesthesia_type" className="text-sm font-medium">Anesthesia Type</Label>
                  <Input id="anesthesia_type" name="anesthesia_type" placeholder="Enter Anesthesia Type..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                  <Input id="notes" name="notes" placeholder="Enter notes..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="pre-op-diagnosis" className="text-sm font-medium">Pre-op Diganosis</Label>
                  <Input id="pre-op-diagnosis" name="pre_op_diagnosis" placeholder="Enter pre-op diagnosis..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="pre-op-labs" className="text-sm font-medium">Pre-op Labs</Label>
                  <Input id="pre-op-labs" name="pre_op_labs" placeholder="Enter pre-op labs..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="pre-op-visit-dme" className="text-sm font-medium">Pre-op Visit DME</Label>
                  <Input id="pre-op-visit-dme" name="pre_op_visit_dme" placeholder="Enter pre-op visit DME..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="post-op-visit" className="text-sm font-medium">Post-op Visit</Label>
                  <Input id="post-op-visit" name="post_op_visit" placeholder="Enter post-op visit..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="insurance-auth" className="text-sm font-medium">Insurance Auth</Label>
                  <Input id="insurance-auth" name="insurance_auth" placeholder="Enter insurance auth..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="patient-cost" className="text-sm font-medium">Patient Cost</Label>
                  <Input id="patient-cost" name="patient_cost" type="number" placeholder="Enter patient cost..." className="mt-1 text-sm" />
                </div>
                <div>
                  <Label htmlFor="insurance-status" className="text-sm font-medium">Insurance Status</Label>
                  <Select name="insurance_status">
                    <SelectTrigger id="insurance-status" className="mt-1 text-sm">
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                      {insuranceStatuses?.map((status) => (
                        <SelectItem key={status.id} value={status.id.toString()}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="clearance-status" className="text-sm font-medium">Clearance Status</Label>
                  <Select name="clearance_status">
                    <SelectTrigger id="clearance-status" className="mt-1 text-sm">
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                      {clearanceStatuses?.map((status) => (
                        <SelectItem key={status.id} value={status.id.toString()}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="comm-status" className="text-sm font-medium">Communication Status</Label>
                  <Select name="comm_status">
                    <SelectTrigger id="comm-status" className="mt-1 text-sm">
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                      {communicationStatuses?.map((status) => (
                        <SelectItem key={status.id} value={status.id.toString()}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="surgery-orders-faxed" name="surgery_orders_faxed" />
                  <Label htmlFor="surgery-orders-faxed" className="text-sm font-medium">Surgery Orders Faxed</Label>
                </div>
              </div>
            </div>
          </DialogHeader>
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
