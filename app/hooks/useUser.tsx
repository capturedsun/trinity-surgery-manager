import { User } from "@/src/entities/models/user"
import { toast } from "@/app/lib/useToast"
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type GetUser = () => Promise<User>;
type GetUsers = () => Promise<User[]>;
type EditUser = (userData: Partial<User>) => Promise<User>;
type DeleteUser = () => Promise<void>;

const getUsers: GetUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch users. JARVIS, initiate protocol "User Not Found".')
  }
  return response.json()
}

const getUser: GetUser = async (): Promise<User> => {
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch user.')
  }

  const { user } = await response.json()
  return user
}

const editUser: EditUser = async (userData: Partial<User>): Promise<User> => {
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to update user.')
  }

  return response.json()
}

const deleteUser: DeleteUser = async (): Promise<void> => {
  const response = await fetch('/api/user', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to delete user. JARVIS, initiate protocol "User Not Found".')
  }
  return response.json()
}

export const useUser = () => {
  return  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await getUser();
      return data;
    },
  })
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const data = await getUsers();
      return data;
    },
  })
}

export const useUpdateUser = () => {
  const client = useQueryClient()
  const { mutate: updateUserInfo } = useMutation({
    mutationFn: editUser,
    onMutate: async (newUserData: User) => {
      const previousUserData = client.getQueryData<User>(['GET_ALL_USERS'])
      client.setQueryData<User>(['GET_ALL_USERS', newUserData.id], newUserData)
      return { previousUserData }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['GET_ALL_USERS'] })
      toast({
        variant: "success",
        title: "Updated Profile",
        description: "We've updated your profile",
      })
    },
    onError: (error) => {
      console.error('Error updating user:', error)
      toast({
        variant: "error",
        title: "Update Failed",
        description: "We've failed to update your profile",
      })
    },
  })

  return updateUserInfo
}

export const useDeleteUser = () => {
  const client = useQueryClient()
  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['GET_ALL_USERS'] })
      toast({
        variant: "success",
        title: "Deleted Profile",
        description: "We've deleted your profile",
      })
    },
    onError: (error) => {
      console.error('Error deleting user:', error)
      toast({
        variant: "error",
        title: "Delete Failed",
        description: "We've failed to delete your profile",
      })
    },
  })

  return deleteUserMutation
}