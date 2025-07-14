import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { api } from '../../api/api'
import type { Location } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { PageLayout } from '../../components/PageLayout/PageLayout'

const Locations = () => {
  const { t } = useTranslation()
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    const getLocations = async () => {
      try {
        const res = await api.fetchLocations(1)
        setLocations(res.results)
        console.log(res.results)
      } catch (error) {
        console.error(error)
      }
    }

    getLocations()
  }, [])

  return (
    <PageLayout title={t('locations.title')}>
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
