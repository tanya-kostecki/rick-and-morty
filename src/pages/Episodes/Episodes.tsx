import { useTranslation } from 'react-i18next'

import { api } from '../../api/api'
import type { Episode } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { PageLayout } from '../../components/PageLayout/PageLayout'
import { useFetch } from '../../hooks/useFetch'

const Episodes = () => {
  const { t } = useTranslation()
  const { data: episodes, error, isLoading, allPages } = useFetch<Episode>(api.fetchEpisodes, 1)

  return (
    <PageLayout title={t('episodes.title')} isLoading={isLoading} error={error} pages={allPages}>
      {episodes.map((location) => (
        <Card key={location.id}>
          <h3>{location.name}</h3>
          <p>{location.air_date}</p>
        </Card>
      ))}
    </PageLayout>
  )
}
export default Episodes
