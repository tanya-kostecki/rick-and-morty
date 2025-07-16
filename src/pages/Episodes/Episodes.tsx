import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { Typography } from '@/components'
import { api } from '@api/api'
import type { Episode } from '@api/types'
import { Card } from '@components/Card/Card'
import { PageLayout } from '@components/PageLayout/PageLayout'
import { useFetch } from '@hooks/useFetch'

export const Episodes = () => {
  const { t } = useTranslation()
  const {
    data: episodes,
    error,
    isLoading,
    allPages,
    currentPage,
    setCurrentPage,
  } = useFetch<Episode>(api.fetchEpisodes)

  return (
    <PageLayout
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
    </PageLayout>
  )
}
