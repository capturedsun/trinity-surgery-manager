import { Status } from "@/src/entities/models/status"
import { toast } from "@/app/lib/useToast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type GetStatuses = () => Promise<Status[]>
type EditStatus = (statusData: Partial<Status>) => Promise<Status>
type DeleteStatus = () => Promise<void>

const getStatuses: GetStatuses = async (): Promise<Status[]> => {
  const response = await fetch('/api/organization/statuses', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch statuses.')
  }
  const data = await response.json()

  return data.statuses
}

const editStatus: EditStatus = async (statusData: Partial<Status>): Promise<Status> => {
  const response = await fetch('/api/organization/statuses', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(statusData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to update status.')
  }

  return response.json()
}

const deleteStatus: DeleteStatus = async (): Promise<void> => {
  const response = await fetch('/api/organization/statuses', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to delete status.')
  }
  return response.json()
}

export const useStatus = () => {
  return useQuery({
    queryKey: ['statuses'],
    queryFn: async () => {
      const data = await getStatuses()
      return data
    },
  })
}

export const useStatuses = () => {
  return useQuery({
    queryKey: ['statuses'],
    queryFn: async () => {
      const data = await getStatuses()
      return data
    },
  })
}

export const useUpdateStatus = () => {
  const client = useQueryClient()
  const { mutate: updateStatusInfo } = useMutation({
    mutationFn: editStatus,
    onMutate: async (newStatusData: Status) => {
      const previousStatusData = client.getQueryData<Status>(['statuses'])
      client.setQueryData<Status>(['statuses', newStatusData.id], newStatusData)
      return { previousStatusData }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['statuses'] })
      toast({
        variant: "success",
        title: "Updated Status",
        description: "We've updated the status",
      })
    },
    onError: (error) => {
      console.error('Error updating status:', error)
      toast({
        variant: "error",
        title: "Update Failed",
        description: "We've failed to update the status",
      })
    },
  })

  return updateStatusInfo
}

export const useDeleteStatus = () => {
  const client = useQueryClient()
  const { mutate: deleteStatusMutation } = useMutation({
    mutationFn: deleteStatus,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['statuses'] })
      toast({
        variant: "success",
        title: "Deleted Status",
        description: "We've deleted the status",
      })
    },
    onError: (error) => {
      console.error('Error deleting status:', error)
      toast({
        variant: "error",
        title: "Delete Failed",
        description: "We've failed to delete the status",
      })
    },
  })

  return deleteStatusMutation
}