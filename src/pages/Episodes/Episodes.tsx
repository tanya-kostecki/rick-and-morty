import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { api } from '../../api/api'
import type { Episode } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { PageLayout } from '../../components/PageLayout/PageLayout'

const Episodes = () => {
  const { t } = useTranslation()
  const [episodes, setEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const res = await api.fetchEpisodes(1)
        setEpisodes(res.results)
        console.log(res.results)
      } catch (error) {
        console.error(error)
      }
    }

    getEpisodes()
  }, [])
  return (
    <PageLayout title={t('episodes.title')}>
      {episodes.map((location) => (
        <Card key={location.id}>
          <h3>{location.name}</h3>
          <p>{location.episode}</p>
          <p>{location.air_date}</p>
        </Card>
      ))}
    </PageLayout>
  )
}
export default Episodes
