import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'

import { api, type Episode } from '@/api'
import { Card, Loader, Typography } from '@/components'
import { useFetchItem, useFetchMultipleItems } from '@/hooks'
import { formatDate } from '@/utils'

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
  if (error)
    return (
      <Typography as={'span'} variant={'span'}>
        {error}
      </Typography>
    )

  return (
    <>
      <Card className={styles.character}>
        <div className={styles.mainBlock}>
          <Typography className={styles.title}>{character?.name}</Typography>
          <img src={character?.image} alt={character?.name} className={styles.image} />
        </div>
        <div className={styles.description}>
          <Typography as={'span'} variant={'span'}>
            <strong>{t('characterPage.gender')}: </strong>
            {character?.gender}
          </Typography>
          <Typography as={'span'} variant={'span'}>
            <strong>{t('characterPage.type')}: </strong>
            {character?.type}
          </Typography>
          <Typography as={'span'} variant={'span'}>
            <strong>{t('characterPage.species')}: </strong>
            {character?.species}
          </Typography>
          <Typography as={'span'} variant={'span'}>
            <strong>{t('characterPage.location')}: </strong>
            {character?.location.name}
          </Typography>
          <Typography as={'span'} variant={'span'}>
            <strong>{t('characterPage.origin')}: </strong>
            {character?.origin.name}
          </Typography>
          <Typography as={'span'} variant={'span'}>
            <strong>{t('characterPage.status')}: </strong>
            {character?.status}
          </Typography>
          <Typography as={'span'} variant={'span'}>
            <strong>{t('characterPage.created')}: </strong>
            {character?.created && formatDate(character?.created)}
          </Typography>
        </div>
      </Card>
      <Typography as={'h2'} className={styles.h2}>
        {t('characterPage.featured')}
      </Typography>
      <div className={styles.grid}>
        {characterEpisodes?.map((episode) => (
          <Card as={NavLink} to={`/episodes/${episode.id}`} key={episode.id}>
            <Typography as={'h3'} variant={'h3'}>
              {episode.name}
            </Typography>
            <Typography as={'span'} variant={'span'}>
              <strong>{t('characterPage.releaseDate')}: </strong> {(episode as Episode).air_date}
            </Typography>
          </Card>
        ))}
      </div>
    </>
  )
}
