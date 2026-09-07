import { useMutation } from "@tanstack/react-query"
import { apiClient } from "./client"

export type GetAllSchoolsResponse = {
        "id": string,
        "name": string,
        "address": string
        "city": string,
        "createdAt": string,
        "updatedAt": string,
}

export const getAllSchools = async () => {
  const { data } = await apiClient.get<GetAllSchoolsResponse[]>('/schools')
    return data;
}

export const useSchools = () =>
  useMutation({
    mutationFn: getAllSchools,
  })

export const getSchoolById = async (id: string) => {
  const { data } = await apiClient.get<GetAllSchoolsResponse>(`/schools/${id}`)
  return data;
}

export const useSchool = () =>
  useMutation({
    mutationFn: getSchoolById,
  })