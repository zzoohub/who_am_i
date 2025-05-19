import { ApiResponse, WritePayload } from '../../types'
import { API_PATHS, handleApiError, httpClient } from './config'

/**
 * Get all capsules in a jar
 */
export async function getJarCapsules(jarId: string): Promise<ApiResponse> {
  try {
    const response = await httpClient.get(`${API_PATHS.JAR}/${jarId}`)
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}

/**
 * Create a new capsule
 */
export async function createCapsule(jarId: string, data: WritePayload): Promise<ApiResponse> {
  try {
    const response = await httpClient.post(`${API_PATHS.JAR}/${jarId}`, data)
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}

/**
 * Reply to a capsule
 */
export async function replyCapsule(jarId: string, capsuleId: string, data: WritePayload): Promise<ApiResponse> {
  try {
    const response = await httpClient.post(`${API_PATHS.JAR}/${jarId}/${capsuleId}/reply`, data)
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}

/**
 * Get a specific capsule
 */
export async function getCapsule(jarId: string, capsuleId: string): Promise<ApiResponse> {
  try {
    const response = await httpClient.get(`${API_PATHS.JAR}/${jarId}/${capsuleId}`)
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}

/**
 * Get a random capsule
 */
export async function getRandomCapsule(jarId: string): Promise<ApiResponse> {
  try {
    const response = await httpClient.get(`${API_PATHS.JAR}/${jarId}/random`)
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}

/**
 * Reply with an emoji
 */
export async function replyWithEmoji(
  jarId: string,
  capsuleId: string,
  emoji: number,
  dumpField: string = '',
): Promise<ApiResponse> {
  try {
    const response = await httpClient.post(`${API_PATHS.JAR}/${jarId}/${capsuleId}/reply/emoji`, { emoji, dumpField })
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}
