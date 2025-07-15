import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'

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
        if (isAxiosError(error)) {
          if (error.status === 404) {
            setError(error.response?.data.error)
          } else {
            setError(error.message)
          }
        } else {
          setError('Some error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [fetchFn, id])

  return { data, isLoading, error }
}
