import { fetcher } from './api'
import type { User, TokenResponse } from '@/types'

export type { User }

export const login = async (email: string, password: string): Promise<User> => {
  const data = await fetcher<TokenResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  localStorage.setItem('auth_token', data.access_token)
  return getCurrentUser()
}

export const register = async (email: string, password: string): Promise<void> => {
  await fetcher('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export const logout = (): void => {
  localStorage.removeItem('auth_token')
}

export const getCurrentUser = async (): Promise<User> => {
  return fetcher<User>('/api/v1/auth/me')
}
