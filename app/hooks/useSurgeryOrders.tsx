import { SurgeryOrder } from "@/src/entities/models/surgery-order"
import { useToast } from "@/app/lib/useToast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type GetSurgeryOrders = () => Promise<SurgeryOrder[]>
type UpdateSurgeryOrder = (data: Partial<SurgeryOrder>) => Promise<SurgeryOrder>
type CreateSurgeryOrder = (data: Partial<SurgeryOrder>) => Promise<SurgeryOrder>
const getSurgeryOrders: GetSurgeryOrders = async (): Promise<SurgeryOrder[]> => {
    const response = await fetch(`/api/surgery-orders`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch statuses.')
    }
    const res = await response.json()
  
    return res
}

const createSurgeryOrder: CreateSurgeryOrder = async (data: Partial<SurgeryOrder>): Promise<SurgeryOrder> => {
  const response = await fetch('/api/surgery-orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to create surgery order.')
  }

  const res = await response.json()
  return res
}

const updateSurgeryOrder: UpdateSurgeryOrder = async (data: Partial<SurgeryOrder>): Promise<SurgeryOrder> => {
    const response = await fetch('/api/surgery-orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to update surgery order.')
    }
    
    const res = await response.json()

    return res
}

export const useSurgeryOrders = () => {
  return useQuery({
    queryKey: ['surgeryOrders'],
    queryFn: async () => {
      const data = await getSurgeryOrders()
      return data
    },
  })
}

export const useCreateSurgeryOrder = () => {
  return useMutation({
    mutationFn: createSurgeryOrder,
  })
}

export const useUpdateSurgeryOrder = (options?: {
    onSuccess?: (data: SurgeryOrder) => void,
    onError?: (error: any) => void,
  }
) => {
  const { toast } = useToast()
  const client = useQueryClient()
  const { mutate: updateSurgeryOrderInfo } = useMutation({
    mutationFn: updateSurgeryOrder,
    onMutate: async (newSurgeryOrderData: Partial<SurgeryOrder>) => {
      const previousSurgeryOrderData = client.getQueryData<SurgeryOrder>(['surgeryOrders'])
      client.setQueryData<SurgeryOrder>(['surgeryOrders', newSurgeryOrderData.id], newSurgeryOrderData as SurgeryOrder)
      return { previousSurgeryOrderData }
    },
    onSuccess: (data) => {
        client.invalidateQueries({ queryKey: ['surgeryOrders'] })
        toast({
            variant: "success",
            title: "Updated Surgery Order",
            description: "We've updated the surgery order",
            duration: 2000,
        })
        if (options?.onSuccess) {
            options.onSuccess(data)
        }
    },
    onError: (error: any) => {
        client.setQueryData<SurgeryOrder>(['surgeryOrders'], context?.previousSurgeryOrderData);
        console.error('Error updating surgery order:', error.message || error)
        toast({
            variant: "error",
            title: "Update Failed",
            description: "We've failed to update the surgery order",
            duration: 2000,
        })
        if (options?.onError) {
            options.onError(error)
        }
    },
  })

  return updateSurgeryOrderInfo
}