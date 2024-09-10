import { BarList } from "@/components/BarList"
import { Toaster } from "@/components/Toaster"
import { useToast } from "@/lib/useToast"

const data = [
  { name: "/home", value: 843 },
  { name: "/imprint", value: 46 },
  { name: "/cancellation", value: 3 },
  { name: "/blocks", value: 108 },
  { name: "/documentation", value: 384 },
]

export const BarListHero = () => {
  const { toast } = useToast()
  return (
    <>
      <Toaster />
      <BarList
        data={data}
        onValueChange={(item) =>
          toast({
            description: JSON.stringify(item, null, 2),
          })
        }
      />
    </>
  )
}