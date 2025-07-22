import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { api, type Character } from '@/api'
import { ItemPageLayout, Loader, Typography } from '@/components'
import { useFetchItem, useFetchMultipleItems } from '@/hooks'

export const LocationPage = () => {
  const { id } = useParams()
  const { data: location, isLoading, error } = useFetchItem(api.fetchLocation, Number(id))

  const {
    data: locationCharacters,
    error: charactersError,
    isLoading: charactersLoading,
  } = useFetchMultipleItems({
    pageData: location,
    fetchFn: api.fetchMultipleCharacters,
  })

  const { t } = useTranslation()

  if (isLoading) return <Loader />
  if (error)
    return (
      <Typography as={'span'} variant={'span'}>
        {error}
      </Typography>
    )

  return (
    location && (
      <ItemPageLayout
        pageTitle={location.name}
        characters={locationCharacters as Character[]}
        itemsTitle={t('locationPage.characters')}
        error={charactersError}
        isLoading={charactersLoading}
      >
        <Typography as={'span'} variant={'span'}>
          <strong>{t('locationPage.type')}: </strong> {location.type}
        </Typography>
        <Typography as={'span'} variant={'span'}>
          <strong>{t('locationPage.dimension')}: </strong> {location.dimension}
        </Typography>
      </ItemPageLayout>
    )
  )
}
