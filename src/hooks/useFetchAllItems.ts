import axios from 'axios'
import { useEffect, useState } from 'react'

import type { BaseResponse } from '@/api'
import { responseErrorHandler } from '@/utils'

type Params = { page?: number } & { signal: AbortSignal }

export const useFetchAllItems = <T>(
  fetchFn: ({ signal, ...params }: Params) => Promise<BaseResponse<T>>
) => {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [allPages, setAllPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      setData([])

      try {
        const res = await fetchFn({ page: currentPage, signal: controller.signal })
        setData(res.results)
        setAllPages(res.info.pages)
      } catch (error) {
        if (axios.isCancel(error)) return
        const errorMessage = responseErrorHandler(error)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [fetchFn, currentPage])

  return { data, isLoading, error, allPages, currentPage, setCurrentPage }
}
