import { Organization } from "@/src/entities/models/organization"
import { toast } from "@/app/lib/useToast"
import { useQuery } from "@tanstack/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { User } from "@/src/entities/models/user"

type GetOrganization = () => Promise<{ organization: Organization, users: User[] }>
type EditOrganization = (organizationData: Partial<Organization>) => Promise<Organization>
type DeleteOrganization = () => Promise<void>
type AddOrganization = (organizationData: Partial<Organization>) => Promise<Organization>

const getOrganization: GetOrganization = async (): Promise<{ organization: Organization, users: User[] }> => {
  const response = await fetch('/api/organization', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch organization')
  }
  return response.json()
}

const editOrganization: EditOrganization = async (organizationData: Partial<Organization>): Promise<Organization> => {
  const response = await fetch('/api/organization', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(organizationData),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to update organization')
  }
  return response.json()
}

const deleteOrganization: DeleteOrganization = async (): Promise<void> => {
  const response = await fetch('/api/organization', {
    method: 'DELETE',
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to delete organization')
  }
}

export const useOrganization = () => {
  return useQuery({
    queryKey: ['organization'],
    queryFn: async () => {
      const data = await getOrganization();
      return data
    },
  })
}

export const useUpdateOrganization = () => {
  return useMutation({
    mutationFn: editOrganization,
  })
}