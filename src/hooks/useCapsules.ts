import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Jar } from '../types'
import { getJarCapsules } from '../utils/api'

/**
 * Custom hook for fetching and accessing jar/capsules data
 */
export function useCapsules(jarId: string): UseQueryResult<Jar, Error> {
  return useQuery({
    queryKey: ['jar', jarId],
    queryFn: () => getJarCapsules(jarId).then(response => response.data as Jar),
    enabled: !!jarId,
  })
}
