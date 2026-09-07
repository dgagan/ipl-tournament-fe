import { useMutation } from "@tanstack/react-query"
import { apiClient } from "./client"
import type { PlayerResponse } from "./players.api"

export type TeamStatus = "PENDING" | "APPROVED" | "REJECTED"

export type TeamResponse = {
  id: string
  name: string
  schoolId: string
  coachId: string | null
  status: TeamStatus
  logoUrl: string | null
  rejectionRemarks: string | null
  createdAt: string
  updatedAt: string
  school: {
    name: string
  }
  coach: {
    name: string
  }
}

export type TeamWithPlayersResponse = TeamResponse & {
  players: PlayerResponse[]
}

export type CreateTeamPayload = {
  name: string
  logoUrl?: string
}

export type UpdateOwnTeamPayload = Partial<CreateTeamPayload>

export type UpdateTeamPayload = Partial<CreateTeamPayload>

export type RejectTeamPayload = {
  id: string
  remarks: string
}

export const createTeam = async (payload: CreateTeamPayload) => {
  const { data } = await apiClient.post<TeamResponse>('/teams', payload)
  return data;
}

export const useCreateTeam = () =>
  useMutation({
    mutationFn: createTeam,
  })

export const getMyTeam = async () => {
  const { data } = await apiClient.get<TeamWithPlayersResponse>('/teams/me')
  return data;
}

export const useMyTeam = () =>
  useMutation({
    mutationFn: getMyTeam,
  })

export const updateMyTeam = async (payload: UpdateOwnTeamPayload) => {
  const { data } = await apiClient.patch<TeamResponse>('/teams/me', payload)
  return data;
}

export const useUpdateMyTeam = () =>
  useMutation({
    mutationFn: updateMyTeam,
  })

export const getAllTeams = async () => {
  const { data } = await apiClient.get<TeamWithPlayersResponse[]>('/teams')
  return data;
}

export const useTeams = () =>
  useMutation({
    mutationFn: getAllTeams,
  })

export const getTeamById = async (id: string) => {
  const { data } = await apiClient.get<TeamWithPlayersResponse>(`/teams/${id}`)
  return data;
}

export const useTeam = () =>
  useMutation({
    mutationFn: getTeamById,
  })

export const updateTeam = async ({ id, payload }: { id: string; payload: UpdateTeamPayload }) => {
  const { data } = await apiClient.patch<TeamResponse>(`/teams/${id}`, payload)
  return data;
}

export const useUpdateTeam = () =>
  useMutation({
    mutationFn: updateTeam,
  })

export const approveTeam = async (id: string) => {
  const { data } = await apiClient.patch<TeamResponse>(`/teams/${id}/approve`)
  return data;
}

export const useApproveTeam = () =>
  useMutation({
    mutationFn: approveTeam,
  })

export const rejectTeam = async ({ id, remarks }: RejectTeamPayload) => {
  const { data } = await apiClient.patch<TeamResponse>(`/teams/${id}/reject`, { remarks })
  return data;
}

export const useRejectTeam = () =>
  useMutation({
    mutationFn: rejectTeam,
  })

export const deleteTeam = async (id: string) => {
  const { data } = await apiClient.delete<TeamResponse>(`/teams/${id}`)
  return data;
}

export const useDeleteTeam = () =>
  useMutation({
    mutationFn: deleteTeam,
  })
