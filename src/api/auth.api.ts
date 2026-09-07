import { useMutation } from '@tanstack/react-query'
import { apiClient } from './client'

export type RegisterPayload = {
  email: string
  password: string
  name: string
  phone: string
  schoolId: string
}

export type RegisterResponse = {
  id: string
  email: string
  role: 'ADMIN' | 'COACH'
}

export const register = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post<RegisterResponse>('/auth/register', payload)
  return data
}

export const useRegister = () =>
  useMutation({
    mutationFn: register,
  })

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', payload)
  return data
}

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  })
