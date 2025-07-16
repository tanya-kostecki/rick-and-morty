import { useEffect, useState } from 'react'

import type { Character, Episode, Location } from '@api/types'

export function getDataUrls(pageData: PageData): string[] {
  if ('residents' in pageData) return pageData.residents
  if ('characters' in pageData) return pageData.characters
  if ('episode' in pageData) return pageData.episode
  return []
}

export type PageData = Character | Episode | Location

export interface Params {
  pageData: PageData | null
  fetchFn: (ids: number[]) => Promise<PageData[]>
}
export const useFetchMultipleItems = ({ pageData, fetchFn }: Params) => {
  const [data, setData] = useState<PageData[] | null>([])

  useEffect(() => {
    if (!pageData) return

    const mapData: string[] = getDataUrls(pageData)

    const ids = mapData.map((url) => Number(url.split('/').pop()))
    if (ids.length === 0) return

    const getEpisodeCharacters = async () => {
      try {
        const res = await fetchFn(ids)
        const arrayData = Array.isArray(res) ? res : [res]
        setData(arrayData)
      } catch (error) {
        console.log(error)
      }
    }

    getEpisodeCharacters()
  }, [pageData, fetchFn])

  return { data }
}
