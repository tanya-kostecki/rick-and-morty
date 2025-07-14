import axios, { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'

import type { BaseResponse } from '../api/types'

type Params = { page?: number } & { signal: AbortSignal }

export const useFetch = <T>(
  fetchFn: ({ signal, ...params }: Params) => Promise<BaseResponse<T>>,
  page: number = 1
) => {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetchFn({ page, signal: controller.signal })
        setData(res.results)
      } catch (error) {
        if (axios.isCancel(error)) return

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

    return () => {
      controller.abort()
    }
  }, [fetchFn, page])

  return { data, isLoading, error }
}
