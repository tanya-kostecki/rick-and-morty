import axios from 'axios'

import type { BaseResponse, Character, Episode, Location } from './types'

export const instance = axios.create({
  baseURL: ' https://rickandmortyapi.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const api = {
  async fetchCharacters(count: number = 20, page: number = 1): Promise<BaseResponse<Character>> {
    const response = await instance.get(`/character?page=${page}&count=${count}`)
    return response.data
  },

  async fetchLocations(count: number = 20, page: number = 1): Promise<BaseResponse<Location>> {
    const response = await instance.get(`/location?page=${page}&count=${count}`)
    return response.data
  },

  async fetchEpisodes(count: number = 20, page: number = 1): Promise<BaseResponse<Episode>> {
    const response = await instance.get(`/episode?page=${page}&count=${count}`)
    return response.data
  },
}
