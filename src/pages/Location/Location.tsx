import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { api } from '@api/api'
import type { Character } from '@api/types'
import { ItemPageLayout } from '@components/ItemPageLayout/ItemPageLayout'
import { Loader } from '@components/Loader/Loader'
import { useFetchItem } from '@hooks/useFetchItem'
import { useFetchMultipleItems } from '@hooks/useFetchMultipleItems'

export const LocationPage = () => {
  const { id } = useParams()
  const { data: location, isLoading, error } = useFetchItem(api.fetchLocation, Number(id))

  const { data: locationCharacters } = useFetchMultipleItems({
    pageData: location,
    fetchFn: api.fetchMultipleCharacters,
  })

  const { t } = useTranslation()

  if (isLoading) return <Loader />
  if (error) return <span>{error}</span>

  return (
    location && (
      <ItemPageLayout
        pageTitle={location.name}
        characters={locationCharacters as Character[]}
        itemsTitle={t('locationPage.characters')}
      >
        <span>
          <strong>{t('locationPage.type')}: </strong> {location.type}
        </span>
        <span>
          <strong>{t('locationPage.dimension')}: </strong> {location.dimension}
        </span>
      </ItemPageLayout>
    )
  )
}
