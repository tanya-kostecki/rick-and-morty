import { useTranslation } from 'react-i18next'

import { api } from '../../api/api'
import type { Location } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { PageLayout } from '../../components/PageLayout/PageLayout'
import { useFetch } from '../../hooks/useFetch'

const Locations = () => {
  const { t } = useTranslation()
  const { data: locations, error, isLoading } = useFetch<Location>(api.fetchLocations, 1)

  return (
    <PageLayout title={t('locations.title')} isLoading={isLoading} error={error}>
      {locations.map((location) => (
        <Card key={location.id}>
          <h3>{location.name}</h3>
          <p>{location.type}</p>
          <p>{location.dimension}</p>
        </Card>
      ))}
    </PageLayout>
  )
}
export default Locations
