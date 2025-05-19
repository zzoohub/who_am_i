import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { User } from '../types'
import { getCurrentUser } from '../utils/api'

/**
 * Custom hook for fetching and accessing user data
 */
export function useUser(): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getCurrentUser().then(response => response.data as User),
  })
}
