import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { api } from '../../api/api'
import type { Episode } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { PageLayout } from '../../components/PageLayout/PageLayout'
import { useFetch } from '../../hooks/useFetch'

import styles from './Episodes.module.scss'

const Episodes = () => {
  const { t } = useTranslation()
  const { data: episodes, error, isLoading, allPages } = useFetch<Episode>(api.fetchEpisodes, 1)

  return (
    <PageLayout title={t('episodes.title')} isLoading={isLoading} error={error} pages={allPages}>
      {episodes.map((episode) => (
        <NavLink className={styles.link} to={`/episodes/${episode.id}`} key={episode.id}>
          <Card>
            <h3>{episode.name}</h3>
            <p>{episode.air_date}</p>
          </Card>
        </NavLink>
      ))}
    </PageLayout>
  )
}
export default Episodes
