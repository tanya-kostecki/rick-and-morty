import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { api, type Character } from '@/api'
import { ItemPageLayout, Loader, Typography } from '@/components'
import { useFetchItem, useFetchMultipleItems } from '@/hooks'
import { formatDate } from '@/utils'

export const EpisodePage = () => {
  const { id } = useParams()
  const { data: episode, isLoading, error } = useFetchItem(api.fetchEpisode, Number(id))

  const { data: episodeCharacters, error: charactersError } = useFetchMultipleItems({
    pageData: episode,
    fetchFn: api.fetchMultipleCharacters,
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
    episode && (
      <ItemPageLayout
        pageTitle={episode.name}
        characters={episodeCharacters as Character[]}
        itemsTitle={'Characters from episode'}
        error={charactersError}
      >
        <Typography as={'span'} variant={'span'}>
          <strong>{t('episodePage.releaseDate')}: </strong> {episode.air_date}
        </Typography>
        <Typography as={'span'} variant={'span'}>
          <strong>{t('episodePage.created')}: </strong> {formatDate(episode.created)}
        </Typography>
      </ItemPageLayout>
    )
  )
}
