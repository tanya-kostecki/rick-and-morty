import { useParams } from 'react-router-dom'

import { api } from '../../api/api'
import { Card } from '../../components/Card/Card'
import { Loader } from '../../components/Loader/Loader'
import { useFetchItem } from '../../hooks/useFetchItem'

import styles from './Character.module.scss'

export const CharacterPage = () => {
  const { id } = useParams()
  const { data: character, isLoading, error } = useFetchItem(api.fetchCharacter, Number(id))

  if (isLoading) return <Loader />
  if (error) return <span>{error}</span>

  return (
    <Card className={styles.character}>
      <div className={styles.mainBlock}>
        <h1>{character?.name}</h1>
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
  )
}
