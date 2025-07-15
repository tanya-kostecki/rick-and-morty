import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { api } from '../../api/api'
import type { Character } from '../../api/types'
import { ItemPageLayout } from '../../components/ItemPageLayout/ItemPageLayout'
import { Loader } from '../../components/Loader/Loader'
import { useFetchItem } from '../../hooks/useFetchItem'

export const LocationPage = () => {
  const { id } = useParams()
  const { data: location, isLoading, error } = useFetchItem(api.fetchLocation, Number(id))
  const [locationCharacters, setLocationCharacters] = useState<Character[]>([])

  useEffect(() => {
    if (!location) return

    const ids = location.residents.map((url) => Number(url.split('/').pop()))

    const getEpisodeCharacters = async () => {
      try {
        const res = await api.fetchMultipleCharacters(ids)
        setLocationCharacters(res)
      } catch (error) {
        console.error(error)
      }
    }

    getEpisodeCharacters()
  }, [location])

  if (isLoading) return <Loader />
  if (error) return <span>{error}</span>

  console.log(location)
  return (
    location && (
      <ItemPageLayout pageTitle={location.name} characters={locationCharacters}>
        <span>
          <strong>Type: </strong> {location.type}
        </span>
        <span>
          <strong>Dimension: </strong> {location.dimension}
        </span>
      </ItemPageLayout>
    )
  )
}
