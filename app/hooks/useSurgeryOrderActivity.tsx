import { SurgeryOrderActivity } from "@/src/entities/models/surgery-order-activity"
import { useToast } from "@/app/lib/useToast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type GetSurgeryOrderActivity = (surgeryOrderID: string) => Promise<SurgeryOrderActivity[]>
type CreateSurgeryOrderActivity = (data: Partial<SurgeryOrderActivity>) => Promise<SurgeryOrderActivity>

const getSurgeryOrderActivity: GetSurgeryOrderActivity = async (surgeryOrderID: string): Promise<SurgeryOrderActivity[]> => {
    const response = await fetch(`/api/surgery-order-activities?id=${surgeryOrderID}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch activities.')
    }
    return response.json()
}

const createSurgeryOrderActivity: CreateSurgeryOrderActivity = async (activityData: Partial<SurgeryOrderActivity>): Promise<SurgeryOrderActivity> => {
  const response = await fetch('/api/surgery-order-activities', {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activityData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to create activity.')
  }
  return response.json()
}

export const useSurgeryOrderActivity = (surgeryOrderID: string, surgeryOrderActivity?: SurgeryOrderActivity) => {
  return useQuery({
    queryKey: ['surgeryOrderActivity'],
    queryFn: () => getSurgeryOrderActivity(surgeryOrderID)
  })
}

export const useCreateSurgeryOrderActivity = (options?: {
    onSuccess?: (data: SurgeryOrderActivity) => void,
    onError?: (error: any) => void,
  }
) => {
  const { toast } = useToast()
  const client = useQueryClient()
  
  const { mutate: createActivityInfo } = useMutation({
    mutationFn: createSurgeryOrderActivity,
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ['surgeryOrderActivity'] })
      toast({
        variant: "success",
        title: "Added Activity",
        description: "Activity has been recorded",
        duration: 2000,
      })
      if (options?.onSuccess) {
        options.onSuccess(data)
      }
    },
    onError: (error: any) => {
      console.error('Error creating activity:', error.message || error)
      toast({
        variant: "error",
        title: "Failed to Record",
        description: "Activity could not be recorded",
        duration: 2000,
      })
      if (options?.onError) {
        options.onError(error)
      }
    }
  })

  return createActivityInfo
}
