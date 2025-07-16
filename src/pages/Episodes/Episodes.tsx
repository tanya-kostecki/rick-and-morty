import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { api } from '@api/api'
import type { Episode } from '@api/types'
import { Card } from '@components/Card/Card'
import { PageLayout } from '@components/PageLayout/PageLayout'
import { useFetch } from '@hooks/useFetch'

const Episodes = () => {
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
          <h3>{episode.name}</h3>
          <p>{episode.air_date}</p>
        </Card>
      ))}
    </PageLayout>
  )
}
export default Episodes
