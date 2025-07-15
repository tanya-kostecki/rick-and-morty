import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { api } from '../../api/api'
import type { Episode } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { Loader } from '../../components/Loader/Loader'
import { Title } from '../../components/Title/Title'
import { useFetchItem } from '../../hooks/useFetchItem'

import styles from './Character.module.scss'

export const CharacterPage = () => {
  const { id } = useParams()
  const { data: character, isLoading, error } = useFetchItem(api.fetchCharacter, Number(id))
  const [characterEpisodes, setCharacterEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    if (!character) return

    const ids = character?.episode.map((url) => Number(url.split('/').pop()))

    const getCharacterEpisodes = async () => {
      try {
        const res = await api.fetchMultipleEpisodes(ids)
        const episodes = Array.isArray(res) ? res : [res]
        setCharacterEpisodes(episodes)
      } catch (error) {
        console.error(error)
      }
    }

    getCharacterEpisodes()
  }, [character])

  if (isLoading) return <Loader />
  if (error) return <span>{error}</span>

  return (
    <>
      <Card className={styles.character}>
        <div className={styles.mainBlock}>
          <Title className={styles.title}>{character?.name}</Title>
          <img src={character?.image} alt={character?.name} className={styles.image} />
        </div>
        <div className={styles.description}>
          <span>
            <strong>Gender: </strong>
            {character?.gender}
          </span>
          <span>
            <strong>Type: </strong>
            {character?.type}
          </span>
          <span>
            <strong>Species: </strong>
            {character?.species}
          </span>
          <span>
            <strong>Location: </strong>
            {character?.location.name}
          </span>
          <span>
            <strong>Origin: </strong>
            {character?.origin.name}
          </span>
          <span>
            <strong>Status: </strong>
            {character?.status}
          </span>
          <span>
            <strong>Created: </strong>
            {character?.created}
          </span>
        </div>
      </Card>
      <Title as={'h2'} className={styles.h2}>
        Featured in episodes
      </Title>
      <div className={styles.grid}>
        {characterEpisodes.map((episode) => (
          <Card as={NavLink} to={`/episodes/${episode.id}`} key={episode.id}>
            <h3>{episode.name}</h3>
            <p>{episode.air_date}</p>
          </Card>
        ))}
      </div>
    </>
  )
}
