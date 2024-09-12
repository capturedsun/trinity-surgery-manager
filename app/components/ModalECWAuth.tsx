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
import { Input } from "@/app/components/Input"
import { Label } from "@/app/components/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/Select"

export type ModalECWAuthProps = {
  htmlBody: string
}

export function ModalECWAuth({ htmlBody }: ModalECWAuthProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{htmlBody}</DialogTrigger>
      <DialogContent>
        <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
      </DialogContent>
    </Dialog>
  )
}