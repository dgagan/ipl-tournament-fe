import { useMutation } from "@tanstack/react-query"
import { apiClient } from "./client"

export type CoachSchool = {
  id: string
  name: string
  address: string
  city: string
  createdAt: string
  updatedAt: string
}

export type CoachUser = {
  id: string
  email: string
  role: 'ADMIN' | 'COACH'
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export type CoachResponse = {
  id: string
  name: string
  phone: string
  schoolId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type CoachMeResponse = CoachResponse & {
  school: CoachSchool
  user: CoachUser
}

export type UpdateCoachPayload = {
  name?: string
  phone?: string
}

export const getLoggedInCoach = async () => {
  const { data } = await apiClient.get<CoachMeResponse>('/coaches/me')
    return data;
}

export const useCoach = () =>
  useMutation({
    mutationFn: getLoggedInCoach,
  })

export const updateLoggedInCoach = async (payload: UpdateCoachPayload) => {
  const { data } = await apiClient.patch<CoachResponse>('/coaches/me', payload)
  return data;
}

export const useUpdateCoach = () =>
  useMutation({
    mutationFn: updateLoggedInCoach,
  })

export const getAllCoaches = async () => {
  const { data } = await apiClient.get<CoachResponse[]>('/coaches')
  return data;
}

export const useCoaches = () =>
  useMutation({
    mutationFn: getAllCoaches,
  })

export const getCoachById = async (id: string) => {
  const { data } = await apiClient.get<CoachResponse>(`/coaches/${id}`)
  return data;
}

export const useCoachById = () =>
  useMutation({
    mutationFn: getCoachById,
  })