import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { api } from '../../api/api'
import type { Character } from '../../api/types'
import { ItemPageLayout } from '../../components/ItemPageLayout/ItemPageLayout'
import { Loader } from '../../components/Loader/Loader'
import { useFetchItem } from '../../hooks/useFetchItem'
import { useFetchMultipleItems } from '../../hooks/useFetchMultipleItems'

export const EpisodePage = () => {
  const { id } = useParams()
  const { data: episode, isLoading, error } = useFetchItem(api.fetchEpisode, Number(id))

  const { data: episodeCharacters } = useFetchMultipleItems({
    pageData: episode,
    fetchFn: api.fetchMultipleCharacters,
  })

  const { t } = useTranslation()

  if (isLoading) return <Loader />
  if (error) return <span>{error}</span>

  return (
    episode && (
      <ItemPageLayout
        pageTitle={episode.name}
        characters={episodeCharacters as Character[]}
        itemsTitle={'Characters from episode'}
      >
        <span>
          <strong>{t('episodePage.releaseDate')}: </strong> {episode.air_date}
        </span>
        <span>
          <strong>{t('episodePage.created')}: </strong> {episode.created}
        </span>
      </ItemPageLayout>
    )
  )
}
