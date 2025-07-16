import { useEffect, useState } from 'react'

import { responseErrorHandler } from '@/utils'

export const useFetchItem = <T>(fetchFn: (id: number) => Promise<T>, id: number) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const res = await fetchFn(id)
        setData(res)
      } catch (error) {
        const errorMessage = responseErrorHandler(error)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [fetchFn, id])

  return { data, isLoading, error }
}
