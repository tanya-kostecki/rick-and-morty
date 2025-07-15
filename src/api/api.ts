import axios from 'axios'

import type { BaseResponse, Character, Episode, Location } from './types'

export const instance = axios.create({
  baseURL: ' https://rickandmortyapi.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

type Params = {
  page?: number
} & {
  signal: AbortSignal
}
export const api = {
  async fetchCharacters({ page = 1, signal }: Params): Promise<BaseResponse<Character>> {
    const response = await instance.get(`/character?page=${page}`, {
      signal,
    })
    return response.data
  },

  async fetchLocations({ page = 1, signal }: Params): Promise<BaseResponse<Location>> {
    const response = await instance.get(`/location?page=${page}`, {
      signal,
    })
    return response.data
  },

  async fetchEpisodes({ page = 1, signal }: Params): Promise<BaseResponse<Episode>> {
    const response = await instance.get(`/episode?page=${page}`, {
      signal,
    })
    return response.data
  },
}
