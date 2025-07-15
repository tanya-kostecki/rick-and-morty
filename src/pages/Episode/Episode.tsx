import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { api } from '../../api/api'
import type { Character } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { CharacterCard } from '../../components/CharacterCard/CharacterCard'
import { Loader } from '../../components/Loader/Loader'
import { Title } from '../../components/Title/Title'
import { useFetchItem } from '../../hooks/useFetchItem'

import styles from './Episode.module.scss'

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
    <div>
      <Title>{episode?.name}</Title>
      <Card>
        <div className={styles.infoBlock}>
          <span>
            <strong>Air date: </strong> {episode?.air_date}
          </span>
          <span>
            <strong>Created: </strong> {episode?.created}
          </span>
        </div>
      </Card>
      <Title as={'h2'} className={styles.h2}>
        Characters from location
      </Title>
      <div className={styles.characters}>
        {episodeCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            image={character.image}
            name={character.name}
          />
        ))}
      </div>
    </div>
  )
}
