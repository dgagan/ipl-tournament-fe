import { useMutation } from "@tanstack/react-query"
import { apiClient } from "./client"

export type PlayerStatus = "PENDING" | "APPROVED" | "REJECTED"

export type PlayerResponse = {
  id: string
  name: string
  photoUrl: string | null
  jerseyNo: number
  dob: string
  status: PlayerStatus
  rejectionRemarks: string | null
  teamId: string
  createdAt: string
  updatedAt: string
}

export type CreatePlayerPayload = {
  name: string
  dob: string
  jerseyNo: number
  photoUrl: string
}

export type UpdatePlayerPayload = Partial<CreatePlayerPayload>

export type FindPlayersQuery = {
  status?: PlayerStatus
}

export type RejectPlayerPayload = {
  id: string
  remarks: string
}

export const createPlayer = async (payload: CreatePlayerPayload) => {
  const { data } = await apiClient.post<PlayerResponse>('/players', payload)
  return data;
}

export const useCreatePlayer = () =>
  useMutation({
    mutationFn: createPlayer,
  })

export const getAllPlayers = async (query?: FindPlayersQuery) => {
  const { data } = await apiClient.get<PlayerResponse[]>('/players', { params: query })
  return data;
}

export const usePlayers = () =>
  useMutation({
    mutationFn: getAllPlayers,
  })

export const getPlayerById = async (id: string) => {
  const { data } = await apiClient.get<PlayerResponse>(`/players/${id}`)
  return data;
}

export const usePlayer = () =>
  useMutation({
    mutationFn: getPlayerById,
  })

export const updatePlayer = async ({ id, payload }: { id: string; payload: UpdatePlayerPayload }) => {
  const { data } = await apiClient.patch<PlayerResponse>(`/players/${id}`, payload)
  return data;
}

export const useUpdatePlayer = () =>
  useMutation({
    mutationFn: updatePlayer,
  })

export const deletePlayer = async (id: string) => {
  const { data } = await apiClient.delete<PlayerResponse>(`/players/${id}`)
  return data;
}

export const useDeletePlayer = () =>
  useMutation({
    mutationFn: deletePlayer,
  })

export const approvePlayer = async (id: string) => {
  const { data } = await apiClient.patch<PlayerResponse>(`/players/${id}/approve`)
  return data;
}

export const useApprovePlayer = () =>
  useMutation({
    mutationFn: approvePlayer,
  })

export const rejectPlayer = async ({ id, remarks }: RejectPlayerPayload) => {
  const { data } = await apiClient.patch<PlayerResponse>(`/players/${id}/reject`, { remarks })
  return data;
}

export const useRejectPlayer = () =>
  useMutation({
    mutationFn: rejectPlayer,
  })
