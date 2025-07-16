import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { api } from '../../api/api'
import type { Location } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { PageLayout } from '../../components/PageLayout/PageLayout'
import { useFetch } from '../../hooks/useFetch'

const Locations = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: locations,
    error,
    isLoading,
    allPages,
  } = useFetch<Location>(api.fetchLocations, currentPage)

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
          <h3>{location.name}</h3>
          <p>{location.type}</p>
          <p>{location.dimension}</p>
        </Card>
      ))}
    </PageLayout>
  )
}
export default Locations
