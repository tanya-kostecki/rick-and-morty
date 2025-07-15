import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { api } from '../../api/api'
import type { Character } from '../../api/types'
import { ItemPageLayout } from '../../components/ItemPageLayout/ItemPageLayout'
import { Loader } from '../../components/Loader/Loader'
import { useFetchItem } from '../../hooks/useFetchItem'

export const EpisodePage = () => {
  const { id } = useParams()
  const { data: episode, isLoading, error } = useFetchItem(api.fetchEpisode, Number(id))
  const [episodeCharacters, setEpisodeCharacters] = useState<Character[]>([])

  useEffect(() => {
    if (!episode) return

    const ids = episode.characters.map((url) => Number(url.split('/').pop()))

    const getEpisodeCharacters = async () => {
      try {
        const res = await api.fetchMultipleCharacters(ids)
        setEpisodeCharacters(res)
      } catch (error) {
        console.error(error)
      }
    }

    getEpisodeCharacters()
  }, [episode])

  if (isLoading) return <Loader />
  if (error) return <span>{error}</span>

  return (
    episode && (
      <ItemPageLayout pageTitle={episode.name} characters={episodeCharacters}>
        <span>
          <strong>Air date: </strong> {episode.air_date}
        </span>
        <span>
          <strong>Created: </strong> {episode.created}
        </span>
      </ItemPageLayout>
    )
  )
}
