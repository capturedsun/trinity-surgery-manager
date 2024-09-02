import { Badge, BadgeProps } from "@/app/components/Badge"
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
import { updateStatusTag } from "@/app/settings/actions"
import { CategorizedTags, StatusTag } from "@/data/schema"
import { useEffect, useState } from "react"

export type ModalManageStatusTagProps = {
  children: React.ReactNode
  categories: CategorizedTags[]
  existingTag?: StatusTag
  onSave: (tag: Partial<StatusTag>) => void
}

const styleVariants: BadgeProps["variant"][] = ["default", "neutral", "success", "error", "warning", "progress"]

export function ModalManageStatusTag({ children, categories, existingTag, onSave }: ModalManageStatusTagProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStyleVariant, setSelectedStyleVariant] = useState<BadgeProps["variant"]>("default")
  const [hasChanged, setHasChanged] = useState(false)
  const isFormValid = name.trim() !== "" && selectedCategory.trim() !== ""
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (existingTag) {
      setName(existingTag.label)
      setDescription(existingTag.description || "")
      setSelectedCategory(existingTag.category)
      setSelectedStyleVariant(existingTag.style_variant as BadgeProps["variant"])
      setHasChanged(true)
    }
  }, [existingTag])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const tagData: Partial<StatusTag> = {
      label: name,
      description,
      category: selectedCategory,
      style_variant: selectedStyleVariant,
    }
    if (existingTag) {
      tagData.id = existingTag.id
    }
    setIsLoading(true)
    const updatedTag = await updateStatusTag(tagData)
    setIsLoading(false)
    if (updatedTag) {
      onSave(updatedTag as Partial<StatusTag>)
      setIsOpen(false)
    }
  }

  const modalTitle = existingTag ? "Edit status tag" : "Add a new status tag"
  const submitButtonText = existingTag ? "Update status tag" : "Add status tag"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form
          onSubmit={handleSubmit}
        >
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
              {existingTag ? "Edit an existing status tag for your organization." : "Create a new status tag for your organization."}
            </DialogDescription>
            <div className="mt-4">
              <Label htmlFor="name-status" className="font-medium">
                Name
              </Label>
              <Input
                id="name-status"
                name="name-status"
                placeholder="Enter status name..."
                className="mt-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="description-status" className="font-medium">
                Description
              </Label>
              <Input
                id="description-status"
                name="description-status"
                placeholder="Enter optional description..."
                className="mt-2"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="category-status" className="font-medium">
                Category
              </Label>
              <Select
                onValueChange={(value) => setSelectedCategory(value)}
                value={selectedCategory}
              >
                <SelectTrigger
                  id="category-status"
                  name="category-status"
                  className="mt-2"
                >
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent align="end">
                  {categories.map((categoryObj) => (
                    <SelectItem key={categoryObj.category} value={categoryObj.category}>
                      {categoryObj.category.charAt(0).toUpperCase() + categoryObj.category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Label htmlFor="style-variant-status" className="font-medium">
                Style Variant
              </Label>
              <Select
                onValueChange={(value) => setSelectedStyleVariant(value as BadgeProps["variant"])}
                value={selectedStyleVariant}
              >
                <SelectTrigger
                  id="style-variant-status"
                  name="style-variant-status"
                  className="mt-2"
                >
                  <SelectValue placeholder="Select style variant..." />
                </SelectTrigger>
                <SelectContent align="end" className="">
                  {styleVariants.map((variant) => (
                    <SelectItem key={variant} value={variant || ""} className="">
                      <Badge variant={variant} className="">
                        {variant}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full sm:w-fit"
              disabled={!isFormValid || !hasChanged}
              isLoading={isLoading}
            >
              {submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
