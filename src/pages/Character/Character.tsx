import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'

import { api } from '@api/api'
import type { Episode } from '@api/types'
import { Card } from '@components/Card/Card'
import { Loader } from '@components/Loader/Loader'
import { Title } from '@components/Title/Title'
import { useFetchItem } from '@hooks/useFetchItem'
import { useFetchMultipleItems } from '@hooks/useFetchMultipleItems'
import { formatDate } from '@utils/formatDate'

import styles from './Character.module.scss'

export const CharacterPage = () => {
  const { id } = useParams()
  const { data: character, isLoading, error } = useFetchItem(api.fetchCharacter, Number(id))

  const { data: characterEpisodes } = useFetchMultipleItems({
    pageData: character,
    fetchFn: api.fetchMultipleEpisodes,
  })

  const { t } = useTranslation()

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
            <strong>{t('characterPage.gender')}: </strong>
            {character?.gender}
          </span>
          <span>
            <strong>{t('characterPage.type')}: </strong>
            {character?.type}
          </span>
          <span>
            <strong>{t('characterPage.species')}: </strong>
            {character?.species}
          </span>
          <span>
            <strong>{t('characterPage.location')}: </strong>
            {character?.location.name}
          </span>
          <span>
            <strong>{t('characterPage.origin')}: </strong>
            {character?.origin.name}
          </span>
          <span>
            <strong>{t('characterPage.status')}: </strong>
            {character?.status}
          </span>
          <span>
            <strong>{t('characterPage.created')}: </strong>
            {character?.created && formatDate(character?.created)}
          </span>
        </div>
      </Card>
      <Title as={'h2'} className={styles.h2}>
        {t('characterPage.featured')}
      </Title>
      <div className={styles.grid}>
        {characterEpisodes?.map((episode) => (
          <Card as={NavLink} to={`/episodes/${episode.id}`} key={episode.id}>
            <h3>{episode.name}</h3>
            <span>
              <strong>{t('characterPage.releaseDate')}: </strong> {(episode as Episode).air_date}
            </span>
          </Card>
        ))}
      </div>
    </>
  )
}
