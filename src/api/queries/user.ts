import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  fetchUser,
  createUser,
  resetPassword,
  fetchUserEmailAvailability,
  fetchMyUser,
} from '../endpoints'
import type { CreateUserPayload, ResetPasswordPayload } from '../models'
import { useAuth } from '@/common/auth'

const userQueryKeys = {
  all: ['user'] as const,
  user: (userId: string) => [...userQueryKeys.all, userId] as const,
  emailAvailability: (email: string) => [...userQueryKeys.all, 'emailAvailability', email] as const,
}

export const useFetchMyUser = () => {
  const { userId } = useAuth()
  return useQuery({
    queryKey: userQueryKeys.user(userId),
    queryFn: () => fetchMyUser(),
  })
}

export const useFetchUser = (userId: string) =>
  useQuery({
    queryKey: userQueryKeys.user(userId),
    queryFn: () => fetchUser(userId),
  })

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKeys.emailAvailability(data.user.email), false)
    },
  })
}

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ payload, redirectTo }: { payload: ResetPasswordPayload; redirectTo: string }) =>
      resetPassword(payload, redirectTo),
  })

export const useFetchUserEmailAvailability = (email: string) =>
  useQuery({
    queryKey: userQueryKeys.emailAvailability(email),
    queryFn: () => fetchUserEmailAvailability(email),
    enabled: /\S+@\S+\.\S+/u.test(email),
    initialData: true,
  })

// /**
//  * Bookshelf
//  */

// const bookshelfQueryKeys = {
//   all: () => ['bookshelf'] as const,
//   list: () => [...bookshelfQueryKeys.all()] as const,
//   discover: () => [...bookshelfQueryKeys.list(), 'discover'] as const,
//   readingList: () => [...bookshelfQueryKeys.list(), 'readingList'] as const,
//   finished: () => [...bookshelfQueryKeys.list(), 'finished'] as const,
//   book: (bookId: string) => [...bookshelfQueryKeys.all(), bookId] as const,
// }
