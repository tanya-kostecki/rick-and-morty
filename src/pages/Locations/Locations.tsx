import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { api, type Location } from '@/api'
import { Typography, Card, PageLayout } from '@/components'
import { useFetch } from '@/hooks'

export const Locations = () => {
  const { t } = useTranslation()
  const {
    data: locations,
    error,
    isLoading,
    allPages,
    currentPage,
    setCurrentPage,
  } = useFetch<Location>(api.fetchLocations)

  return (
    <PageLayout
      title={t('locations.title')}
      isLoading={isLoading}
      error={error}
      pages={allPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {locations.map((location) => (
        <Card as={NavLink} to={`/locations/${location.id}`} key={location.id}>
          <Typography as={'h3'} variant={'h3'}>
            {location.name}
          </Typography>
          <Typography as={'p'} variant={'p'}>
            {location.type}
          </Typography>
          <Typography as={'p'} variant={'p'}>
            {location.dimension}
          </Typography>
        </Card>
      ))}
    </PageLayout>
  )
}
