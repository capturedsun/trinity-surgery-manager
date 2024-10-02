import { Status } from "@/src/entities/models/status"
import { useToast } from "@/app/lib/useToast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type GetStatuses = (categorized: boolean) => Promise<Status[]>
type AddStatus = (statusData: Partial<Status>) => Promise<Status>
type EditStatus = (statusData: Partial<Status>) => Promise<Status>
type DeleteStatus = () => Promise<void>

const getStatuses: GetStatuses = async (sortByCategory: boolean): Promise<Status[]> => {
  const response = await fetch(`/api/organization/statuses?categorized=${sortByCategory}`, {
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

const addStatus: AddStatus = async (statusData: Partial<Status>): Promise<Status> => {
  const response = await fetch('/api/organization/statuses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(statusData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to add status.')
  }

  return response.json()
}

const editStatus: EditStatus = async (statusData: Partial<Status>): Promise<Status> => {
  const response = await fetch('/api/organization/statuses', {
    method: 'PATCH',
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

export const useStatus = (sortByCategory: boolean) => {
  return useQuery({
    queryKey: ['statuses'],
    queryFn: async () => {
      const data = await getStatuses(sortByCategory)
      return data
    },
  })
}

export const useStatuses = (sortByCategory: boolean) => {
  return useQuery({
    queryKey: ['statuses'],
    queryFn: async () => {
      const data = await getStatuses(sortByCategory)
      return data
    },
  })
}

export const useUpdateStatus = (options?: {
    onSuccess?: (data: Status) => void,
    onError?: (error: any) => void,
  }
) => {
  const { toast } = useToast()
  const client = useQueryClient()
  const { mutate: updateStatusInfo } = useMutation({
    mutationFn: editStatus,
    onMutate: async (newStatusData: Partial<Status>) => {
      const previousStatusData = client.getQueryData<Status>(['statuses'])
      client.setQueryData<Status>(['statuses', newStatusData.id], newStatusData as Status)
      return { previousStatusData }
    },
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ['statuses'] })
      toast({
        variant: "success",
        title: "Updated Status",
        description: "We've updated the status",
        duration: 2000,
      })
      if (options?.onSuccess) {
        options.onSuccess(data)
      }
    },
    onError: (error: any) => {
      console.error('Error updating status:', error.message || error)
      toast({
        variant: "error",
        title: "Update Failed",
        description: "We've failed to update the status",
        duration: 2000,
      })
      if (options?.onError) {
        options.onError(error)
      }
    },
  })

  return updateStatusInfo
}

export const useAddStatus = (options?: {
  onSuccess?: (data: Status) => void,
  onError?: (error: any) => void,
}) => {
  const { toast } = useToast()
  const client = useQueryClient()
  const { mutateAsync: addStatusInfo } = useMutation({
    mutationFn: addStatus,
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ['statuses'] })
      toast({
        variant: "success",
        title: "Added Status",
        description: "We've added the status",
        duration: 2000,
      })
      if (options?.onSuccess) {
        options.onSuccess(data)
      }
    },
    onError: (error: any) => {
      console.error('Error adding status:', error.message || error)
      toast({
        variant: "error",
        title: "Add Failed",
        description: "We've failed to add the status",
        duration: 2000,
      })
      if (options?.onError) {
        options.onError(error)
      }
    },
  })

  return addStatusInfo
}

export const useDeleteStatus = () => {
  const { toast } = useToast()
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