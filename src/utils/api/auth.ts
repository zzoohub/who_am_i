import { ApiResponse, LoginFormData, SignupFormData } from '../../types'
import { API_PATHS, SERVER_URL, handleApiError, httpClient } from './config'

/**
 * Registers a new user
 */
export async function signup(data: SignupFormData): Promise<ApiResponse> {
  try {
    const response = await httpClient.post(`${API_PATHS.USER}`, data)
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}

/**
 * Logs in a user
 */
export async function login(data: LoginFormData): Promise<ApiResponse> {
  try {
    const response = await httpClient.post(`${API_PATHS.USER_LOGIN}`, data)
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}

/**
 * Checks if a username or nickname is available
 */
export async function checkDuplicate(type: 'id' | 'nickname', value: string): Promise<ApiResponse> {
  try {
    const response = await httpClient.get(`${API_PATHS.USER_CHECK}?${type}=${value}`)
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}

/**
 * Get current user information
 */
export async function getCurrentUser(): Promise<ApiResponse> {
  try {
    const response = await httpClient.get(`${API_PATHS.USER}`)
    return response.data
  } catch (error) {
    return handleApiError(error as Error)
  }
}
