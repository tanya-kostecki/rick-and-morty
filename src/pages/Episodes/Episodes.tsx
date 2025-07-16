import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { api, type Episode } from '@/api'
import { Typography, Card, ItemsPageLayout } from '@/components'
import { useFetchAllItems } from '@/hooks'

export const Episodes = () => {
  const { t } = useTranslation()
  const {
    data: episodes,
    error,
    isLoading,
    allPages,
    currentPage,
    setCurrentPage,
  } = useFetchAllItems<Episode>(api.fetchEpisodes)

  return (
    <ItemsPageLayout
      title={t('episodes.title')}
      isLoading={isLoading}
      error={error}
      pages={allPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {episodes.map((episode) => (
        <Card as={NavLink} to={`/episodes/${episode.id}`} key={episode.id}>
          <Typography as={'h3'} variant={'h3'}>
            {episode.name}
          </Typography>
          <Typography as={'p'} variant={'p'}>
            {episode.air_date}
          </Typography>
        </Card>
      ))}
    </ItemsPageLayout>
  )
}
