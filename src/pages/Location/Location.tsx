import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { api, type Character } from '@/api'
import { ItemPageLayout, Loader } from '@/components'
import { useFetchItem, useFetchMultipleItems } from '@/hooks'

export const LocationPage = () => {
  const { id } = useParams()
  const { data: location, isLoading, error } = useFetchItem(api.fetchLocation, Number(id))

  const { data: locationCharacters, error: charactersError } = useFetchMultipleItems({
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
        error={charactersError}
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
